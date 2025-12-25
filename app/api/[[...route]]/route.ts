import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";
import { HTTPException } from "hono/http-exception";
const app = new Hono().basePath("/api");
app.use("*", clerkMiddleware());

// app.onError((err,c)=>{
//     if(err instanceof HTTPException){
//         return err.getResponse();
//     }
//     return c.json({error:"Internal server error"},500);
// })

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary);
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
