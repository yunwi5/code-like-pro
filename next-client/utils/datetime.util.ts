import { DateTime } from 'luxon';

export function getDateFormat(isoString: string) {
  const dt = DateTime.fromISO(isoString);
  return dt.toLocaleString(DateTime.DATE_MED);
}

export function getDateTimeFormat(isoString: string, relative: boolean = true) {
  const dt = DateTime.fromISO(isoString);

  if (!relative) return dt.toLocaleString(DateTime.DATETIME_MED);

  return dt.toRelative();
}
