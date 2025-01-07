import CalendarEvent from "@/lib/interfaces/calendar-event";
import { sanityClient } from "@/lib/utils/sanity";
import { dateWithNnLocale, sortDatesByAscending } from "@/lib/utils/date";
import EventCards from "@/components/event-cards";
import { HomeTabs } from "@/components/home-tabs";
import SortedCalendarEvents from "@/lib/interfaces/sorted-calendar-events";

async function getCalendarEvents() {
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

  const events = await sanityClient.fetch<CalendarEvent[]>(query);

  return events.sort((firstEvent, secondEvent) =>
    sortDatesByAscending(firstEvent.date, secondEvent.date)
  );
}

export default async function Home() {
  const events = await getCalendarEvents();

  const dataByMonth = events.reduce(
    (previous: SortedCalendarEvents, current: CalendarEvent) => {
      const month = dateWithNnLocale(current.date, "MMMM");

      if (!previous[month]) {
        previous[month] = [current];

        return previous;
      }

      previous[month].push(current);

      return previous;
    },
    {}
  );

  return (
    <div className="container mx-auto pt-40 px-2">
      <h1 className="font-bold text-5xl mb-20 uppercase text-center text-foreground/65">
        Kva skjer i{" "}
        <span className="text-foreground text-glow">Vestre Slidre?</span>
      </h1>
      <HomeTabs events={events} />
      <EventCards dataByMonth={dataByMonth} events={events} />
    </div>
  );
}
