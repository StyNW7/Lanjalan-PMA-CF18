import { motion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Reveal helpers.
 *
 * Every animated element owns its own `initial` / `whileInView` pair instead of
 * inheriting variants from a parent. Parent-driven variants break whenever the
 * list re-renders (filtering, sorting, tab switches): the parent has already
 * fired its one-shot in-view trigger, so freshly mounted children can stay
 * stuck at `opacity: 0` and the results look empty or unclickable.
 */

const DURATION = 0.4

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Plain layout wrapper. Keeps the grid/list classes exactly as they were so the
 * animation layer never interferes with the page layout.
 */
export function FadeInGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function FadeInItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode
  className?: string
  /** Position in the list — used for a subtle stagger, capped so long lists stay snappy. */
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: DURATION, delay: Math.min(index, 8) * 0.05, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
