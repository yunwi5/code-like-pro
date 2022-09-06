import { DateTime } from 'luxon';

export function getDateTimeFormat(isoString: string) {
    const postDateTime = DateTime.fromISO(isoString);
    const dateTimeFormat = postDateTime.toLocaleString(DateTime.DATETIME_MED);
    return dateTimeFormat;
}

export function getDateFormat(isoString: string) {
    const date = DateTime.fromISO(isoString);
    const dateFormat = date.toLocaleString(DateTime.DATE_MED);
    return dateFormat;
}
