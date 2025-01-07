import CalendarEvent from "@/lib/interfaces/calendar-event";
import { isAfter, isBefore, isEqual, startOfDay } from "date-fns";

export default function filterEventsByDays(
  events: CalendarEvent[],
  firstDay: Date,
  lastDay: Date
) {
  const filteredEvents = events.filter((event) => {
    const eventDate = startOfDay(event.date);
    const dateFrom = startOfDay(firstDay);
    const dateTo = startOfDay(lastDay);

    return (
      isEqual(eventDate, dateFrom) ||
      isEqual(eventDate, dateTo) ||
      (isAfter(eventDate, dateFrom) && isBefore(eventDate, dateTo))
    );
  });

  return filteredEvents;
}
