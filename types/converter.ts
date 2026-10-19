export type ConverterType = "TimestampToDate" | "DateToTimestamp"


export type OutputFormatType = "ISO 8601" | "YYYY-MM-DD HH:mm:ss" | "DD/MM/YYYY HH:mm:ss" | "MM/DD/YYYY HH:mm:ss"| "Custom"

export interface OutFormatLabelIconInterface{
  outputFormatType: OutputFormatType
  icon:React.ReactNode
}

export type TimestampUnit = "seconds" | "milliseconds"

export interface ParsedTimestamp {
  date: Date
  unit: TimestampUnit
}

export interface ZonedDateParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
  weekday: string
  monthName: string
}
