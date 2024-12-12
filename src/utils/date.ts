import dayjs from "dayjs";

export function SameDate(date: Date, compare_date: Date): boolean {
    return dayjs(date).isSame(compare_date);
}
