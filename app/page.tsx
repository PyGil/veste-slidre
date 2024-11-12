import { Event } from "@/lib/interfaces/event";
import { sanityClient, getImageData } from "@/lib/utils/sanity";
import {
  compareDates,
  getLongMonth,
  getNextThreeDays,
  sortDatesByAscending,
} from "@/lib/utils/date";
import clsx from "clsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shadcn-ui/components/ui/tabs";
import EventCard from "@/components/event-card";
import AnimatedOnScrollBlock from "@/components/animated-onscroll-block";

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
        if (compareDates(current.date, nextThreeDays[index])) {
          previous.dataByDay[nextThreeDaysNames[index]].push(current);

          break;
        }
      }

      const month = getLongMonth(current.date);

      if (!previous.dataByMonth[month]) {
        previous.dataByMonth[month] = [current];

        return previous;
      }

      previous.dataByMonth[month].push(current);

      return previous;
    },
    { dataByMonth: {}, dataByDay: daysTabs }
  );

  console.log("databyDay", dataByDay);

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
        <TabsList className="w-fit mx-auto mb-4">
          {nextThreeDaysNames.map((day) => (
            <TabsTrigger key={day} value={day}>
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
      {Object.keys(dataByMonth).map((month) => (
        <div key={month} className="mb-10">
          <AnimatedOnScrollBlock>
            <h2 className="text-8xl font-bold uppercase bg-gradient-to-r from-[rgb(28,138,255)] via-[rgb(152,73,248)] to-[rgb(248,73,204)] bg-clip-text text-transparent w-fit">
              {month}
            </h2>
          </AnimatedOnScrollBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
            {dataByMonth[month].map((event, index, array) => (
              <EventCard
                key={event.slug}
                {...event}
                className={clsx(
                  { "col-span-2": index === array.length - 2 },
                  "group first:row-span-2"
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
