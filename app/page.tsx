import { sanityClient, getImageData } from "@/lib/utils/sanity";
import { Card, CardContent, CardTitle } from "@/shadcn-ui/components/ui/card";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Event } from "@/lib/interfaces/event";
import Link from "next/link";

const getFormattedDate = (
  date: string,
  options: Intl.DateTimeFormatOptions
) => {
  return new Intl.DateTimeFormat("no-NO", options).format(new Date(date));
};

async function getData() {
  const query = `
    *[_type == "calendar"] {
      title,
      date,
      description,
      "image": event_image,
      duration,
      "slug": slug.current,
    }
  `;

  const data = await sanityClient.fetch<Event[]>(query);

  return data;
}

interface SortedEvents {
  [key: string]: Event[];
}

export default async function Home() {
  const data = (await getData()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const sortedData = data.reduce((previous: SortedEvents, current: Event) => {
    const month = getFormattedDate(current.date, { month: "long" });

    if (!previous[month]) {
      previous[month] = [current];

      return previous;
    }

    previous[month] = [...previous[month], current];

    return previous;
  }, {});

  // const todayEvents = sortedData[new Date().toLocaleDateString("no-NO", { month: 'long'})]

  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-20 px-2">
        <h1 className="font-bold text-5xl mb-6 uppercase">
          Kva skjer i{" "}
          <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
            Vestre Slidre?
          </span>
        </h1>
        {Object.keys(sortedData).map((month) => (
          <div key={month} className="mb-10">
            <h2 className="text-2xl font-bold uppercase">{month}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedData[month].map((event) => (
                <Link href={`/events/${event.slug}`} key={event.slug}>
                  <Card className="pt-6 relative min-h-[350px] group bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 bg-full overflow-hidden transition-all duration-200 hover:bg-lg">
                    <CardContent className="z-30 absolute top-1 left-1 rounded-lg bg-card/50 backdrop-blur-lg p-2 text-center text-foreground">
                      <p className="uppercase text-sm">
                        {getFormattedDate(event.date, { month: "short" })}
                      </p>
                      <p className="uppercase font-bold text-xl">
                        {new Date(event.date).getDate()}
                      </p>
                    </CardContent>
                    <CardContent className="z-30 absolute bottom-1 left-1 right-1 rounded-lg bg-card/50 backdrop-blur p-2">
                      <CardTitle className="text-foreground">
                        {event.title}
                      </CardTitle>
                      <div className="flex items-center bg-card-foreground/20 rounded-full p-1 w-fit mt-2">
                        <Clock className="h-4 w-4 text-foreground mr-1" />
                        <span className="text-foreground text-sm">
                          {event.duration}
                        </span>
                      </div>
                    </CardContent>
                    {event.image && (
                      <>
                        <span className="absolute z-20 top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-red-500 group-hover:opacity-0 " />
                        <Image
                          width={500}
                          height={350}
                          src={getImageData(event.image).url()}
                          alt={event.title}
                          className="rounded-lg object-cover absolute inset-0 w-full h-full transition-all duration-200 group-hover:brightness-[0.5] group-hover:scale-110"
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
