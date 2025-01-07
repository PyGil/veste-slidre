import { Dispatch, SetStateAction } from "react";
import SortedCalendarEvents from "@/lib/interfaces/sorted-calendar-events";
import scrollUnlockToggler from "@/lib/utils/set-scroll-toggler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn-ui/components/ui/select";

interface OwnProps {
  dataByMonth: SortedCalendarEvents;
  setSelectedEvents: Dispatch<SetStateAction<SortedCalendarEvents>>;
}

const DEFAULT_SELECT_VALUE = "alle månadene";

export default function DateSelect({
  dataByMonth,
  setSelectedEvents,
}: OwnProps) {
  const onSelectValueChange = (value: string) => {
    if (value === DEFAULT_SELECT_VALUE) {
      setSelectedEvents(dataByMonth);

      return;
    }

    setSelectedEvents({ [value]: dataByMonth[value] });
  };

  return (
    <Select
      onOpenChange={scrollUnlockToggler}
      onValueChange={onSelectValueChange}
    >
      <SelectTrigger className="w-60 my-4">
        <SelectValue placeholder="Vel ein månad" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={DEFAULT_SELECT_VALUE}>
          {DEFAULT_SELECT_VALUE}
        </SelectItem>
        {Object.keys(dataByMonth).map((month) => (
          <SelectItem key={month} value={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
