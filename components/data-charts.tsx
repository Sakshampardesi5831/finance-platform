"use client";
import React, { Fragment } from "react";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { Charts, ChartsLoading } from "./charts";
import { SpendingCharts, SpendingPieLoading } from "./spending-pie";
export const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartsLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Charts data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingCharts data={data?.categories} />
      </div>
    </div>
  );
};
