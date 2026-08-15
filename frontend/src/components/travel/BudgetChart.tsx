import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { formatIDR } from "@/lib/format"

const COLORS = ["#358EBD", "#FF9139", "#22A06B", "#E7A11A"]

export function BudgetChart({
  flight,
  hotel,
  activities,
  transportation,
  remaining,
}: {
  flight: number
  hotel: number
  activities: number
  transportation: number
  remaining: number
}) {
  const data = [
    { name: "Flight", value: flight },
    { name: "Hotel", value: hotel },
    { name: "Activities", value: activities },
    { name: "Transportation", value: transportation },
  ]

  return (
    <div>
      <div className="relative mx-auto h-52 w-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={90} paddingAngle={3} strokeWidth={0}>
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatIDR(Number(Array.isArray(value) ? value[0] : value))} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-muted-foreground">Remaining</p>
          <p className="text-base font-extrabold text-foreground">{formatIDR(remaining)}</p>
        </div>
      </div>
      <div className="mt-5 space-y-2.5">
        {data.map((entry, i) => (
          <div key={entry.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              {entry.name}
            </span>
            <span className="font-semibold text-foreground">{formatIDR(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
