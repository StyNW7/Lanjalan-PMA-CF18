import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Menu,
  Plane,
  Hotel as HotelIcon,
  Ticket,
  Compass as CompassIcon,
  Map,
  Percent,
  Briefcase,
  Bell,
  HelpCircle,
  User,
  Search,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import ModeToggle from "@/components/theme-toggle"

const mainNav = [
  { label: "Flights", href: "/flights", icon: Plane },
  { label: "Hotels", href: "/hotels", icon: HotelIcon },
  { label: "Activities", href: "/activities", icon: Ticket },
  { label: "Explore", href: "/explore", icon: Map },
  { label: "Deals", href: "/deals", icon: Percent },
  { label: "Compass", href: "/compass", icon: CompassIcon },
]

const secondaryNav = [
  { label: "My Trips", href: "/trips", icon: Briefcase },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Help", href: "/help", icon: HelpCircle },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur transition-shadow supports-[backdrop-filter]:bg-background/90 ${
        scrolled ? "shadow-soft" : "border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src="/Images/logo.png" alt="Lanjalan" className="h-8 w-8 rounded-lg object-cover" />
          <span className="text-xl font-extrabold tracking-tight text-foreground">Lanjalan</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-primary-light text-primary-dark" : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-1.5 xl:flex">
          {secondaryNav.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="icon" aria-label={item.label}>
              <Link to={item.href}>
                <item.icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
            <Link to="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden gap-2 rounded-full sm:inline-flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light text-primary-dark">
                  <User className="h-3.5 w-3.5" />
                </span>
                Clara
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/trips">My Trips</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/saved">Saved</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/transactions">Transactions</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/privacy">Privacy</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img src="/Images/logo.png" alt="Lanjalan" className="h-7 w-7 rounded-md object-cover" />
                  Lanjalan
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    <item.icon className="h-5 w-5 text-primary" /> {item.label}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                {secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    <item.icon className="h-5 w-5 text-primary" /> {item.label}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                <Link to="/search" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
                  <Search className="h-5 w-5 text-primary" /> Search
                </Link>
                <Link to="/saved" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
                  <Heart className="h-5 w-5 text-primary" /> Saved
                </Link>
                <Link to="/profile" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
                  <User className="h-5 w-5 text-primary" /> Profile
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
