import "dotenv/config";
import { createId } from "@paralleldrive/cuid2";
import { db } from "../db/drizzle";
import { accounts, categories, transactions } from "../db/schema";

const userId = "user_35qHnHMNVGSb97sQiZSyoXHnUVB";

const accountsData = [
  { id: createId(), name: "Checking Account", userId },
  { id: createId(), name: "Savings Account", userId },
  { id: createId(), name: "Credit Card", userId },
  { id: createId(), name: "Investment Account", userId },
];

const categoriesData = [
  { id: createId(), name: "Food & Dining", userId },
  { id: createId(), name: "Transportation", userId },
  { id: createId(), name: "Shopping", userId },
  { id: createId(), name: "Entertainment", userId },
  { id: createId(), name: "Bills & Utilities", userId },
  { id: createId(), name: "Healthcare", userId },
  { id: createId(), name: "Travel", userId },
  { id: createId(), name: "Education", userId },
  { id: createId(), name: "Income", userId },
  { id: createId(), name: "Investments", userId },
];

const payees = [
  "Walmart", "Amazon", "Starbucks", "McDonald's", "Target", "Costco", "Netflix", "Spotify",
  "Uber", "Lyft", "Shell", "Chevron", "AT&T", "Verizon", "Electric Company", "Water Utility",
  "Rent Payment", "Mortgage", "Insurance Co", "Bank Transfer", "Salary Deposit", "Freelance Payment",
  "Grocery Store", "Gas Station", "Restaurant", "Coffee Shop", "Pharmacy", "Doctor Office",
  "Gym Membership", "Subscription Service", "Online Purchase", "Cash Withdrawal"
];

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomAmount(): number {
  const amounts = [
    -Math.floor(Math.random() * 50) - 5,     // Small expenses: -$5 to -$55
    -Math.floor(Math.random() * 200) - 50,   // Medium expenses: -$50 to -$250
    -Math.floor(Math.random() * 500) - 100,  // Large expenses: -$100 to -$600
    Math.floor(Math.random() * 3000) + 1000, // Income: $1000 to $4000
  ];
  return amounts[Math.floor(Math.random() * amounts.length)] * 100; // Convert to cents
}

async function seed() {
  console.log("🌱 Seeding database...");

  // Insert accounts
  console.log("📊 Creating accounts...");
  await db.insert(accounts).values(accountsData);

  // Insert categories
  console.log("🏷️ Creating categories...");
  await db.insert(categories).values(categoriesData);

  // Generate 1000 transactions
  console.log("💰 Creating 1000 transactions...");
  const transactionsData = [];
  const startDate = new Date(2023, 0, 1); // January 1, 2023
  const endDate = new Date(); // Today

  for (let i = 0; i < 1000; i++) {
    const accountId = accountsData[Math.floor(Math.random() * accountsData.length)].id;
    const categoryId = categoriesData[Math.floor(Math.random() * categoriesData.length)].id;
    const payee = payees[Math.floor(Math.random() * payees.length)];
    const amount = getRandomAmount();
    const date = getRandomDate(startDate, endDate);
    
    transactionsData.push({
      id: createId(),
      amount,
      payee,
      notes: Math.random() > 0.7 ? `Transaction note for ${payee}` : null,
      date,
      accountId,
      categoryId,
    });
  }

  // Insert transactions in batches of 100
  for (let i = 0; i < transactionsData.length; i += 100) {
    const batch = transactionsData.slice(i, i + 100);
    await db.insert(transactions).values(batch);
    console.log(`✅ Inserted transactions ${i + 1}-${Math.min(i + 100, transactionsData.length)}`);
  }

  console.log("🎉 Seeding completed successfully!");
  console.log(`📈 Created ${accountsData.length} accounts`);
  console.log(`🏷️ Created ${categoriesData.length} categories`);
  console.log(`💸 Created ${transactionsData.length} transactions`);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});