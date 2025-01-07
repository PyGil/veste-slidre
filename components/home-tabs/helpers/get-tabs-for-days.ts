import CalendarEvent from "@/lib/interfaces/calendar-event";
import SortedCalendarEvents from "@/lib/interfaces/sorted-calendar-events";
import { isEqual } from "date-fns";

export default function getTabsForDays(
  events: CalendarEvent[],
  nextThreeDays: string[],
  nextThreeDaysNames: string[]
) {
  return nextThreeDays.reduce(
    (previous: SortedCalendarEvents, currentDate: string, index: number) => {
      previous[nextThreeDaysNames[index]] = events.filter(({ date }) =>
        isEqual(date, currentDate)
      );

      return previous;
    },
    {}
  );
}
