"use client";

import { useState } from "react";
import { Event } from "@/lib/interfaces/event";
import { cn } from "@/shadcn-ui/lib/utils";
import EventCard from "./event-card";
import IntersectionBlock from "./intersection-block";
import DatePickerWithRange from "./date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn-ui/components/ui/select";
import { DateRange } from "react-day-picker";
import { isAfter, isBefore, isEqual, startOfDay } from "date-fns";
import { dateWithNnLocale } from "@/lib/utils/date";

const DEFAULT_SELECT_VALUE = "alle månadene";

interface OwnProps {
  dataByMonth: { [key: string]: Event[] };
  events: Event[];
}

interface SortedEvents {
  [key: string]: Event[];
}

const SCROLL_UNLOCK_ATTRIBUTE = "data-scroll-unlocked";

export default function EventCards({ dataByMonth, events }: OwnProps) {
  const [selectedEvents, setSelectedEvents] = useState<{
    [key: string]: Event[];
  }>(dataByMonth);

  const onSelectValueChange = (value: string) => {
    document.body.removeAttribute(SCROLL_UNLOCK_ATTRIBUTE);

    if (value === DEFAULT_SELECT_VALUE) {
      setSelectedEvents(dataByMonth);

      return;
    }

    setSelectedEvents({ [value]: dataByMonth[value] });
  };

  const onDatePickerSelect = (date?: DateRange) => {
    if (!date?.from) {
      return;
    }

    const monthFormatter = (date: string | number | Date) =>
      dateWithNnLocale(date, "MMMM");

    if (!date.to) {
      const eventsByDay = events.filter((event) =>
        isEqual(event.date, date.from!)
      );
      setSelectedEvents({ [monthFormatter(date.from)]: eventsByDay });

      return;
    }

    const filteredEvents = events.filter((event) => {
      const eventDate = startOfDay(event.date);
      const dateFrom = startOfDay(date.from!);
      const dateTo = startOfDay(date.to!);

      return (
        isEqual(eventDate, dateFrom) ||
        isEqual(eventDate, dateTo) ||
        (isAfter(eventDate, dateFrom) && isBefore(eventDate, dateTo))
      );
    });

    const eventsByMonth = filteredEvents.reduce(
      (previous: SortedEvents, current: Event) => {
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

    setSelectedEvents(eventsByMonth);
  };

  if (!dataByMonth) return null;

  return (
    <>
      <DatePickerWithRange onSelect={onDatePickerSelect} />
      <Select
        onOpenChange={() => {
          document.body.setAttribute(SCROLL_UNLOCK_ATTRIBUTE, "true");
        }}
        onValueChange={onSelectValueChange}
      >
        <SelectTrigger className="w-[15rem] my-4">
          <SelectValue placeholder="Vel ein månad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={DEFAULT_SELECT_VALUE}>
            {DEFAULT_SELECT_VALUE}
          </SelectItem>
          {Object.keys(dataByMonth).map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
