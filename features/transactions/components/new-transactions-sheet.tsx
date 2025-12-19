import z from "zod";

import { useNewTransactions } from "../hooks/use-new-transactions";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { insertTransactionSchema } from "@/db/schema";

import { useCreateAccount } from "@/features/accounts/api/use-create-accounts";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

import { useCreateCategories } from "@/features/categories/api/use-create-categories";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";
export const NewTransactionSheet = () => {
  /* ----------------------------- UI State ----------------------------- */
  const { isOpen, onClose } = useNewTransactions();

  /* ----------------------------- Mutations ----------------------------- */
  const transactionMutation = useCreateTransaction();
  const accountMutation = useCreateAccount();
  const categoryMutation = useCreateCategories();

  /* ------------------------------ Queries ------------------------------ */
  const accountsQuery = useGetAccounts();
  const categoriesQuery = useGetCategories();

  /* --------------------------- Form Schema ----------------------------- */
  const formSchema = insertTransactionSchema.omit({ id: true });
  type FormValues = z.input<typeof formSchema>;

  /* ---------------------------- Handlers ------------------------------- */
  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };

  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
  };

  const onSubmit = (values: FormValues) => {
    transactionMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  /* -------------------------- Select Options --------------------------- */
  const accountOptions =
    accountsQuery.data?.map((account) => ({
      value: account.id,
      label: account.name,
    })) ?? [];

  const categoryOptions =
    categoriesQuery.data?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  const isPending =
    transactionMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading = categoriesQuery.isLoading || accountsQuery.isLoading;
  /* ------------------------------ Render ------------------------------- */
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="space-y-4 p-6">
        <SheetHeader>
          <SheetTitle className="text-center">New Transaction</SheetTitle>
        </SheetHeader>

        <SheetDescription>Add a new transaction</SheetDescription>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            accountOptions={accountOptions}
            categoryOptions={categoryOptions}
            onCreateAccount={onCreateAccount}
            onCreateCategory={onCreateCategory}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
