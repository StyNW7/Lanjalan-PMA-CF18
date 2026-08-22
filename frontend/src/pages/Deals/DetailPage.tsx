import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Copy, Check, CalendarClock, ArrowRight, Percent, ShieldCheck, Sparkles } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { PromoCard } from "@/components/travel/PromoCard"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { promotions, getPromotionById, getRedemptionSteps, promoDestinationByCategory } from "@/data/promotions"

export default function DealDetailPage() {
  const { id } = useParams()
  const promo = getPromotionById(id || "")
  const [copied, setCopied] = useState(false)

  if (!promo) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">This deal is no longer available.</p>
        <Button asChild className="mt-4"><Link to="/deals">Back to Deals</Link></Button>
      </div>
    )
  }

  const target = promoDestinationByCategory[promo.category]
  const steps = getRedemptionSteps(promo)
  const related = promotions.filter((p) => p.id !== promo.id && p.category === promo.category).slice(0, 3)
  const fallbackRelated = promotions.filter((p) => p.id !== promo.id).slice(0, 3)
  const alsoLike = related.length > 0 ? related : fallbackRelated

  function handleCopy() {
    navigator.clipboard?.writeText(promo!.code).catch(() => {})
    setCopied(true)
    toast.success(`Promo code ${promo!.code} copied.`)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="flex flex-col">
      <div className="container pt-6">
        <Breadcrumb items={[{ label: "Deals", href: "/deals" }, { label: promo.title }]} />
      </div>

      <div className="container mt-4">
        <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
          <img src={promo.image} alt={promo.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <Badge variant="accent" className="mb-2">{promo.discount}</Badge>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">{promo.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1"><Percent className="h-3 w-3" /> {promo.category}</Badge>
            <Badge variant="muted" className="gap-1">
              <CalendarClock className="h-3 w-3" /> Valid until {promo.expiration}
            </Badge>
          </div>

          <p className="mt-5 text-muted-foreground">{promo.description}</p>

          <div className="mt-8">
            <h2 className="font-bold text-foreground">How to use this deal</h2>
            <ol className="mt-3 space-y-3">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary-dark">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <Card className="mt-8 p-5">
            <p className="flex items-center gap-1.5 font-bold text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> Terms &amp; conditions
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{promo.terms}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Offer ends {promo.expiration}. Discounts apply to the base fare or nightly rate before taxes and fees,
              and cannot be combined with other promotions unless stated.
            </p>
          </Card>
        </div>

        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your promo code</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-3">
            <span className="font-mono text-lg font-extrabold tracking-wide text-foreground">{promo.code}</span>
            <Button size="sm" variant="ghost" onClick={handleCopy} className="h-8 shrink-0 gap-1 px-2 text-xs">
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="my-5 h-px bg-border" />

          <p className="text-2xl font-extrabold text-primary">{promo.discount}</p>
          <p className="mt-1 text-sm text-muted-foreground">on eligible {promo.category.toLowerCase()} bookings</p>

          <Button asChild size="lg" className="mt-5 w-full gap-1.5">
            <Link to={target.href}>{target.label} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="mt-2.5 w-full">
            <Link to="/deals">See All Deals</Link>
          </Button>

          <div className="mt-5 rounded-xl bg-primary-light p-4">
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary-dark">
              <Sparkles className="h-4 w-4" /> Stack it with Compass
            </p>
            <p className="mt-1.5 text-xs text-primary-dark/80">
              Compass keeps this deal in mind while building the rest of your trip.
            </p>
          </div>
        </Card>
      </div>

      <section className="container py-14">
        <SectionHeading eyebrow="Keep saving" title="Other deals you might like" />
        <FadeInGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {alsoLike.map((p, i) => (
            <FadeInItem key={p.id} index={i}>
              <PromoCard promo={p} />
            </FadeInItem>
          ))}
        </FadeInGrid>
      </section>
    </div>
  )
}
