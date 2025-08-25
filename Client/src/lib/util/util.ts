import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";
import z from "zod";

export function formatDate(date: Date | string | number | null | undefined): string {
  const parsed =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  if (!parsed || !isValid(parsed)) {
    return "Invalid date";
  }

  return format(parsed, "dd MMM yyyy h:mm a");
}
export function timeAgo(date: string | Date) {
  const validDate = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(validDate, { addSuffix: true });
}

export const requiredString = (fieldName: string) =>
  z.string().min(2, { message: `${fieldName} is required` });
