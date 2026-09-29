import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-xs font-bold leading-none text-slate-700 dark:text-slate-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
