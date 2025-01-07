import CalendarEvent from "./calendar-event";

export default interface SortedCalendarEvents {
  [key: string]: CalendarEvent[];
}
