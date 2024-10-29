import { Event as EventType } from "@/lib/interfaces/event";
import { sanityClient } from "@/lib/utils/sanity";
import { PortableText } from "@portabletext/react";

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
    <div className="container mx-auto pt-10">
      <h1 className="font-bold text-3xl mb-3 text-center mb-4">
        {event.title}
      </h1>
      <div className="prose w-full">
        <PortableText value={event.description} />
      </div>
    </div>
  );
}
