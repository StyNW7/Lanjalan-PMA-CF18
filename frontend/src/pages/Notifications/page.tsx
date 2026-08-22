import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Bell, Compass, Tag, Briefcase, CheckCircle2, Settings, CheckCheck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { EmptyState } from "@/components/ui/empty-state"
import { notifications as notificationData } from "@/data/notifications"
import { useAppState } from "@/context/app-state"
import { cn } from "@/lib/utils"

const typeIcon = { trip: Briefcase, price: Tag, booking: CheckCircle2, compass: Compass, promo: Tag } as const

export default function NotificationsPage() {
  const { readNotificationIds, markNotificationRead, markAllNotificationsRead } = useAppState()
  const [tripUpdates, setTripUpdates] = useState(true)
  const [priceAlerts, setPriceAlerts] = useState(true)
  const [promoAlerts, setPromoAlerts] = useState(false)

  const notifications = useMemo(
    () => notificationData.map((n) => ({ ...n, read: n.read || readNotificationIds.includes(n.id) })),
    [readNotificationIds]
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
            <Bell className="h-5 w-5 text-primary" /> Notifications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{unreadCount} unread notifications</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => markAllNotificationsRead(notificationData.map((n) => n.id))}
        >
          <CheckCheck className="h-4 w-4" /> Mark all as read
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {notifications.length === 0 ? (
            <EmptyState icon={Bell} title="You're all caught up" description="New updates about your trips will show up here." />
          ) : (
            notifications.map((n) => {
              const Icon = typeIcon[n.type]
              return (
                <Card
                  key={n.id}
                  asChild
                  className={cn(
                    "transition-colors hover:border-primary/30",
                    !n.read && "border-primary/30 bg-primary-light/30"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => markNotificationRead(n.id)}
                    aria-label={n.read ? n.title : `${n.title} (unread)`}
                    className="flex w-full items-start gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", n.read ? "bg-muted" : "bg-primary-light")}>
                      <Icon className={cn("h-5 w-5", n.read ? "text-muted-foreground" : "text-primary")} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-foreground">{n.title}</p>
                        {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{n.description}</p>
                      <p className="mt-1.5 text-xs text-muted-foreground">{n.date}</p>
                    </div>
                  </button>
                </Card>
              )
            })
          )}
        </div>

        <Card className="h-fit p-5">
          <p className="flex items-center gap-1.5 font-bold text-foreground"><Settings className="h-4 w-4" /> Notification Settings</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="trip-updates" className="text-sm font-normal text-foreground">Trip updates</Label>
              <Switch id="trip-updates" checked={tripUpdates} onCheckedChange={setTripUpdates} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="price-alerts" className="text-sm font-normal text-foreground">Price alerts</Label>
              <Switch id="price-alerts" checked={priceAlerts} onCheckedChange={setPriceAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="promo-alerts" className="text-sm font-normal text-foreground">Promotions</Label>
              <Switch id="promo-alerts" checked={promoAlerts} onCheckedChange={setPromoAlerts} />
            </div>
          </div>
          <Button asChild variant="ghost" size="sm" className="mt-4 w-full">
            <Link to="/settings">Manage all settings</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
