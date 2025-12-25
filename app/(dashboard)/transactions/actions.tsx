"use client";
import { Button } from "@/components/ui/button";
import { useOpenTransactions } from "@/features/transactions/hooks/use-open-transactions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
const Actions = ({ id }: { id: string }) => {
  const { onOpen } = useOpenTransactions();
  const deleteMutation = useDeleteTransaction(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "you are about to delete the transactions"
  );
  const onDelete = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {},
      });
    }
  };
  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="mr-2 size-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={false} onClick={() => onDelete()}>
            <Trash className="mr-2 size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog />
    </Fragment>
  );
};

export default Actions;
