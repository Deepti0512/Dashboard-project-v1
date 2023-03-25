import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Completed", "OverDue", "InProgress"],
  ["2019", 1400, 400, 600],
  ["2020", 1370, 460, 1050],
  ["2021", 1460, 260, 1100],
  ["2012", 1030, 540, 1350],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2019-2022",
  },
};

export default function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
