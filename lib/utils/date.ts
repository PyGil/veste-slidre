import { addDays, format, FormatOptions, parseISO } from "date-fns";
import { nn } from "date-fns/locale";
import { Event } from "../interfaces/event";

export const dateWithNnLocale = (
  date: string | number | Date,
  formatString: string,
  options?: FormatOptions
): string => format(date, formatString, { locale: nn, ...options });

export const getShortMonth = (date: string | number | Date) =>
  dateWithNnLocale(date, "MMM").replaceAll(".", "");

const getActualDate = (date?: string) => (date ? new Date(date) : new Date());

export const sortDatesByAscending = (firstDate: string, secondDate: string) =>
  parseISO(firstDate).getTime() - parseISO(secondDate).getTime();

export const getNextThreeDays = (date?: string) => {
  const currentDate = getActualDate(date);
  const lastDayName = dateWithNnLocale(addDays(currentDate, 2), "EEEE");
  const nextThreeDaysNames = ["I dag", "I morgon", lastDayName];

  const nextThreeDays = nextThreeDaysNames.map((_, index) =>
    dateWithNnLocale(addDays(currentDate, index), "yyyy-MM-dd")
  );

  return { nextThreeDays, nextThreeDaysNames };
};
