import { useMemo, useState } from "react"
import { Receipt, Plane, Hotel as HotelIcon, Ticket, ChevronRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { formatIDR } from "@/lib/format"
import { transactions } from "@/data/transactions"
import type { Transaction } from "@/data/types"

const statusVariant: Record<Transaction["status"], "success" | "secondary" | "destructive" | "warning"> = {
  Confirmed: "success",
  Completed: "secondary",
  Cancelled: "destructive",
  "Refund Processing": "warning",
}

const productIcon = { Flight: Plane, Hotel: HotelIcon, Activity: Ticket } as const

export default function TransactionsPage() {
  const [tab, setTab] = useState<"All" | "Flights" | "Hotels" | "Activities">("All")

  const filtered = useMemo(() => {
    if (tab === "All") return transactions
    const map = { Flights: "Flight", Hotels: "Hotel", Activities: "Activity" } as const
    return transactions.filter((t) => t.product === map[tab])
  }, [tab])

  return (
    <div className="container py-10">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
        <Receipt className="h-5 w-5 text-primary" /> Transactions
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">A record of everything you've booked with Lanjalan.</p>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mt-6">
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Flights">Flights</TabsTrigger>
          <TabsTrigger value="Hotels">Hotels</TabsTrigger>
          <TabsTrigger value="Activities">Activities</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState icon={Receipt} title="No transactions yet" description="Bookings you make will show up here." />
        ) : (
          filtered.map((t) => {
            const Icon = productIcon[t.product]
            return (
              <Card key={t.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.bookingId} · {t.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-foreground">{formatIDR(t.amount)}</p>
                    <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View Details <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
