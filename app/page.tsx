import Image from "next/image";
import Link from "next/link";
import { Clock /* , MapPin */ } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/shadcn-ui/components/ui/card";
import { Event } from "@/lib/interfaces/event";
import { sanityClient, getImageData } from "@/lib/utils/sanity";
import {
  compareDates,
  getDay,
  getLongMonth,
  getNextThreeDays,
  getShortMonth,
  sortDatesByAscending,
} from "@/lib/utils/date";
import clsx from "clsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shadcn-ui/components/ui/tabs";

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

  let test = 0;
  test += 1;

  console.log("test", test);

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
    <>
      <div className="container mx-auto pt-40 px-2">
        <h1 className="font-bold text-5xl mb-6 uppercase text-center text-foreground/65">
          Kva skjer i{" "}
          {/* <span className="bg-gradient-to-b from-[#ff1cf7] to-[#b249f8] bg-clip-text text-transparent"> */}
          {/*  <span className="bg-gradient-to-b from-[rgb(28,138,255)] to-[rgb(152,73,248)] bg-clip-text text-transparent"> */}
          <span className="text-foreground text-glow">Vestre Slidre?</span>
        </h1>
        <Tabs defaultValue={nextThreeDaysNames[0]} className="mb-40">
          <TabsList>
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
                  <Link href={`/events/${event.slug}`} key={event.slug} className="group">
                    <Card className="pt-6 relative min-h-[420px] bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 bg-full overflow-hidden transition-all duration-200 hover:bg-lg">
                      <CardContent className="z-30 absolute top-1 left-1 rounded-lg bg-card/50 backdrop-blur-lg p-2 text-center text-foreground">
                        <p className="uppercase text-sm">
                          {getShortMonth(event.date)}
                        </p>
                        <p className="uppercase font-bold text-xl">
                          {getDay(event.date)}
                        </p>
                      </CardContent>
                      <CardContent className="z-30 absolute bottom-0 left-0 right-0 bg-card/50 backdrop-blur p-2 backdrop-saturate-150 border-t-[1px]">
                        <CardTitle className="text-foreground font-normal">
                          {event.title}
                        </CardTitle>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-card-foreground/20 rounded-full py-1 px-2 w-fit mt-2">
                            <Clock className="h-4 w-4 text-foreground mr-1" />
                            <span className="text-foreground text-sm">
                              {event.duration}
                            </span>
                          </div>
                          {/* <div className="flex items-center bg-card-foreground/20 rounded-full py-1 px-2 w-fit mt-2">
                            <MapPin className="h-4 w-4 text-foreground mr-1" />
                            <span className="text-foreground text-sm">
                              {event.location}
                            </span>
                          </div> */}
                        </div>
                      </CardContent>
                      <span className="z-30 absolute left-1/2 top-[70%] transform -translate-x-1/2 -translate-y-1/2 text-xl text-center opacity-0 group-hover:opacity-100 group-hover:top-1/2 group-focus-visible:opacity-100 group-focus-visible:top-1/2 transition-all duration-200">
                        Les mer om {event.title}
                      </span>
                      {event.image && (
                        <>
                          <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-200 absolute z-20 top-0 left-0 w-full h-full bg-gradient-to-br from-[#1c8aff]/90 via-transparent to-[#9849f8]/90" />
                          <Image
                            width={500}
                            height={350}
                            src={getImageData(event.image).url()}
                            alt={event.title}
                            className="rounded-lg object-cover absolute inset-0 w-full h-full transition-all duration-200 group-hover:scale-110 group-hover:blur-xl  group-focus-visible:scale-110 group-focus-visible:blur-xl"
                          />
                        </>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        {Object.keys(dataByMonth).map((month) => (
          <div key={month} className="mb-10">
            <h2 className="text-8xl font-bold uppercase bg-gradient-to-r from-[rgb(28,138,255)] via-[rgb(152,73,248)] to-[rgb(248,73,204)] bg-clip-text text-transparent w-fit">
              {month}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
              {dataByMonth[month].map((event, index, array) => (
                <Link
                  href={`/events/${event.slug}`}
                  key={event.slug}
                  className={clsx(
                    { "col-span-2": index === array.length - 2 },
                    "group first:row-span-2"
                  )}
                >
                  <Card className="pt-6 relative h-full min-h-[340px] bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 bg-full overflow-hidden transition-all duration-200 hover:bg-lg">
                    <CardContent className="z-30 absolute top-1 left-1 rounded-lg bg-card/50 backdrop-blur-lg p-2 text-center text-foreground">
                      <p className="uppercase text-sm">
                        {getShortMonth(event.date)}
                      </p>
                      <p className="uppercase font-bold text-xl">
                        {getDay(event.date)}
                      </p>
                    </CardContent>
                    <CardContent className="z-30 absolute bottom-0 left-0 right-0 bg-card/50 backdrop-blur p-2 backdrop-saturate-150 border-t-[1px]">
                      <CardTitle className="text-foreground font-normal">
                        {event.title}
                      </CardTitle>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-card-foreground/20 rounded-full py-1 px-2 w-fit mt-2">
                          <Clock className="h-4 w-4 text-foreground mr-1" />
                          <span className="text-foreground text-sm">
                            {event.duration}
                          </span>
                        </div>
                        {/* <div className="flex items-center bg-card-foreground/20 rounded-full py-1 px-2 w-fit mt-2">
                          <MapPin className="h-4 w-4 text-foreground mr-1" />
                          <span className="text-foreground text-sm">
                            {event.location}
                          </span>
                        </div> */}
                      </div>
                    </CardContent>
                    <span className="z-30 absolute left-1/2 top-[70%] transform -translate-x-1/2 -translate-y-1/2 text-xl text-center opacity-0 group-hover:opacity-100 group-hover:top-1/2 group-focus-visible:opacity-100 group-focus-visible:top-1/2 transition-all duration-200">
                      Les mer om {event.title}
                    </span>
                    {event.image && (
                      <>
                        <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-200 absolute z-20 top-0 left-0 w-full h-full bg-gradient-to-br from-[#1c8aff]/90 via-transparent to-[#9849f8]/90" />
                        <Image
                          width={500}
                          height={350}
                          src={getImageData(event.image).url()}
                          alt={event.title}
                          className="rounded-lg object-cover absolute inset-0 w-full h-full transition-all duration-200 group-hover:scale-110 group-hover:blur-xl  group-focus-visible:scale-110 group-focus-visible:blur-xl"
                        />
                      </>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
