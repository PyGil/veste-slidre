import { sanityClient, getImageData } from "@/lib/utils/sanity";
import { Card, CardContent, CardTitle } from "@/shadcn-ui/components/ui/card";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Event } from "@/lib/interfaces/event";
import Link from "next/link";

const getMonthName = (date: string) => {
  return new Intl.DateTimeFormat("no-NO", { month: "short" }).format(
    new Date(date)
  );
};

async function getData() {
  const query = `
    *[_type == "calendar"]{
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

export default async function Home() {
  const data = await getData();

  return (
    <div className="container mx-auto pt-10">
      <h1 className="font-bold text-3xl mb-3">
        Kva skjer i{" "}
        <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
          Vestre Slidre?
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((event) => (
          <Link href={`/events/${event.slug}`} key={event.slug}>
            <Card className="pt-6 relative min-h-[300px] group">
              <CardContent className="z-10 absolute top-1 left-1 rounded-lg bg-card/50 backdrop-blur-lg p-2 text-center text-background">
                <p className="uppercase text-sm">{getMonthName(event.date)}</p>
                <p className="uppercase font-bold text-xl">
                  {new Date(event.date).getDate()}
                </p>
              </CardContent>
              <CardContent className="z-10 absolute bottom-1 left-1 right-1 rounded-lg bg-card/50 backdrop-blur p-2">
                <CardTitle className="text-background">{event.title}</CardTitle>
                {/* <p className="card-text">{event.description}</p> */}
                <div className="flex items-center bg-card-foreground/20 rounded-full p-1 w-fit mt-1">
                  <Clock className="h-4 w-4 text-background mr-1" />
                  <span className="text-background text-sm">
                    {event.duration}
                  </span>
                </div>
              </CardContent>
              <Image
                width={500}
                height={300}
                src={getImageData(event.image).url()}
                alt={event.title}
                className="rounded-lg object-cover absolute inset-0 w-full h-full transition-filter duration-200 group-hover:brightness-[0.5]"
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
