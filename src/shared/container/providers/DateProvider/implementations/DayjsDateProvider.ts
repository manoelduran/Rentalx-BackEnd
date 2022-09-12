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

};

export { DayjsDateProvider };