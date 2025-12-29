import React, { Fragment } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CategoryTooltip } from "./category-tooltip";

type Props = {
  data?: {
    value: number;
    name: string;
  }[];
};

const RadarVariant = ({ data }: Props) => {
  return (
    <Fragment>
      <ResponsiveContainer width={"100%"} height={350}>
        <RadarChart cx={"50%"} cy={"50%"} outerRadius={"60%"} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" style={{ fontSize: "12px" }} />
          <PolarRadiusAxis style={{ fontSize: "12px" }} />
          <Radar
            dataKey={"value"}
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Tooltip content={<CategoryTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default RadarVariant;
