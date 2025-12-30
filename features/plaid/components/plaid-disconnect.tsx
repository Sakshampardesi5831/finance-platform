"use client";
import { Button } from "@/components/ui/button";
import React, { Fragment } from "react";
import { useDeleteConnectedBank } from "@/features/plaid/api/use-delete-connected-bank";
import { useConfirm } from "@/hooks/use-confirm";
type ResponseType = {
  data: string;
};

export const PlaidDisconnect = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure",
    "This will disconnect your bank account and all associated data also"
  );
  const deleteConnectedBank = useDeleteConnectedBank();
  const onClick = async () => {
    const ok = await confirm();

    if (ok) {
      // @ts-expect-error mutate expects no parameters but we need to pass undefined for DELETE request
      deleteConnectedBank.mutate(undefined, {
        onSuccess: ({ data }: ResponseType) => {},
      });
    }
  };

  return (
    <Fragment>
      <ConfirmDialog />
      <Button onClick={onClick} disabled={false} variant={"ghost"} size={"sm"}>
        Disconnect
      </Button>
    </Fragment>
  );
};
