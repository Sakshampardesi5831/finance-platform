import { useOpenAccount } from "../hooks/use-open-accounts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { useGetAccount } from "../api/use-get-account";
import { useEditAccount } from "../api/use-update-account";
import { useDeleteAccount } from "../api/use-delete-account";
import z from "zod";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { Fragment } from "react";
export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  console.log("EditAccountSheet isOpen:", isOpen);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "you are about delete the account"
  );
  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount({ id: id });
  const deleteMutation = useDeleteAccount({ id: id });
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const formSchema = insertAccountSchema.pick({
    name: true,
  });
  const isLoading = accountQuery.isLoading;
  type FormValues = z.input<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    if (!id) return;
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

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : { name: "" };

  return (
    <Fragment>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="space-y-2 p-6">
          <SheetHeader>
            <SheetTitle className="text-left">Edit Accounts</SheetTitle>
          </SheetHeader>
          <SheetDescription>Edit in your existing account</SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountForm
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
