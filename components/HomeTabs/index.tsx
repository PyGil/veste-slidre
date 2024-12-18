import { isEqual } from "date-fns";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shadcn-ui/components/ui/tabs";
import { getNextThreeDays } from "@/lib/utils/date";
import { Event } from "@/lib/interfaces/event";
import { HomeTabsContent } from "./HomeTabsContent";

interface OwnProps {
  events: Event[];
}

export function HomeTabs({ events }: OwnProps) {
  const { nextThreeDays, nextThreeDaysNames } = getNextThreeDays();

  const daysTabs = nextThreeDays.reduce(
    (previous: Record<string, Event[]>, currentDate: string, index: number) => {
      previous[nextThreeDaysNames[index]] = events.filter(({ date }) =>
        isEqual(date, currentDate)
      );

      return previous;
    },
    {}
  );

  return (
    <Tabs defaultValue={nextThreeDaysNames[0]} className="mb-40 flex flex-col">
      <TabsList className="w-fit mx-auto mb-4 py-5">
        {nextThreeDaysNames.map((day) => (
          <TabsTrigger className="text-md" key={day} value={day}>
            {day}
          </TabsTrigger>
        ))}
      </TabsList>
      {nextThreeDaysNames.map((day) => (
        <TabsContent className="min-h-[340px]" key={day} value={day}>
          <HomeTabsContent events={daysTabs[day]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
