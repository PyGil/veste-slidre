import { Event } from "@/lib/interfaces/event";
import EventCard from "@/components/event-card";

interface OwnProps {
  events: Event[];
}

export function HomeTabsContent({ events }: OwnProps) {
  if (!events?.length)
    return (
      <div className="flex items-center justify-center h-[340px]">
        <p>Det er inga aktivitetar på denne dagen.</p>
      </div>
    );

  return (
    <div className="grid min-h-[340px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {events.map((event) => (
        <EventCard key={event.slug} {...event} />
      ))}
    </div>
  );
}
