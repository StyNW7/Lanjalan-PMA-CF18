import { useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import {
  User,
  Sliders,
  Users2,
  CreditCard,
  Compass,
  ShieldCheck,
  Bell,
  History,
  ArrowRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppState } from "@/context/app-state"
import { claraPersona } from "@/data/compass"
import { transactions } from "@/data/transactions"

const paymentMethods = [
  { id: "visa", label: "Visa •••• 4821" },
  { id: "gopay", label: "GoPay Wallet" },
]

export default function ProfilePage() {
  const { onboarding, personalizationEnabled } = useAppState()
  const [details, setDetails] = useState({
    fullName: "Clara Amelia",
    email: "clara@example.com",
    phone: "+62 812 3456 7890",
    city: "Jakarta",
  })
  const [defaultPayment, setDefaultPayment] = useState("visa")

  function updateDetail(key: keyof typeof details, value: string) {
    setDetails((prev) => ({ ...prev, [key]: value }))
  }

  function handleSaveDetails(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Personal details saved.")
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center gap-4">
        <img src="https://picsum.photos/seed/lanjalan-avatar-clara/160/160" alt="Clara" className="h-20 w-20 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{claraPersona.name}</h1>
          <p className="text-sm text-muted-foreground">{claraPersona.profile}</p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><User className="h-4 w-4 text-primary" /> Personal Details</h2>
          <form onSubmit={handleSaveDetails}>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={details.fullName} onChange={(e) => updateDetail("fullName", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pemail">Email</Label>
                <Input id="pemail" type="email" value={details.email} onChange={(e) => updateDetail("email", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pphone">Phone Number</Label>
                <Input id="pphone" value={details.phone} onChange={(e) => updateDetail("phone", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pcity">Home City</Label>
                <Input id="pcity" value={details.city} onChange={(e) => updateDetail("city", e.target.value)} className="mt-1.5" />
              </div>
            </div>
            <Button type="submit" className="mt-5">Save Changes</Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><Sliders className="h-4 w-4 text-primary" /> Traveler Preferences</h2>
          <p className="mt-1 text-sm text-muted-foreground">Set during onboarding. Used to tailor recommendations across Lanjalan.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {onboarding.travelerType && <Badge variant="secondary" className="capitalize">{onboarding.travelerType}</Badge>}
            {onboarding.priorities.map((p) => <Badge key={p} variant="muted" className="capitalize">{p}</Badge>)}
            {!onboarding.travelerType && onboarding.priorities.length === 0 && (
              <p className="text-sm text-muted-foreground">No preferences set yet.</p>
            )}
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link to="/onboarding">Update Preferences</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><Users2 className="h-4 w-4 text-primary" /> Saved Travelers</h2>
          <div className="mt-4 space-y-2">
            {["Clara Amelia (You)", "Rian Pratama"].map((name) => (
              <div key={name} className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
                <span className="text-foreground">{name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0"
                  onClick={() => toast.success(`Traveler details for ${name} are ready to edit.`)}
                >
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><CreditCard className="h-4 w-4 text-primary" /> Payment Methods</h2>
          <div className="mt-4 space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-sm">
                <span className="text-foreground">{method.label}</span>
                {defaultPayment === method.id ? (
                  <Badge variant="success">Default</Badge>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                    onClick={() => {
                      setDefaultPayment(method.id)
                      toast.success(`${method.label} is now your default payment method.`)
                    }}
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-primary/20 bg-primary-light/40 p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><Compass className="h-4 w-4 text-primary" /> AIR Personalization Preferences</h2>
          <p className="mt-1 text-sm text-muted-foreground">Controls whether Compass can use your booking context to personalize recommendations.</p>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-background px-4 py-3">
            <span className="text-sm font-medium text-foreground">Personalization is currently</span>
            <Badge variant={personalizationEnabled ? "success" : "muted"}>{personalizationEnabled ? "Enabled" : "Disabled"}</Badge>
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link to="/privacy">Manage in Privacy Settings</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Privacy</h2>
          <p className="mt-1 text-sm text-muted-foreground">Review what Compass uses and manage your data.</p>
          <Button asChild variant="ghost" size="sm" className="mt-3 gap-1">
            <Link to="/privacy">Open Privacy Settings <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><Bell className="h-4 w-4 text-primary" /> Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose what updates you want to receive.</p>
          <Button asChild variant="ghost" size="sm" className="mt-3 gap-1">
            <Link to="/notifications">Manage Notifications <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><History className="h-4 w-4 text-primary" /> Trip History</h2>
          <div className="mt-4 space-y-2">
            {transactions.slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
                <span className="text-foreground">{t.title}</span>
                <span className="text-muted-foreground">{t.date}</span>
              </div>
            ))}
          </div>
          <Button asChild variant="ghost" size="sm" className="mt-3 gap-1">
            <Link to="/transactions">View All Transactions <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
