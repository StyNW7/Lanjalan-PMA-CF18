import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Plane, ShieldCheck, Luggage, CreditCard, Wallet, Landmark } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { formatIDR } from "@/lib/format"
import { flights } from "@/data/flights"
import { useAppState } from "@/context/app-state"
import { cn } from "@/lib/utils"
import type { Flight } from "@/data/types"

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "transfer", label: "Bank Transfer", icon: Landmark },
  { id: "wallet", label: "E-Wallet", icon: Wallet },
]

export default function FlightCheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { bookFlight } = useAppState()

  const flight: Flight = (location.state as { flight?: Flight } | null)?.flight || flights[0]

  const [protection, setProtection] = useState(true)
  const [baggage, setBaggage] = useState(false)
  const [payment, setPayment] = useState("card")
  const [submitting, setSubmitting] = useState(false)

  const baseFare = flight.price * 2
  const protectionFee = protection ? 45000 : 0
  const baggageFee = baggage ? 150000 : 0
  const taxes = Math.round(baseFare * 0.08)
  const total = baseFare + protectionFee + baggageFee + taxes

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      bookFlight(
        flight.destination.city,
        "18–21 September 2026",
        "4 Days / 3 Nights",
        2,
        `${flight.origin.city} → ${flight.destination.city} · ${flight.airline} ${flight.flightNumber}`
      )
      navigate("/booking-success")
    }, 900)
  }

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Flights", href: "/flights" }, { label: "Results", href: "/flights/results" }, { label: "Checkout" }]} />
      <h1 className="mt-4 text-2xl font-extrabold text-foreground">Confirm and Pay</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h2 className="flex items-center gap-2 font-bold text-foreground"><Plane className="h-4 w-4 text-primary" /> Flight Summary</h2>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{flight.airline} · {flight.flightNumber}</p>
                <p className="text-sm text-muted-foreground">
                  {flight.origin.city} ({flight.origin.code}) {flight.departTime} → {flight.destination.city} ({flight.destination.code}) {flight.arriveTime}
                </p>
              </div>
              <Badge variant="secondary">{flight.cabin}</Badge>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-bold text-foreground">Traveler Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required defaultValue="Clara" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required defaultValue="Amelia" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" required defaultValue="1998-04-12" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="idNumber">ID / Passport Number</Label>
                <Input id="idNumber" required defaultValue="3271xxxxxxxx0001" className="mt-1.5" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-bold text-foreground">Contact Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required defaultValue="clara@example.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required defaultValue="+62 812 3456 7890" className="mt-1.5" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="flex items-center gap-2 font-bold text-foreground"><Luggage className="h-4 w-4 text-primary" /> Seat & Baggage Add-ons</h2>
            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Extra Checked Baggage (20kg)</p>
                  <p className="text-xs text-muted-foreground">Add extra baggage allowance for this flight</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">{formatIDR(150000)}</span>
                  <Checkbox checked={baggage} onCheckedChange={(v) => setBaggage(Boolean(v))} />
                </div>
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="flex items-center gap-2 font-bold text-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Travel Protection</h2>
            <label className="mt-4 flex cursor-pointer items-center justify-between rounded-xl border border-border p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Trip Protection Plan</p>
                <p className="text-xs text-muted-foreground">Covers cancellations, delays, and lost baggage</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">{formatIDR(45000)}</span>
                <Checkbox checked={protection} onCheckedChange={(v) => setProtection(Boolean(v))} />
              </div>
            </label>
          </Card>

          <Card className="p-6">
            <h2 className="font-bold text-foreground">Payment Method</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPayment(method.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors",
                    payment === method.id ? "border-primary bg-primary-light" : "border-border hover:border-primary/40"
                  )}
                >
                  <method.icon className={cn("h-5 w-5", payment === method.id ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-xs font-semibold text-foreground">{method.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <h2 className="font-bold text-foreground">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Base Fare (2 travelers)</span><span className="text-foreground">{formatIDR(baseFare)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Taxes & Fees</span><span className="text-foreground">{formatIDR(taxes)}</span></div>
            {baggage && <div className="flex justify-between"><span className="text-muted-foreground">Extra Baggage</span><span className="text-foreground">{formatIDR(baggageFee)}</span></div>}
            {protection && <div className="flex justify-between"><span className="text-muted-foreground">Travel Protection</span><span className="text-foreground">{formatIDR(protectionFee)}</span></div>}
          </div>
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between text-base font-extrabold text-foreground">
            <span>Total</span>
            <span>{formatIDR(total)}</span>
          </div>
          <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full">
            {submitting ? "Processing..." : "Pay & Confirm Flight"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">By continuing, you agree to Lanjalan's fare rules and terms.</p>
        </Card>
      </form>
    </div>
  )
}
