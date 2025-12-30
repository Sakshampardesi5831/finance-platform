/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import {
  accounts,
  categories,
  connectedBanks,
  transactions,
} from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { convertAmountToMiliunits } from "@/lib/utils";
import { and, eq, isNotNull } from "drizzle-orm";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_KEY!,
      "PLAID-SECRET": process.env.PLAID_SECRET_KEY!,
    },
  },
});

const client = new PlaidApi(configuration);

const app = new Hono()
  .get("/connected-bank", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [connectedBank] = await db
      .select({})
      .from(connectedBanks)
      .where(eq(connectedBanks.userId, auth.userId));

    return c.json({ data: connectedBank || null });
  })
  .delete("/connected-bank", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [connectedBank] = await db
      .delete(connectedBanks)
      .where(eq(connectedBanks.userId, auth.userId))
      .returning({
        id: connectedBanks.id,
      });

    if(!connectedBank){
       return c.json({error:"Not found"},404)
    }



    await db
      .delete(accounts)
      .where(
        and(
          eq(accounts.userId, auth.userId),
          //eq(accounts.plaidId, connectedBank.id)
          isNotNull(accounts.plaidId)
        )
      );
       await db
      .delete(categories)
      .where(
        and(
          eq(categories.userId, auth.userId),
          //eq(categories.plaidId, connectedBank.id)
          isNotNull(categories.plaidId)
        )
      );

    return c.json({ data: connectedBank || null });
  })
  .post("/create-link-token", clerkMiddleware(), async (c) => {
    // Logic to create a Plaid link token

    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const token = await client.linkTokenCreate({
      user: {
        client_user_id: auth.userId,
      },
      client_name: "Finance Project",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    });

    return c.json({ data: token.data.link_token });
  })
  .post(
    "/exchange-public-token",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        publicToken: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const { publicToken } = c.req.valid("json");
      try {
        const exchange = await client.itemPublicTokenExchange({
          public_token: publicToken,
        });
        const [connectedBank] = await db
          .insert(connectedBanks)
          .values({
            id: createId(),
            userId: auth.userId,
            accessToken: exchange.data.access_token,
          })
          .returning();

        const plaidTransactions = await client.transactionsSync({
          access_token: connectedBank.accessToken,
        });

        const plaidAccounts = await client.accountsGet({
          access_token: connectedBank.accessToken,
        });

        const plaidCategories = await client.categoriesGet({});

        const newAccounts = await db
          .insert(accounts)
          .values(
            plaidAccounts.data.accounts.map((account) => ({
              id: createId(),
              plaidId: account.account_id,
              name: account.name,
              userId: auth.userId,
            }))
          )
          .returning();
        const newCategories = await db
          .insert(categories)
          .values(
            plaidCategories.data.categories.map((category) => ({
              id: createId(),
              plaidId: category.category_id,
              name: category.hierarchy.join(","),
              userId: auth.userId,
            }))
          )
          .returning();

        const newTransactionsValues = plaidTransactions.data.added.reduce(
          (acc: any, transactions: any) => {
            const accounts = newAccounts.find(
              (account) => account.plaidId === transactions.account_id
            );
            const categories = newCategories.find(
              (category) => category.plaidId === transactions.category_id
            );
            const amountInMiliunits = convertAmountToMiliunits(
              transactions.amount
            );

            if (accounts) {
              acc.push({
                id: createId(),
                amount: amountInMiliunits,
                payee: transactions.merchant_name || transactions.name,
                notes: transactions.name,
                date: new Date(transactions.date),
                accountId: accounts.id,
                categoryId: categories?.id,
              });
            }
            return acc;
          },
          [] as (typeof transactions.$inferInsert)[]
        );

        if (newTransactionsValues.length > 0) {
          await db.insert(transactions).values(newTransactionsValues);
        }
        return c.json({ data: exchange.data.access_token });
      } catch (error) {
        console.error("Plaid API error:", error);
        return c.json({ error: "Failed to exchange token" }, 500);
      }
    }
  );
export default app;
