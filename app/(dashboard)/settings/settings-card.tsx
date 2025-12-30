"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import PlaidConnect from "@/features/plaid/components/plaid-connect";
import { useGetConnectedBank } from "@/features/plaid/api/use-get-connected-bank";
import { PlaidDisconnect } from "@/features/plaid/components/plaid-disconnect";
export const SettingsCard = () => {
  const { data: connectedBank, isLoading: connectedBankLoading } =
    useGetConnectedBank();
  return (
    <Card className="border-none drop-shadow-sm ">
      <CardHeader className="text-xl line-clamp-1">Settings</CardHeader>
      <CardContent>
        <Separator />
        <div className="flex flex-col  gap-y-2 lg:flex-row items-center py-4">
          <p className="text-sm font-medium w-full lg:w-[16.5rem]">
            Bank Account
          </p>
          <div className="w-full flex items-center justify-between">
            <div
              className={cn(
                "text-sm truncate flex items-center",
                !connectedBank && "text-muted-foreground"
              )}
            >
              {connectedBank
                ? "Bank Account Connected"
                : "No Bank Account connected"}
            </div>
          </div>
          {connectedBank ? <PlaidDisconnect /> : <PlaidConnect />}
        </div>
      </CardContent>
    </Card>
  );
};
