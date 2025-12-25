import { useOpenTransactions } from "../hooks/use-open-transactions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm } from "./transaction-form";
import { insertTransactionSchema } from "@/db/schema";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { useUpdateTransaction } from "../api/use-update-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useCreateAccount } from "@/features/accounts/api/use-create-accounts";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

import { useCreateCategories } from "@/features/categories/api/use-create-categories";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import z from "zod";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { Fragment } from "react";

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransactions();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  );
  const transactionQuery = useGetTransaction(id);
  const editMutation = useUpdateTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const formSchema = insertTransactionSchema.omit({ id: true });
  type FormValues = z.input<typeof formSchema>;

  /* ----------------------------- Mutations ----------------------------- */
  const accountMutation = useCreateAccount();
  const categoryMutation = useCreateCategories();

  /* ------------------------------ Queries ------------------------------ */
  const accountsQuery = useGetAccounts();
  const categoriesQuery = useGetCategories();

  /* ---------------------------- Handlers ------------------------------- */
  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };

  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
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
    editMutation.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isLoading ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading =
    categoriesQuery.isLoading ||
    accountsQuery.isLoading ||
    transactionQuery.isLoading;
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: convertAmountFromMiliunits(transactionQuery.data.amount).toString(),
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  return (
    <Fragment>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-2 overflow-y-auto p-6">
          <SheetHeader>
            <SheetTitle className="text-center">Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
              accountOptions={accountOptions}
              categoryOptions={categoryOptions}
              onCreateAccount={onCreateAccount}
              onCreateCategory={onCreateCategory}
            />
          )}
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};
