"use client";
import { Button } from "@/components/ui/button";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
const Actions = ({ id }: { id: string }) => {
  const { onOpen } = useOpenAccount();
  const deleteMutation = useDeleteAccount({ id: id });
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "you are about to delete the account"
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
