import CalendarEvent from "@/lib/interfaces/calendar-event";
import { isEqual } from "date-fns";

export default function filterEventsByDay(
  events: CalendarEvent[],
  day: Date
) {
  return events.filter((event) => isEqual(event.date, day));
}
