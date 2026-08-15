import { Link } from "react-router-dom"
import { Instagram, Twitter, Facebook, Youtube, Compass } from "lucide-react"

const columns = [
  {
    title: "Products",
    links: [
      { label: "Flights", href: "/flights" },
      { label: "Hotels", href: "/hotels" },
      { label: "Activities", href: "/activities" },
      { label: "Lanjalan Compass", href: "/compass" },
      { label: "Deals", href: "/deals" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Lanjalan", href: "/about" },
      { label: "Explore", href: "/explore" },
      { label: "Help Center", href: "/help" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "My Trips", href: "/trips" },
      { label: "Transactions", href: "/transactions" },
      { label: "Notifications", href: "/notifications" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy & Personalization", href: "/privacy" },
      { label: "Settings", href: "/settings" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <img src="/Images/logo.png" alt="Lanjalan" className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-xl font-extrabold text-foreground">Lanjalan</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Book the flight. Build the journey. Keep it all connected.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary-dark">
              <Compass className="h-3.5 w-3.5" /> Powered by the AIR Strategy
            </div>
            <div className="mt-5 flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Lanjalan on social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary-light hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-foreground">{col.title}</h4>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Lanjalan. All rights reserved.</p>
          <p>Prototype built for the Product Management Academy business case.</p>
        </div>
      </div>
    </footer>
  )
}
