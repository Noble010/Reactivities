// import { type DateArg , format} from "date-fns"
// export function formatDate (date: DateArg<Date>){
//     return format(date, "dd MMM yyyy h:mm a")
// }

// import { type DateArg, format, isValid } from "date-fns";

// export function formatDate(date: DateArg<Date>) {
//   const parsed = typeof date === "string" || typeof date === "number"
//     ? new Date(date)
//     : date;

//   if (!parsed || !isValid(parsed)) {
//     return "Invalid date";
//   }

//   return format(parsed, "dd MMM yyyy h:mm a");
// }

import { format, isValid } from "date-fns";
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

export const requiredString = (fieldName: string) =>
  z.string().min(2, { message: `${fieldName} is required` });
