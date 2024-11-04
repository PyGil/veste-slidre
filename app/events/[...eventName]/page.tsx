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
import Image from "next/image";
import Link from "next/link";

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
    }[0]
  `;

  return await sanityClient.fetch<EventType>(query);
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
        <h1 className="font-bold text-3xl text-center mb-4">{event.title}</h1>
        <div className="prose w-full max-w-full">
          <PortableText value={event.description} />
        </div>
      </div>
    </>
  );
}
