const longMonthFormatter = new Intl.DateTimeFormat("no-NO", { month: "long" });
const shortMothFormatter = new Intl.DateTimeFormat("no-NO", { month: "short" });
const weekdayFormatter = new Intl.DateTimeFormat("no-NO", { weekday: "long" });

const getActualDate = (date?: string) => (date ? new Date(date) : new Date());

export const getLongMonth = (date?: string) =>
  longMonthFormatter.format(getActualDate(date));

export const getShortMonth = (date?: string) =>
  shortMothFormatter.format(getActualDate(date));

export const getWeekday = (date?: string) =>
  weekdayFormatter.format(getActualDate(date));

export const getDay = (date?: string) => getActualDate(date).getDate();

export const sortDatesByAscending = (firstDate: string, secondDate: string) =>
  new Date(firstDate).getTime() - new Date(secondDate).getTime();

export const compareDates = (firstDate: string, secondDate: string) =>
  new Date(firstDate).getTime() === new Date(secondDate).getTime();

export const getNextThreeDays = (date?: string) => {
  const nextThreeDays = [];
  const nextThreeDaysNames = ["I dag", "I morgon"];

  const lastDay = getActualDate(date);
  lastDay.setDate(getDay() + nextThreeDaysNames.length);
  const lastDayName = getWeekday(lastDay.toISOString());

  nextThreeDaysNames.push(lastDayName);

  for (let index = 0; index < nextThreeDaysNames.length; index++) {
    const actualDate = getActualDate(date);
    actualDate.setDate(getDay() + index);
    const [formattedDate] = actualDate.toISOString().split("T");

    nextThreeDays.push(formattedDate);
  }

  return [nextThreeDays, nextThreeDaysNames];
};
