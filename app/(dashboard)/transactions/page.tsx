"use client";
import React, { Fragment, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./coloumn";
import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useNewTransactions } from "@/features/transactions/hooks/use-new-transactions";
import UploadButton from "./upload-button";
import ImportCard from "./import-card";
import {transactions as transactionImport} from "@/db/schema";
import { useSelectAccount } from "@/hooks/use-select-account";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { toast } from "sonner";
enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [variant, setVariants] = useState<VARIANTS>(VARIANTS.LIST);
  const [ConfirmDialog,confirm] = useSelectAccount();
  const [importResults, setImportResult] = useState(INITIAL_IMPORT_RESULTS);
  const newTransactions = useNewTransactions();
  const transactionQuery = useGetTransactions();
  const bulkCreateTransactions = useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactions = transactionQuery.data || [];
  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log(results);
    setImportResult(results);
    setVariants(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResult(INITIAL_IMPORT_RESULTS);
    setVariants(VARIANTS.LIST);
  };


 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const onSubmitImport = async (
  values:typeof transactionImport.$inferInsert[]
 )=>{
   const accountId= await confirm();

  if(!accountId){
    return toast.error("Please select an account to continue")
  }

  const data = values.map((value)=>({
    ...value,
    accountId:accountId as string,
  }))

  bulkCreateTransactions.mutate(data,{
    onSuccess:()=>{
      onCancelImport();
      
    }
  })

 }



  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="w-8 h-14" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex item-center justify-center">
              <Loader2 className="size-6 text-slate animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <Fragment>
        <ConfirmDialog/>
        <ImportCard
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
          data={importResults.data as string[][]}
        />
      </Fragment>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className=" gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            <UploadButton onUpload={onUpload} />
            <Button size={"sm"} onClick={newTransactions.onOpen}>
              {" "}
              <Plus className="size-4 mr-2" /> Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
            onDelete={(row) => {
              const ids: string[] = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
