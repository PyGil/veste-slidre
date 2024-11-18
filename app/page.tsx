import { Event } from "@/lib/interfaces/event";
import { sanityClient } from "@/lib/utils/sanity";
import {
  dateWithNnLocale,
  getNextThreeDays,
  sortDatesByAscending,
} from "@/lib/utils/date";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shadcn-ui/components/ui/tabs";
import EventCard from "@/components/event-card";
import EventCards from "@/components/event-cards";
import { isEqual } from "date-fns";

async function getData() {
  const query = `
    *[_type == "calendar"] {
      title,
      date,
      description,
      "image": event_image,
      duration,
      "slug": slug.current,
      location,
    }
  `;

  const data = await sanityClient.fetch<Event[]>(query);

  return data;
}

interface SortedEvents {
  [key: string]: Event[];
}

export default async function Home() {
  const { nextThreeDays, nextThreeDaysNames, daysTabs } = getNextThreeDays();

  const data = (await getData()).sort((firstEvent, secondEvent) =>
    sortDatesByAscending(firstEvent.date, secondEvent.date)
  );

  const { dataByMonth, dataByDay } = data.reduce(
    (
      previous: { dataByMonth: SortedEvents; dataByDay: SortedEvents },
      current: Event
    ) => {
      for (let index = 0; index < nextThreeDays.length; index++) {
        if (isEqual(current.date, nextThreeDays[index])) {
          previous.dataByDay[nextThreeDaysNames[index]].push(current);

          break;
        }
      }

      const month = dateWithNnLocale(current.date, "MMMM");

      if (!previous.dataByMonth[month]) {
        previous.dataByMonth[month] = [current];

        return previous;
      }

      previous.dataByMonth[month].push(current);

      return previous;
    },
    { dataByMonth: {}, dataByDay: daysTabs }
  );

  return (
    <div className="container mx-auto pt-40 px-2">
      <h1 className="font-bold text-5xl mb-20 uppercase text-center text-foreground/65">
        Kva skjer i{" "}
        {/* <span className="bg-gradient-to-b from-[#ff1cf7] to-[#b249f8] bg-clip-text text-transparent"> */}
        {/*  <span className="bg-gradient-to-b from-[rgb(28,138,255)] to-[rgb(152,73,248)] bg-clip-text text-transparent"> */}
        <span className="text-foreground text-glow">Vestre Slidre?</span>
      </h1>
      <Tabs
        defaultValue={nextThreeDaysNames[0]}
        className="mb-40 flex flex-col"
      >
        <TabsList className="w-fit mx-auto mb-4 py-5">
          {nextThreeDaysNames.map((day) => (
            <TabsTrigger className="text-md" key={day} value={day}>
              {day}
            </TabsTrigger>
          ))}
        </TabsList>
        {nextThreeDaysNames.map((day) => (
          <TabsContent className="min-h-[340px]" key={day} value={day}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {dataByDay[day].map((event) => (
                <EventCard key={event.slug} {...event} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <EventCards dataByMonth={dataByMonth} />
    </div>
  );
}
