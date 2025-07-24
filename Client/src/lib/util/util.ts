// import { type DateArg , format} from "date-fns"
// export function formatDate (date: DateArg<Date>){
//     return format(date, "dd MMM yyyy h:mm a")
// }

import { type DateArg, format, isValid } from "date-fns";

export function formatDate(date: DateArg<Date>) {
  const parsed = typeof date === "string" || typeof date === "number"
    ? new Date(date)
    : date;

  if (!parsed || !isValid(parsed)) {
    return "Invalid date";
  }

  return format(parsed, "dd MMM yyyy h:mm a");
}
