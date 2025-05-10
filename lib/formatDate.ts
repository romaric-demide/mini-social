import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

function formatDate(dateInput: string) {
  const date = new Date(dateInput);
  const now = new Date();

  const minutes = differenceInMinutes(now, date);

  if (minutes < 1) return "à l'instant"; // moins d'une minute → rien
  if (minutes < 60) return `${minutes} m`;

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours} h`;

  const days = differenceInDays(now, date);
  if (days < 7) return `${days} d`;

  return format(
    date,
    now.getFullYear() === date.getFullYear() ? "MMM dd" : "MMM dd, yyyy",
  );
}

export default formatDate;
