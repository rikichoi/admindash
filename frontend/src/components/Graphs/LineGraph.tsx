"use client";
import { Item, Organisation } from "@/lib/types";
import { abbreviateNumber } from "@/lib/utils";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LineGraphProps = {
  organisations?: Organisation[] | null;
  items?: Item[] | null;
};

export default function LineGraph({ organisations, items }: LineGraphProps) {
  return (
    (organisations && (
      <ResponsiveContainer width={"80%"} height={400}>
        <AreaChart
          data={organisations}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={abbreviateNumber}/>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalDonationsCount"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="totalDonationItemsCount"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="totalDonationsValue"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    )) ||
    (items && items.length ? (
      <ResponsiveContainer width={"80%"} height={400}>
        <AreaChart
          data={items}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={abbreviateNumber}/>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalDonationValue"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="donationGoalValue"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    ) : (
      <div className="h-full text-base lg:text-xl flex shrink-0 m-auto">
        <p>No Items Exist...</p>
      </div>
    ))
  );
}
