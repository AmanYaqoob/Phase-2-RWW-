"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", total: 4500 },
  { name: "Feb", total: 3800 },
  { name: "Mar", total: 5200 },
  { name: "Apr", total: 6800 },
  { name: "May", total: 7400 },
  { name: "Jun", total: 8900 },
  { name: "Jul", total: 9100 },
  { name: "Aug", total: 8500 },
  { name: "Sep", total: 7800 },
  { name: "Oct", total: 6700 },
  { name: "Nov", total: 5900 },
  { name: "Dec", total: 4800 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                      <span className="font-bold">${payload[0].payload.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar
          dataKey="total"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
          className="hover:opacity-80 cursor-pointer"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
