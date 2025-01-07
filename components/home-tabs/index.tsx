import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shadcn-ui/components/ui/tabs";
import { getNextThreeDays } from "@/lib/utils/date";
import CalendarEvent from "@/lib/interfaces/calendar-event";

import { HomeTabsContent } from "./home-tabs-content";
import getTabsForDays from "./helpers/get-tabs-for-days";

interface OwnProps {
  events: CalendarEvent[];
}

export function HomeTabs({ events }: OwnProps) {
  const { nextThreeDays, nextThreeDaysNames } = getNextThreeDays();
  const tabsForDays = getTabsForDays(events, nextThreeDays, nextThreeDaysNames);
  const [defaultTab] = nextThreeDaysNames;

  return (
    <Tabs defaultValue={defaultTab} className="mb-40 flex flex-col">
      <TabsList className="w-fit mx-auto mb-4 py-5">
        {nextThreeDaysNames.map((day) => (
          <TabsTrigger className="text-md" key={day} value={day}>
            {day}
          </TabsTrigger>
        ))}
      </TabsList>
      {nextThreeDaysNames.map((day) => (
        <TabsContent className="min-h-80" key={day} value={day}>
          <HomeTabsContent events={tabsForDays[day]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
