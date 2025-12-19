import { useOpenTransaction } from "../hooks/use-open-transaction";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm } from "./transaction-form";
import { insertTransactionSchema } from "@/db/schema";
import {useUpdateTransaction } from "../api/use-update-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import z from "zod";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { Fragment } from "react";

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  );
  const transactionQuery = useGetTransaction(id);
  const editMutation = useUpdateTransaction(id);
  const deleteMutation = useDeleteTransaction(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const formSchema = insertTransactionSchema.omit({ id: true });
  const isLoading = transactionQuery.isLoading;
  type FormValues = z.input<typeof formSchema>;

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

  const defaultValues = transactionQuery.data || {
    amount: "",
    payee: "",
    notes: "",
    date: new Date(),
    accountId: "",
    categoryId: "",
  };

  return (
    <Fragment>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Edit an existing transaction.
            </SheetDescription>
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
            />
          )}
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};
