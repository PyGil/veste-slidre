import { Event } from "@/lib/interfaces/event";
import { sanityClient } from "@/lib/utils/sanity";
import { dateWithNnLocale, sortDatesByAscending } from "@/lib/utils/date";
import EventCards from "@/components/event-cards";
import { HomeTabs } from "@/components/HomeTabs";

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
  const data = (await getData()).sort((firstEvent, secondEvent) =>
    sortDatesByAscending(firstEvent.date, secondEvent.date)
  );

  const dataByMonth = data.reduce((previous: SortedEvents, current: Event) => {
    const month = dateWithNnLocale(current.date, "MMMM");

    if (!previous[month]) {
      previous[month] = [current];

      return previous;
    }

    previous[month].push(current);

    return previous;
  }, {});

  return (
    <div className="container mx-auto pt-40 px-2">
      <h1 className="font-bold text-5xl mb-20 uppercase text-center text-foreground/65">
        Kva skjer i{" "}
        <span className="text-foreground text-glow">Vestre Slidre?</span>
      </h1>
      <HomeTabs events={data} />
      <EventCards dataByMonth={dataByMonth} events={data} />
    </div>
  );
}
