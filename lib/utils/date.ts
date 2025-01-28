import {
  addDays,
  addHours,
  format,
  FormatOptions,
  parseISO,
  set,
} from "date-fns";
import { nn } from "date-fns/locale";

const DEFAULT_EVENT_DURATION = 1;
const ICalendarDateFormat = "yyyyMMdd'T'HHmmss";

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

export const formatToICalendarDate = (date: string | number | Date): string =>
  format(date, ICalendarDateFormat);

export const parseTimeRange = (
  duration: string,
  date: Date
) => {
  const [startTime, endTime] = duration.replaceAll(" ", "").split("-");

  if (!endTime) {
    const startDate = date;
    const endDate = addHours(date, DEFAULT_EVENT_DURATION);

    return { startDate, endDate };
  }

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startDate = set(date, {
    hours: startHours,
    minutes: startMinutes,
  });

  const endDate = set(date, {
    hours: endHours,
    minutes: endMinutes,
  });

  return { startDate, endDate };
};
