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

// Used for sorting by datetime. Both params should be a valid ISO date format.
export function compareByDateTime(isoDateA: string, isoDateB: string) {
    const dateTimeA = DateTime.fromISO(isoDateA);
    const dateTimeB = DateTime.fromISO(isoDateB);

    return dateTimeA < dateTimeB ? -1 : 1;
}
