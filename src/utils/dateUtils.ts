export const getDayName = (date: Date): string => {
  return date.toLocaleDateString("id-ID", { weekday: "long" }).toLowerCase();
};

export const formatDateToYMD = (date: Date): string => {
  return date.toISOString().split("T")[0]; //  "2025-06-02"
};

export const getAllDatesInRange = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  let current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

// mapping hari → tanggal[]
export const DayToDatesMap = (allDates: Date[]): Record<string, Date[]> => {
  const dayToDatesMap: Record<string, Date[]> = {};

  for (const date of allDates) {
    const dayName = getDayName(date);

    if (!dayToDatesMap[dayName]) {
      dayToDatesMap[dayName] = [];
    }

    dayToDatesMap[dayName].push(date);
  }

  return dayToDatesMap;
};
