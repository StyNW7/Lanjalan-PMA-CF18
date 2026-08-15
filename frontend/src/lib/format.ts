export function formatIDR(amount: number) {
  if (amount === 0) return "Free"
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount)
}
