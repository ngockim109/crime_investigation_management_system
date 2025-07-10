import moment from "moment-timezone"
import { toast } from "react-toastify"
/**
 * Format a date string into readable date and time parts
 * @param date - The input date string (ISO format or similar)
 * @returns An object containing:
 *  - Date: formatted as MM/DD/YYYY
 *  - Time: formatted as HH/MM (24-hour format)
 */
export const formatDate = (date: string) => {
  const d = new Date(date)

  return {
    Date: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
    Time: `${d.getHours()}:${d.getMinutes()}`,
  }
}

export function toUSATimeISOString(
  timeString: string,
  timezone = "America/New_York"
): string {
  const parsed = moment.tz(timeString, ["hh:mm A", "HH:mm"], true, timezone)

  if (!parsed.isValid()) {
    toast.error("Invalid time_of_arrival format")
    return new Date().toISOString()
  }

  const nowInTimezone = moment.tz(timezone)

  const combined = nowInTimezone.set({
    hour: parsed.hour(),
    minute: parsed.minute(),
    second: 0,
    millisecond: 0,
  })

  return combined.toDate().toISOString()
}

export function fromISOToDisplayTime(iso: string): string {
  return moment.utc(iso).tz("America/New_York").format("HH:mm")
}
