import CalendarEvent from "@/lib/interfaces/calendar-event";
import { writeFile } from "fs";
import { parseISO } from "date-fns";
import { toPlainText } from "@portabletext/toolkit";
import { PortableTextBlock } from "next-sanity";
import { formatToICalendarDate, parseTimeRange } from "./date";

const formatDescription = (description: PortableTextBlock[]) => {
  const parsedDescription = toPlainText(description);
  const formattedDescription = parsedDescription.replace(/\n/g, "\\n");

  return formattedDescription;
};

export function generateIsc(event: CalendarEvent) {
  const { startDate, endDate } = parseTimeRange(
    event.duration,
    parseISO(event.date)
  );

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vestre Slidre//Calendar Event//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${formatDescription(event.description)}
LOCATION:${event.location || ""}
DTSTART:${formatToICalendarDate(startDate)}
DTEND:${formatToICalendarDate(endDate)}
END:VEVENT
END:VCALENDAR`;

  writeFile(`public/calendar/${event.slug}.ics`, icsContent, (error) => {
    if (error) console.error(error);
  });
}
