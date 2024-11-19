"use client";

import { Event } from "@/lib/interfaces/event";
import { cn } from "@/shadcn-ui/lib/utils";
import EventCard from "./event-card";
import IntersectionBlock from "./intersection-block";
import DatePickerWithRange from "./date-range-picker";

interface OwnProps {
  dataByMonth: { [key: string]: Event[] };
}

export default function EventCards({ dataByMonth }: OwnProps) {
  if (!dataByMonth) return null;

  return (
    <>
      <DatePickerWithRange onSelect={(date) => console.log(date)} />
      {Object.keys(dataByMonth).map((month) => (
        <div key={month} className="mb-10 last:mb-28">
          <IntersectionBlock>
            <h2 className="text-8xl font-bold uppercase bg-gradient-to-r from-[rgb(28,138,255)] via-[rgb(152,73,248)] to-[rgb(248,73,204)] bg-clip-text text-transparent w-fit">
              {month}
            </h2>
          </IntersectionBlock>
          <IntersectionBlock baseClassName="transform translate-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {dataByMonth[month].map((event, index) => (
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
