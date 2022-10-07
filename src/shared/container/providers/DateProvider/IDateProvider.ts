
interface IDateProvider {
    compareIsTomorrowInHours(expectedDate: Date, now: Date): number;
    compareInDays(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
}

export { IDateProvider };