/**
 * Format UUID to get the part before the first dash and convert to uppercase
 * @param uuid - The UUID string to format
 * @returns The formatted string (first part before dash, uppercase)
 */
export const formatUUID = (uuid: string): string => {
  // Split by dash and take the first part, then convert to uppercase
  const firstPart = uuid.split("-")[0]

  return firstPart.toUpperCase()
}
