
interface IDateProvider {
compareIsTomorrowInHours(expectedDate: Date, now: Date): number
convertToUTC(date: Date): string
dateNow(): Date; 
}

export {IDateProvider};