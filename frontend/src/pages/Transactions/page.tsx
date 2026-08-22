import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Receipt, Plane, Hotel as HotelIcon, Ticket, ChevronRight, Download } from "lucide-react"
import { cn } from "@/lib/utils"
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
  const [openId, setOpenId] = useState<string | null>(null)

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
            const expanded = openId === t.id
            const tax = Math.round(t.amount * 0.1)
            return (
              <Card key={t.id} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">{t.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{t.bookingId} · {t.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-foreground">{formatIDR(t.amount)}</p>
                      <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 gap-1"
                      aria-expanded={expanded}
                      onClick={() => setOpenId(expanded ? null : t.id)}
                    >
                      {expanded ? "Hide" : "View Details"}
                      <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-90")} />
                    </Button>
                  </div>
                </div>

                {expanded && (
                  <div className="mt-5 border-t border-border pt-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2 text-sm">
                        <DetailRow label="Booking ID" value={t.bookingId} />
                        <DetailRow label="Product" value={t.product} />
                        <DetailRow label="Booked on" value={t.date} />
                        <DetailRow label="Status" value={t.status} />
                      </div>
                      <div className="space-y-2 text-sm">
                        <DetailRow label="Subtotal" value={formatIDR(t.amount - tax)} />
                        <DetailRow label="Taxes & fees" value={formatIDR(tax)} />
                        <DetailRow label="Payment method" value="Visa ···· 4821" />
                        <div className="flex items-center justify-between border-t border-border pt-2 font-bold text-foreground">
                          <span>Total paid</span>
                          <span>{formatIDR(t.amount)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={() => toast.success(`Receipt for ${t.bookingId} downloaded.`)}
                      >
                        <Download className="h-3.5 w-3.5" /> Download Receipt
                      </Button>
                      <Button asChild size="sm" variant="outline"><Link to="/trips">Go to My Trips</Link></Button>
                      {t.status === "Confirmed" && (
                        <Button asChild size="sm" variant="ghost"><Link to="/help">Need to change this?</Link></Button>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate font-medium text-foreground">{value}</span>
    </div>
  )
}
