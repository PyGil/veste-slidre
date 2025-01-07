import CalendarEvent from "@/lib/interfaces/calendar-event";
import SortedCalendarEvents from "@/lib/interfaces/sorted-calendar-events";
import { dateWithNnLocale } from "@/lib/utils/date";

export default function groupEventsByMonths(events: CalendarEvent[]) {
  return events.reduce(
    (previous: SortedCalendarEvents, current: CalendarEvent) => {
      const month = dateWithNnLocale(current.date, "MMMM");

      if (!previous[month]) {
        previous[month] = [current];

        return previous;
      }

      previous[month].push(current);

      return previous;
    },
    {}
  );
}
