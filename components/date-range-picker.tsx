"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { nn } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/shadcn-ui/lib/utils";
import { Button } from "@/shadcn-ui/components/ui/button";
import { Calendar } from "@/shadcn-ui/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn-ui/components/ui/popover";
import { ClassName } from "@/lib/types/class-name";
import { dateWithNnLocale } from "@/lib/utils/date";

interface OwnProps {
  onSelect: (date?: DateRange | undefined) => void;
}

export default function DatePickerWithRange({
  className,
  onSelect,
}: OwnProps & ClassName) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const onSelectHandler = (date?: DateRange) => {
    setDate(date);
    onSelect(date);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-fit justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {dateWithNnLocale(date.from, "LLL dd, y", { locale: nn })} -{" "}
                  {dateWithNnLocale(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelectHandler}
            numberOfMonths={2}
            locale={nn}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
