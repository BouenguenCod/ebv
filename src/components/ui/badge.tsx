import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[rgb(53,125,122)] text-white shadow hover:bg-[rgb(38,92,90)]",
        secondary:
          "border-transparent bg-[rgb(55,69,90)] text-white hover:bg-slate-700",
        destructive:
          "border-transparent bg-rose-600 text-white shadow hover:bg-rose-700",
        outline: "text-foreground border-slate-300 dark:border-slate-700",
        amber: "border-amber-300 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
        purple: "border-purple-300 bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800",
        indigo: "border-indigo-300 bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-800",
        emerald: "border-emerald-300 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
