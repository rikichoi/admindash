"use client";
import { Item, Organisation } from "@/lib/types";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type BarGraphProps = {
  organisations?: Organisation[] | null;
  items?: Item[] | null;
};

export default function BarGraph({ items, organisations }: BarGraphProps) {
  return (
    (organisations && (
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart
          data={organisations}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="totalDonationsValue"
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
    )) ||
    (items && items.length ? (
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart
          data={items}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="totalDonationValue"
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <span>No Items Exist...</span>
    ))
  );
}
