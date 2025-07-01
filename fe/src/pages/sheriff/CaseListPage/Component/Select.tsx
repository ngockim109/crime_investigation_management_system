import { clsx } from "clsx"
import { ChevronDown } from "lucide-react"
import { forwardRef, type SelectHTMLAttributes } from "react"

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, options, ...props }, ref) => {
  return (
    <div className="relative flex rounded-md border border-gray-300 bg-gray-300 items-center pr-3">
      <select
        className={clsx(
          "flex h-10 w-full appearance-none px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-3 h-4 w-4 opacity-50 pointer-events-none" />
    </div>
  )
})

Select.displayName = "Select"

export { Select }
