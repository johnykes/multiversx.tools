export class DateUtils {
  static getTimestamp(date) {
    return new Date(date).getTime() / 1000;
  }

  static getCurrentTimestampPlusDays(days) {
    let today = new Date();
    today.setDate(today.getDate() + days);
    return new Date(today.toUTCString()).getTime() / 1000;
  }

  static getCurrentTimestampPlus(hours) {
    let today = new Date();
    today.setHours(today.getHours() + hours);
    return new Date(today.toUTCString()).getTime() / 1000;
  }

  static getCurrentTimestampPlusMinute(minutes) {
    let today = new Date();
    today.setMinutes(today.getMinutes() + minutes);
    return new Date(today.toUTCString()).getTime() / 1000;
  }

  static getCurrentTimestampPlusYears(years) {
    let today = new Date();
    today.setFullYear(today.getFullYear() + years);
    return new Date(today.toUTCString()).getTime() / 1000;
  }

  static getCurrentTimestamp() {
    return new Date(new Date().toUTCString()).getTime() / 1000;
  }

  static getDateFromTimestampWithoutTime(timestamp) {
    return new Date(timestamp * 1000).toJSON().slice(0, 10);
  }
}
