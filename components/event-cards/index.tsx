"use client";

import { useCallback, useState } from "react";
import CalendarEvent from "@/lib/interfaces/calendar-event";
import { cn } from "@/shadcn-ui/lib/utils";
import EventCard from "./event-card";
import IntersectionBlock from "../intersection-block";
import DatePickerWithRange from "../date-range-picker";
import { DateRange } from "react-day-picker";
import { dateWithNnLocale } from "@/lib/utils/date";
import SortedCalendarEvents from "@/lib/interfaces/sorted-calendar-events";
import filterEventsByDay from "./helpers/filter-events-by-day";
import filterEventsByDays from "./helpers/filter-events-by-days";
import groupEventsByMonths from "./helpers/group-events-by-months";
import DateSelect from "./date-select";

interface OwnProps {
  dataByMonth: SortedCalendarEvents;
  events: CalendarEvent[];
}

export default function EventCards({ dataByMonth, events }: OwnProps) {
  const [selectedEvents, setSelectedEvents] =
    useState<SortedCalendarEvents>(dataByMonth);

  const onDatePickerSelect = useCallback(
    (date?: DateRange) => {
      if (!date?.from) {
        return;
      }

      if (!date.to) {
        const eventsByDay = filterEventsByDay(events, date.from);
        setSelectedEvents({
          [dateWithNnLocale(date.from, "MMMM")]: eventsByDay,
        });

        return;
      }

      const filteredEventsByDays = filterEventsByDays(
        events,
        date.from,
        date.to
      );

      setSelectedEvents(groupEventsByMonths(filteredEventsByDays));
    },
    [events]
  );

  if (!dataByMonth) return null;

  return (
    <>
      <DatePickerWithRange onSelect={onDatePickerSelect} />
      <DateSelect
        dataByMonth={dataByMonth}
        setSelectedEvents={setSelectedEvents}
      />
      {Object.keys(selectedEvents).map((month) => (
        <div key={month} className="mb-10 last:mb-28">
          <IntersectionBlock>
            <h2 className="text-8xl font-bold uppercase bg-gradient-to-r from-[rgb(28,138,255)] via-[rgb(152,73,248)] to-[rgb(248,73,204)] bg-clip-text text-transparent w-fit">
              {month}
            </h2>
          </IntersectionBlock>
          <IntersectionBlock baseClassName="transform translate-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {selectedEvents[month].map((event, index) => (
                <EventCard
                  key={event.slug}
                  {...event}
                  className={cn(
                    "group first:row-span-2",
                    index === 5 && "col-span-2"
                  )}
                />
              ))}
            </div>
          </IntersectionBlock>
        </div>
      ))}
    </>
  );
}
