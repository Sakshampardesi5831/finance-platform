"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { columns } from "./coloumn";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-account";
import { useNewTransactions } from "@/features/transactions/hooks/use-new-transactions";
const AccountsPage = () => {
  const newTransactions = useNewTransactions();
  const accountQuery = useGetAccounts();
  const deleteAccounts = useBulkDeleteAccounts();
  const accounts = accountQuery.data || [];
  const isDisabled = accountQuery.isLoading || deleteAccounts.isPending
  if(accountQuery.isLoading){
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
           <CardHeader>
             <Skeleton className="w-8 h-14"/>
           </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex item-center justify-center">
             <Loader2 className="size-6 text-slate animate-spin"/>
          </div>
        </CardContent>
        </Card>
      </div>
    )
  }



  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className=" gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Transaction History</CardTitle>

          <Button size={"sm"} onClick={newTransactions.onOpen}>
            {" "}
            <Plus className="size-4 mr-2" /> Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey="name"
            onDelete={(row) => {
              const ids:string[] = row.map((r)=>r.original.id);
              deleteAccounts.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
