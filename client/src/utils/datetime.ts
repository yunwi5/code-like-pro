import { DateTime } from 'luxon';

// Get datetime format either absolute or relative formats.
export function getDateFormat(isoString: string) {
    const dt = DateTime.fromISO(isoString);
    return dt.toLocaleString(DateTime.DATE_MED);
}

export function getDateTimeFormat(isoString: string, relative: boolean = true) {
    const dt = DateTime.fromISO(isoString);

    // Return absolute datetime format i.e. 9th Aug 2022, 3:50pm
    if (!relative) return dt.toLocaleString(DateTime.DATE_MED);

    return dt.toRelative();
}

// Used for sorting by datetime. Both params should be a valid ISO date format.
export function compareByDateTime(isoDateA: string, isoDateB: string) {
    const dateTimeA = DateTime.fromISO(isoDateA);
    const dateTimeB = DateTime.fromISO(isoDateB);

    return dateTimeA < dateTimeB ? -1 : 1;
}
