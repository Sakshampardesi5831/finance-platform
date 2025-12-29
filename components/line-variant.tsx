import React, { Fragment } from "react";
import { format } from "date-fns";
import {
  Tooltip,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
} from "recharts";
import { CustomToolTip } from "./custom-tooltip";
type Props = {
  data?: {
    date: string;
    income: number;
    expense: number;
  }[];
};
const LineVariant = ({ data = [] }: Props) => {
  return (
    <Fragment>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={"date"}
            tickFormatter={(value) => format(new Date(value), "dd MMM")}
            style={{ fontSize: "12px" }}
            tickMargin={16}
          />
          <Tooltip content={<CustomToolTip />} />
          <Line
            dot={false}
            dataKey={"income"}
            stroke="#3b82f6"
            strokeWidth={2}
            className="drop-shadow-sm"
          />
          <Line
            dot={false}
            dataKey={"expense"}
            stroke="#f43f5e"
            strokeWidth={2}
            className="drop-shadow-sm"
          />
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default LineVariant;
