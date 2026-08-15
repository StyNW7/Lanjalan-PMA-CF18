import { Fragment } from "react"
import { ChevronRight, Home } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

export interface BreadcrumbItemType {
  label: string
  href?: string
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItemType[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-sm text-muted-foreground", className)}>
      <Link to="/" className="flex items-center hover:text-primary" aria-label="Home">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          {item.href && i !== items.length - 1 ? (
            <Link to={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
