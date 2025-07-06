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
    Time: `${d.getHours()}:${d.getMinutes()}`
  }
}
