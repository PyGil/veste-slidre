import { format, FormatOptions } from "date-fns";
import { nn } from "date-fns/locale";
import { Event } from "../interfaces/event";

// const longMonthFormatter = new Intl.DateTimeFormat("no-NO", { month: "long" });
// const shortMothFormatter = new Intl.DateTimeFormat("no-NO", { month: "short" });
// const weekdayFormatter = new Intl.DateTimeFormat("no-NO", { weekday: "long" });

export const dateWithNnLocale = (
  date: string | number | Date,
  formatString: string,
  options?: FormatOptions
): string => format(date, formatString, { locale: nn, ...options });

export const getShortMonth  = (date: string | number | Date,) =>
  dateWithNnLocale(date, "MMM").replaceAll(".", "");

const getActualDate = (date?: string) => (date ? new Date(date) : new Date());

// export const getLongMonth = (date?: string) =>
//   longMonthFormatter.format(getActualDate(date));

// export const getShortMonth = (date?: string) =>
//   shortMothFormatter.format(getActualDate(date));

// export const getWeekday = (date?: string) =>
//   weekdayFormatter.format(getActualDate(date));

// export const getDay = (date?: string) => getActualDate(date).getDate();

export const sortDatesByAscending = (firstDate: string, secondDate: string) =>
  new Date(firstDate).getTime() - new Date(secondDate).getTime();

// export const compareDates = (firstDate: string, secondDate: string) =>
//   new Date(firstDate).getTime() === new Date(secondDate).getTime();

export const getNextThreeDays = (date?: string) => {
  const nextThreeDays = [];
  const nextThreeDaysNames = ["I dag", "I morgon"];

  const lastDay = getActualDate(date);
  lastDay.setDate(
    +dateWithNnLocale(new Date(), "d") + nextThreeDaysNames.length
  );
  const lastDayName = dateWithNnLocale(lastDay.toISOString(), "EEEE");

  nextThreeDaysNames.push(lastDayName);

  for (let index = 0; index < nextThreeDaysNames.length; index++) {
    const actualDate = getActualDate(date);
    actualDate.setDate(+dateWithNnLocale(new Date(), "d") + index);
    const [formattedDate] = actualDate.toISOString().split("T");

    nextThreeDays.push(formattedDate);
  }

  const daysTabs = nextThreeDaysNames.reduce(
    (previous: Record<string, Event[]>, current: string) => {
      previous[current] = [];

      return previous;
    },
    {}
  );

  return { nextThreeDays, nextThreeDaysNames, daysTabs };
};
