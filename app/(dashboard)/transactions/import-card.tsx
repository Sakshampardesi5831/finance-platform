import React, { useState } from "react";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ImportTable from "./import-table";
import { convertAmountToMiliunits } from "@/lib/utils";
import { format, parse } from "date-fns";
const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectColumnState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
};

const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectColumnState>({});
  const headers = data[0];
  const body = data.slice(1);
  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectColumn = { ...prev };
      for (const key in newSelectColumn) {
        if (newSelectColumn[key] === value) {
          newSelectColumn[key] = null;
        }
      }
      if (value === "skip") {
        value = null;
      }
      newSelectColumn[`column_${columnIndex}`] = value;
      return newSelectColumn;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;
  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };
    const mappedData = {
      headers: headers.map((_headers, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${index}`] || null;
      }),
      body: body
        .map((row, index) => {
          const transformRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${index}`] ? cell : null;
          });

          return transformRow.every((item) => item === null)
            ? []
            : transformRow;
        })
        .filter((row) => row.length > 0),
    };
    const arrayOfData = mappedData.body.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header != null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });
    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMiliunits(parseFloat(item.amount)),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));
    console.log(formattedData);
    onSubmit(formattedData);
  };
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className=" gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            <Button onClick={onCancel} size={"sm"}>
              Cancel
            </Button>
            <Button onClick={handleContinue} size={"sm"}>
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;
