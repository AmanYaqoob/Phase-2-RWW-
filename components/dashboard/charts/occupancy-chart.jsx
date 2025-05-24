"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", occupancy: 65 },
  { name: "Feb", occupancy: 59 },
  { name: "Mar", occupancy: 70 },
  { name: "Apr", occupancy: 71 },
  { name: "May", occupancy: 75 },
  { name: "Jun", occupancy: 80 },
  { name: "Jul", occupancy: 90 },
  { name: "Aug", occupancy: 95 },
  { name: "Sep", occupancy: 88 },
  { name: "Oct", occupancy: 75 },
  { name: "Nov", occupancy: 64 },
  { name: "Dec", occupancy: 58 },
]

export function OccupancyChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
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
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Occupancy</span>
                      <span className="font-bold">{payload[0].payload.occupancy}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="occupancy"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "white", strokeWidth: 2 }}
          className="hover:opacity-80 cursor-pointer"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
