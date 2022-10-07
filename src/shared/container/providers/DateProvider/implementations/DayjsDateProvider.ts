import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
class DayjsDateProvider implements IDateProvider {
   dateNow() {
      return dayjs().toDate();
   };
   convertToUTC(date: Date): string {
      return dayjs(date).utc().local().format();
   };
   compareIsTomorrowInHours(expectedDate: Date, start_date: Date): number {
      const expectedDateUTC = this.convertToUTC(expectedDate);
      const start_dateUTC = this.convertToUTC(start_date);
      return dayjs(expectedDateUTC).diff(start_dateUTC, "hours");
   };
   compareInDays(start_date: Date, end_date: Date): number {
      const expectedDateUTC = this.convertToUTC(end_date);
      const start_dateUTC = this.convertToUTC(start_date);
      return dayjs(expectedDateUTC).diff(start_dateUTC, "days");
   }
   addDays(days: number): Date {
      return dayjs().add(days, "days").toDate();
   }
   addHours(hours: number): Date {
       return dayjs().add(hours, "hours").toDate();
   }
};

export { DayjsDateProvider };