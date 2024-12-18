import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Clock, MapPin } from "lucide-react";
import { Event as EventType } from "@/lib/interfaces/event";
import { getImageData, sanityClient } from "@/lib/utils/sanity";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn-ui/components/ui/breadcrumb";
import { PortableText } from "@portabletext/react";
import { generateIsc } from "@/lib/utils/generateIsc";
import { getGoogleMapsLink } from "@/lib/utils/getGoogleMapsLink";
import { Card } from "@/shadcn-ui/components/ui/card";
import { dateWithNnLocale } from "@/lib/utils/date";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

interface OwnProps {
  params: { eventName: string };
}

async function getData(eventName: string) {
  const query = `
    *[_type == "calendar" && slug.current == "${eventName}"]{
      title,
      date,
      description,
      "image": event_image,
      duration,
      "slug": slug.current,
      location
    }[0]
  `;

  const event = await sanityClient.fetch<EventType>(query);

  if (event) generateIsc(event);

  return event;
}

export async function generateStaticParams() {
  const query = `
  *[_type == "calendar"]{
    "slug": slug.current,
  }
`;

  return (await sanityClient.fetch<EventType[]>(query)).map(({ slug }) => ({
    eventName: [slug],
  }));
}

export default async function Event({ params: { eventName } }: OwnProps) {
  const event = await getData(eventName[0]);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <div className="relative h-[500px] w-full bg-gradient-to-br from-blue-500 via-purple-500 to-red-500">
        {event.image && (
          <Image
            priority
            src={getImageData(event.image).url()}
            alt="banner"
            objectFit="cover"
            width={1920}
            height={500}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="container mx-auto pt-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Forside</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{event.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-bold text-3xl text-center mb-4 mt-12">
          {event.title}
        </h1>
        <div className="flex items-start flex-col sm:flex-row justify-between">
          <div className="prose w-full max-w-full pb-40 dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
            <PortableText value={event.description} />
          </div>
          <Card className="flex flex-col p-4 ml-12 md:w-96">
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <p className=" font-bold text-lg">Kvar</p>
            </div>
            <p>{event.location}</p>
            <a
              href={getGoogleMapsLink(event.location)}
              target="_blank"
              className="text-primary underline hover:no-underline"
            >
              Få vegen
            </a>
            <div className="flex items-center mt-4">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <p className=" font-bold text-lg">Når</p>
            </div>
            <p>
              {dateWithNnLocale(event.date, "iiii, MMMM dd")}, {event.duration}
            </p>
            <a
              href={`/calendar/${eventName[0]}.ics`}
              download
              className="text-primary underline hover:no-underline"
            >
              Legg til i kalenderen
            </a>
          </Card>
        </div>
        <Map location={event.location} />
      </div>
    </>
  );
}
