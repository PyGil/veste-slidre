import { writeFile } from "node:fs";
import CalendarEvent from "@/lib/interfaces/calendar-event";

export function generateIsc(event: CalendarEvent) {
  const icsContent = `
    BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:${event.title}
    DESCRIPTION:${event.description || ""}
    LOCATION:${event.location || ""}
    DTSTART:${event.date}
    END:VEVENT
    END:VCALENDAR
`;

  writeFile(`public/calendar/${event.slug}.ics`, icsContent, (error) => {
    if (error) console.error(error);
  });
}
