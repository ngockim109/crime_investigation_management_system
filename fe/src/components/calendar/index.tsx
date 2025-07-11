import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const Calendar22 = (p: { onchange(v: Date | undefined): void, value: Date, className: string, disable?: boolean }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className={p.className}>
            <div className="flex gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="w-full justify-between font-normal"
                        >
                            {p.value ? p.value.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={p.value}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                p.onchange(date)
                                setOpen(false)
                            }}
                            disabled={(date) => {
                                if (p.disable) {
                                    return date > new Date() || date < new Date("1900-01-01")
                                }
                                return false
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
export default Calendar22