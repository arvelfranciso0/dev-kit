import {
  OutputFormatType,
  ParsedTimestamp,
  ZonedDateParts,
} from "@/types/converter";

export const DEFAULT_CUSTOM_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";

// Values at or above this are treated as milliseconds (12+ digits ≈ year 5138 in seconds)
const MILLISECOND_THRESHOLD = 1e11;

const pad = (value: number, length = 2) =>
  String(Math.abs(value)).padStart(length, "0");

export const isValidDate = (date: Date) => !Number.isNaN(date.getTime());

export const getTimeZones = (): string[] => {
  try {
    const zones = Intl.supportedValuesOf("timeZone");
    return zones.includes("UTC") ? zones : ["UTC", ...zones];
  } catch {
    return ["UTC"];
  }
};

export const getLocalTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

// Creating Intl formatters is expensive and the live clock formats every 100ms, so cache per zone
const formatterCache = new Map<string, Intl.DateTimeFormat>();

const getFormatter = (timeZone: string) => {
  let formatter = formatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      weekday: "long",
      hourCycle: "h23",
    });
    formatterCache.set(timeZone, formatter);
  }
  return formatter;
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getZonedParts = (date: Date, timeZone: string): ZonedDateParts => {
  const parts = getFormatter(timeZone).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const month = Number(get("month"));

  return {
    year: Number(get("year")),
    month,
    day: Number(get("day")),
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
    second: Number(get("second")),
    millisecond: ((date.getTime() % 1000) + 1000) % 1000,
    weekday: get("weekday"),
    monthName: MONTH_NAMES[month - 1] ?? "",
  };
};

// Offset of the time zone from UTC at the given instant, in minutes
export const getTimeZoneOffset = (date: Date, timeZone: string) => {
  const p = getZonedParts(date, timeZone);
  const asUtc = Date.UTC(
    p.year,
    p.month - 1,
    p.day,
    p.hour,
    p.minute,
    p.second,
    p.millisecond
  );
  return Math.round((asUtc - date.getTime()) / 60000);
};

export const formatOffset = (offsetMinutes: number, separator = ":") => {
  const sign = offsetMinutes < 0 ? "-" : "+";
  const abs = Math.abs(offsetMinutes);
  return `${sign}${pad(Math.floor(abs / 60))}${separator}${pad(abs % 60)}`;
};

export const getTimeZoneLabel = (timeZone: string, date = new Date()) =>
  `${timeZone.replace(/_/g, " ")} (UTC${formatOffset(
    getTimeZoneOffset(date, timeZone)
  )})`;

const TOKEN_REGEX =
  /\[([^\]]*)]|YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|ss|SSS|A|a|ZZ|Z/g;

// Formats a date in a time zone using moment/dayjs-style tokens; wrap literals in [brackets]
export const formatWithPattern = (
  date: Date,
  pattern: string,
  timeZone: string
) => {
  const p = getZonedParts(date, timeZone);
  const offset = getTimeZoneOffset(date, timeZone);
  const hour12 = p.hour % 12 || 12;

  const tokens: Record<string, string> = {
    YYYY: pad(p.year, 4),
    YY: pad(p.year % 100),
    MMMM: p.monthName,
    MMM: p.monthName.slice(0, 3),
    MM: pad(p.month),
    M: String(p.month),
    DD: pad(p.day),
    D: String(p.day),
    dddd: p.weekday,
    ddd: p.weekday.slice(0, 3),
    HH: pad(p.hour),
    H: String(p.hour),
    hh: pad(hour12),
    h: String(hour12),
    mm: pad(p.minute),
    ss: pad(p.second),
    SSS: pad(p.millisecond, 3),
    A: p.hour < 12 ? "AM" : "PM",
    a: p.hour < 12 ? "am" : "pm",
    Z: formatOffset(offset),
    ZZ: formatOffset(offset, ""),
  };

  return pattern.replace(TOKEN_REGEX, (match, literal) =>
    literal !== undefined ? literal : tokens[match]
  );
};

export const formatDate = (
  date: Date,
  format: OutputFormatType,
  timeZone: string,
  customPattern = DEFAULT_CUSTOM_FORMAT
) => {
  switch (format) {
    case "ISO 8601":
      return formatWithPattern(date, "YYYY-MM-DD[T]HH:mm:ss.SSSZ", timeZone);
    case "Custom":
      return formatWithPattern(date, customPattern, timeZone);
    default:
      return formatWithPattern(date, format, timeZone);
  }
};

export const parseTimestamp = (input: string): ParsedTimestamp | null => {
  const value = input.trim();
  if (!/^-?\d+(\.\d+)?$/.test(value)) return null;

  const numeric = Number(value);
  const isMilliseconds = Math.abs(numeric) >= MILLISECOND_THRESHOLD;
  const date = new Date(isMilliseconds ? numeric : numeric * 1000);

  if (!isValidDate(date)) return null;

  return { date, unit: isMilliseconds ? "milliseconds" : "seconds" };
};

// Value for <input type="datetime-local" step="1"> representing the date in the time zone
export const toDateTimeLocalValue = (date: Date, timeZone: string) =>
  formatWithPattern(date, "YYYY-MM-DD[T]HH:mm:ss", timeZone);

// Interprets a "YYYY-MM-DDTHH:mm[:ss[.SSS]]" wall-clock value as a time in the given time zone
export const parseDateTimeInZone = (
  value: string,
  timeZone: string
): Date | null => {
  const match = value
    .trim()
    .match(
      /^(\d{4,})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/
    );
  if (!match) return null;

  const [, y, mo, d, h, mi, s = "0", ms = "0"] = match;
  const wallClock = Date.UTC(
    Number(y),
    Number(mo) - 1,
    Number(d),
    Number(h),
    Number(mi),
    Number(s),
    Number(ms.padEnd(3, "0"))
  );
  if (Number.isNaN(wallClock)) return null;

  // Two passes settle the offset around DST transitions
  let utc = wallClock - getTimeZoneOffset(new Date(wallClock), timeZone) * 60000;
  utc = wallClock - getTimeZoneOffset(new Date(utc), timeZone) * 60000;

  const date = new Date(utc);
  return isValidDate(date) ? date : null;
};
