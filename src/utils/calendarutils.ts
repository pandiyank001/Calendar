import type { CalendarEvent,EventGroup } from "../types"
import { format } from "date-fns"

export function groupEventsByDateTime(events: CalendarEvent[]): EventGroup[] {
  const groups: { [key: string]: CalendarEvent[] } = {}

  events.forEach((event) => {
    const dateTimeKey = format(new Date(event.start), "yyyy-MM-dd HH:mm")
    if (!groups[dateTimeKey]) {
      groups[dateTimeKey] = []
    }
    groups[dateTimeKey].push(event)
  })

  return Object.entries(groups).map(([dateTime, events]) => ({
    dateTime,
    events,
  }))
}

export function formatEventTime(start: string, end: string): string {
  const startTime = format(new Date(start), "HH:mm")
  const endTime = format(new Date(end), "HH:mm")
  return `${startTime} - ${endTime}`
}

export function getEventDuration(start: string, end: string): number {
  const startDate = new Date(start)
  const endDate = new Date(end)
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))
}
