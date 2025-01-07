import CalendarEvent from "@/lib/interfaces/calendar-event";
import EventCard from "@/components/event-cards/event-card";

interface OwnProps {
  events: CalendarEvent[];
}

export function HomeTabsContent({ events }: OwnProps) {
  if (!events?.length)
    return (
      <div className="flex items-center justify-center h-80">
        <p>Det er inga aktivitetar på denne dagen.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 min-h-80">
      {events.map((event) => (
        <EventCard key={event.slug} {...event} />
      ))}
    </div>
  );
}
