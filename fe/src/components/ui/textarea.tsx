import type { TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={`border border-gray-300 rounded px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
}
