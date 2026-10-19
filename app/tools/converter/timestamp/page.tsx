"use client";

import { ActionPanel } from "@/components/shared/action-panel";
import { CopyItem } from "@/components/shared/copy-item";
import { InfoSection } from "@/components/shared/info-section";
import { ToolHeader } from "@/components/shared/tool-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNow } from "@/hooks/use-now";
import { cn } from "@/lib/utils";
import {
  DEFAULT_CUSTOM_FORMAT,
  formatDate,
  formatWithPattern,
  getLocalTimeZone,
  getTimeZoneLabel,
  getTimeZones,
  getZonedParts,
  parseDateTimeInZone,
  parseTimestamp,
  toDateTimeLocalValue,
} from "@/lib/timestamp-utils";
import {
  ConverterType,
  OutFormatLabelIconInterface,
  OutputFormatType,
} from "@/types/converter";
import {
  AlertCircle,
  Calendar,
  CalendarDays,
  Clock,
  Code2,
  Globe,
  Hash,
  Settings,
  TimerIcon,
} from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

const HOUR_MS = 60 * 60 * 1000;

const subscribeNoop = () => () => {};

const converterTypes: { type: ConverterType; label: string; icon: React.ReactNode }[] = [
  {
    type: "TimestampToDate",
    label: "Timestamp → Date",
    icon: <Hash className="size-4 shrink-0" />,
  },
  {
    type: "DateToTimestamp",
    label: "Date → Timestamp",
    icon: <Calendar className="size-4 shrink-0" />,
  },
];

const outputFormatList: OutFormatLabelIconInterface[] = [
  {
    outputFormatType: "ISO 8601",
    icon: <Code2 />,
  },
  {
    outputFormatType: "YYYY-MM-DD HH:mm:ss",
    icon: <Calendar />,
  },
  {
    outputFormatType: "DD/MM/YYYY HH:mm:ss",
    icon: <Calendar />,
  },
  {
    outputFormatType: "MM/DD/YYYY HH:mm:ss",
    icon: <Calendar />,
  },
  {
    outputFormatType: "Custom",
    icon: <Settings />,
  },
];

export default function TimestampTool() {
  const [timestampConverterType, setTimestampConverterType] =
    useState<ConverterType>("TimestampToDate");
  const [outputFormat, setOutputFormat] =
    useState<OutputFormatType>("ISO 8601");
  const [customFormat, setCustomFormat] = useState(DEFAULT_CUSTOM_FORMAT);
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState<string | null>(null);

  const now = useNow(100);
  const localTimeZone = useSyncExternalStore(
    subscribeNoop,
    getLocalTimeZone,
    () => "UTC"
  );
  const timeZone = selectedTimeZone ?? localTimeZone;
  const timeZoneOptions = useMemo(() => {
    const zones = getTimeZones();
    const list = zones.includes(localTimeZone)
      ? zones
      : [localTimeZone, ...zones];
    const reference = new Date();
    return list.map((zone) => ({
      value: zone,
      label: getTimeZoneLabel(zone, reference),
    }));
  }, [localTimeZone]);

  const isTimestampMode = timestampConverterType === "TimestampToDate";

  const parsedTimestamp = useMemo(
    () => parseTimestamp(timestampInput),
    [timestampInput]
  );
  const parsedDate = useMemo(
    () => parseDateTimeInZone(dateInput, timeZone),
    [dateInput, timeZone]
  );

  const date = isTimestampMode ? parsedTimestamp?.date : parsedDate;
  const currentInput = isTimestampMode ? timestampInput : dateInput;
  const hasError = currentInput.trim() !== "" && !date;

  // Writes a date back into whichever input is active, keeping the timestamp unit
  const applyDate = (next: Date) => {
    if (isTimestampMode) {
      const ms = next.getTime();
      setTimestampInput(
        parsedTimestamp?.unit === "milliseconds"
          ? String(ms)
          : String(Math.floor(ms / 1000))
      );
    } else {
      setDateInput(toDateTimeLocalValue(next, timeZone));
    }
  };

  const shiftHours = (hours: number) => {
    const base = date ?? new Date();
    applyDate(new Date(base.getTime() + hours * HOUR_MS));
  };

  const switchMode = (type: ConverterType) => {
    if (type === timestampConverterType) return;
    // Carry the current value over so both directions stay in sync
    if (date) {
      if (type === "TimestampToDate") {
        setTimestampInput(String(Math.floor(date.getTime() / 1000)));
      } else {
        setDateInput(toDateTimeLocalValue(date, timeZone));
      }
    }
    setTimestampConverterType(type);
  };

  const handleReset = () => {
    setTimestampInput("");
    setDateInput("");
    setOutputFormat("ISO 8601");
    setCustomFormat(DEFAULT_CUSTOM_FORMAT);
  };

  const result = useMemo(() => {
    if (!date) return null;
    const ms = date.getTime();
    const seconds = Math.floor(ms / 1000);

    return {
      formatted: formatDate(date, outputFormat, timeZone, customFormat),
      iso: date.toISOString(),
      seconds: String(seconds),
      milliseconds: String(ms),
      details: [
        {
          label: "Date (Local Time)",
          value: formatWithPattern(date, "YYYY-MM-DD", timeZone),
          icon: <CalendarDays size={18} />,
        },
        {
          label: "Time (Local Time)",
          value: formatWithPattern(date, "HH:mm:ss", timeZone),
          icon: <Clock size={18} />,
        },
        {
          label: "Milliseconds",
          value: formatWithPattern(date, "SSS", timeZone),
          icon: <TimerIcon size={18} />,
        },
        {
          label: "Unix Timestamp (seconds)",
          value: String(seconds),
          icon: <Hash size={18} />,
        },
        {
          label: "Unix Timestamp (milliseconds)",
          value: String(ms),
          icon: <Hash size={18} />,
        },
      ],
    };
  }, [date, outputFormat, timeZone, customFormat]);

  const clock = useMemo(() => {
    if (!now) return null;
    const parts = getZonedParts(now, timeZone);

    const unix = String(Math.floor(now.getTime() / 1000));

    return {
      unix,
      time: formatWithPattern(now, "HH:mm:ss", timeZone),
      millisecond: formatWithPattern(now, "SSS", timeZone),
      date: formatWithPattern(now, "dddd, MMMM D, YYYY", timeZone),
      rows: [
        { label: "Year", value: String(parts.year), icon: <Calendar size={16} /> },
        {
          label: "Month",
          value: `${String(parts.month).padStart(2, "0")} (${parts.monthName})`,
          icon: <Calendar size={16} />,
        },
        {
          label: "Day",
          value: `${String(parts.day).padStart(2, "0")} (${parts.weekday})`,
          icon: <Calendar size={16} />,
        },
        {
          label: "Hour",
          value: String(parts.hour).padStart(2, "0"),
          icon: <Clock size={16} />,
        },
        {
          label: "Minute",
          value: String(parts.minute).padStart(2, "0"),
          icon: <Clock size={16} />,
        },
        {
          label: "Second",
          value: String(parts.second).padStart(2, "0"),
          icon: <Clock size={16} />,
        },
        {
          label: "Millisecond",
          value: String(parts.millisecond).padStart(3, "0"),
          icon: <Hash size={16} />,
        },
        {
          label: "Unix",
          value: unix,
          icon: <Hash size={16} />,
        },
      ],
    };
  }, [now, timeZone]);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="Timestamp Converter"
        subtitle="Unix timestamps ⇄ human-readable dates"
        icon={<TimerIcon />}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ActionPanel
            label="Timestamp"
            icon={<Hash size={14} />}
            onReset={handleReset}
          >
            <div className="p-4 md:p-6 space-y-8">
              {/* Converter Type */}
              <div className="flex w-full gap-1 rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
                {converterTypes.map((item) => (
                  <Button
                    key={item.type}
                    onClick={() => switchMode(item.type)}
                    variant={
                      timestampConverterType === item.type ? "secondary" : "ghost"
                    }
                    size="lg"
                    className="h-auto min-h-10 min-w-0 flex-1 cursor-pointer gap-2 px-2 py-2"
                  >
                    {item.icon}
                    <span className="whitespace-normal text-center text-xs sm:text-sm">
                      {item.label}
                    </span>
                  </Button>
                ))}
              </div>

              {/* Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-zinc-400">
                  {isTimestampMode ? <Hash size={18} /> : <Calendar size={18} />}
                  {isTimestampMode ? "Unix Timestamp" : "Date & Time"}
                </label>

                <div className="flex flex-col sm:flex-row gap-2">
                  {isTimestampMode ? (
                    <Input
                      value={timestampInput}
                      onChange={(e) => setTimestampInput(e.target.value)}
                      placeholder="e.g. 1760697600"
                      inputMode="numeric"
                      aria-invalid={hasError}
                      className="h-10 grow bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm font-mono focus:ring-2 focus:ring-zinc-500/10 focus:outline-none transition-all"
                    />
                  ) : (
                    <Input
                      type="datetime-local"
                      step="1"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      aria-invalid={hasError}
                      className="h-10 grow bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm font-mono focus:ring-2 focus:ring-zinc-500/10 focus:outline-none transition-all"
                    />
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1 cursor-pointer"
                      onClick={() => applyDate(new Date())}
                    >
                      <TimerIcon />
                      <span>Now</span>
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1 cursor-pointer"
                      onClick={() => shiftHours(1)}
                    >
                      <TimerIcon />
                      <span>+1h</span>
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1 cursor-pointer"
                      onClick={() => shiftHours(-1)}
                    >
                      <TimerIcon />
                      <span>-1h</span>
                    </Button>
                  </div>
                </div>

                {hasError ? (
                  <p className="flex items-center gap-1.5 text-xs font-bold text-rose-500">
                    <AlertCircle size={14} />
                    {isTimestampMode
                      ? "Invalid timestamp. Enter whole seconds or milliseconds."
                      : "Invalid date. Use the format YYYY-MM-DDTHH:mm:ss."}
                  </p>
                ) : (
                  <p className="text-xs text-zinc-500">
                    {isTimestampMode
                      ? parsedTimestamp
                        ? `Detected as ${parsedTimestamp.unit}.`
                        : "Enter a Unix timestamp (in seconds or milliseconds)."
                      : `Interpreted in ${timeZone.replace(/_/g, " ")}.`}
                  </p>
                )}
              </div>

              {/* Output Format */}
              {isTimestampMode && (
                <div className="space-y-3">
                  <label className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-zinc-400">
                    <Settings size={18} />
                    Output Format
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {outputFormatList.map((item: OutFormatLabelIconInterface) => {
                      const isActive = outputFormat === item.outputFormatType;

                      return (
                        <Button
                          key={item.outputFormatType}
                          onClick={() => setOutputFormat(item.outputFormatType)}
                          variant={isActive ? "default" : "ghost"}
                          size="lg"
                          className={cn(
                            "h-10 flex-1 cursor-pointer border",
                            isActive
                              ? "border-transparent"
                              : "border-zinc-200 dark:border-zinc-800"
                          )}
                        >
                          {item.icon}
                          {item.outputFormatType}
                        </Button>
                      );
                    })}
                  </div>

                  {outputFormat === "Custom" && (
                    <div className="space-y-2">
                      <Input
                        value={customFormat}
                        onChange={(e) => setCustomFormat(e.target.value)}
                        placeholder={DEFAULT_CUSTOM_FORMAT}
                        className="h-10 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm font-mono"
                      />
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Tokens: <code>YYYY YY MMMM MMM MM M DD D dddd ddd HH H hh h mm ss SSS A a Z ZZ</code>. Wrap literal text in <code>[brackets]</code>.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Result */}
              <div className="space-y-3">
                <div className="border-2 p-4 rounded-2xl border-amber-400/60 bg-amber-50/50 dark:bg-amber-500/5">
                  {result ? (
                    <CopyItem
                      copyValue={
                        isTimestampMode ? result.formatted : result.seconds
                      }
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <CalendarDays
                          size={44}
                          className="shrink-0 text-amber-500"
                        />
                        <div className="flex flex-col gap-1 min-w-0 normal-case tracking-normal">
                          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                            {isTimestampMode
                              ? "Converted Date & Time"
                              : "Unix Timestamp (seconds)"}
                          </span>
                          <span className="text-lg md:text-xl font-bold text-amber-600 dark:text-amber-500 font-mono break-all">
                            {isTimestampMode ? result.formatted : result.seconds}
                          </span>
                          <span className="text-xs font-medium text-zinc-500 font-mono break-all">
                            {isTimestampMode
                              ? `UTC: ${result.iso}`
                              : `Milliseconds: ${result.milliseconds}`}
                          </span>
                        </div>
                      </div>
                    </CopyItem>
                  ) : (
                    <div className="flex items-center gap-4 text-zinc-400">
                      <CalendarDays size={44} className="shrink-0" />
                      <span className="text-sm font-medium">
                        {isTimestampMode
                          ? "Enter a timestamp or press Now to see the converted date."
                          : "Pick a date and time or press Now to get its timestamp."}
                      </span>
                    </div>
                  )}
                </div>

                {result && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {result.details.map((item) => (
                      <div
                        key={item.label}
                        className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl"
                      >
                        <CopyItem copyValue={item.value}>
                          <div className="flex gap-3 min-w-0">
                            <span className="text-zinc-400 shrink-0">
                              {item.icon}
                            </span>
                            <div className="flex flex-col gap-1.5 min-w-0 normal-case tracking-normal">
                              <span className="text-xs font-medium text-zinc-500 leading-tight">
                                {item.label}
                              </span>
                              <span className="font-mono text-sm break-all">
                                {item.value}
                              </span>
                            </div>
                          </div>
                        </CopyItem>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ActionPanel>
        </div>

        <ActionPanel
          label="Live Clock"
          icon={<Clock size={14} />}
          copyValue={clock?.unix}
          headers={
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-amber-500">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
              </span>
              Live
            </span>
          }
        >
          <div className="p-4 md:p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex gap-1 items-baseline font-mono tabular-nums">
                <span className="text-5xl sm:text-6xl font-semibold tracking-tight">
                  {clock?.time ?? "--:--:--"}
                </span>
                <span className="text-amber-500 font-semibold tracking-tight text-2xl sm:text-3xl">
                  .{clock?.millisecond ?? "---"}
                </span>
              </div>

              <p className="text-lg font-semibold text-zinc-500 leading-tight">
                {clock?.date ?? "Loading…"}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {(clock?.rows ?? []).map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm"
                >
                  <span className="text-zinc-400">{row.icon}</span>
                  <span className="w-24 text-zinc-500">{row.label}</span>
                  <span className="font-mono tabular-nums font-medium">
                    {row.value}
                  </span>
                </div>
              ))}
              {!clock && (
                <div className="px-4 py-6 text-sm text-zinc-400">
                  Starting clock…
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-zinc-400">
                <Globe size={16} />
                Timezone
              </label>
              <Select value={timeZone} onValueChange={setSelectedTimeZone}>
                <SelectTrigger className="w-full h-10 rounded-xl text-sm border-zinc-200 dark:border-zinc-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-80">
                  {timeZoneOptions.map((zone) => (
                    <SelectItem key={zone.value} value={zone.value}>
                      {zone.label}
                      {zone.value === localTimeZone && " · Local"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-zinc-500">
                Applies to the live clock and all converted dates.
              </p>
            </div>
          </div>
        </ActionPanel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="What Is a Unix Timestamp?"
          icon={Hash}
          description="A Unix timestamp (epoch time) counts the seconds since 00:00:00 UTC on January 1, 1970. It has no time zone of its own, so the same timestamp always refers to the same instant and is shown here in whichever time zone you select."
        />
        <InfoSection
          title="Seconds vs Milliseconds"
          icon={TimerIcon}
          description="Most Unix tools and APIs use seconds (10 digits today), while JavaScript's Date.now() and many databases use milliseconds (13 digits). Values with 12 or more digits are treated as milliseconds automatically."
        />
      </div>
    </div>
  );
}
