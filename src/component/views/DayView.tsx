"use client"

import { motion } from "framer-motion"
import { format, isSameDay } from "date-fns"
import type { CalendarEvent } from "../../types"
import EventCard from "../EventCard"
import { groupEventsByDateTime } from "../../utils/calendarutils"

interface DayViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onDateEventsClick: (events: CalendarEvent[], anchorEl: HTMLElement) => void
  loading: boolean
}

export default function DayView({
  currentDate,
  events,
  onEventClick,
  onDateEventsClick,
  loading,
}: DayViewProps) {
  const timeSlots = Array.from({ length: 24 }, (_, i) => i)
  const BASE_SLOT_HEIGHT = 105

  const getEventsForTimeSlot = (hour: number) => {
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.start), currentDate)
    )

    return dayEvents.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const startHour = eventStart.getHours()
      const endHour = eventEnd.getHours()

      const eventStartsInThisHour = startHour === hour
      const eventCoversThisHour = startHour < hour && endHour > hour

      return eventStartsInThisHour || eventCoversThisHour
    })
  }

  const isEventStartHour = (event: CalendarEvent, hour: number) => {
    return new Date(event.start).getHours() === hour
  }

  const calculateEventDurationPercentage = (event: CalendarEvent) => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)

    const totalDurationMs = eventEnd.getTime() - eventStart.getTime()
    const totalDurationMinutes = totalDurationMs / (1000 * 60)

    return Math.min(totalDurationMinutes / 60, 1)
  }

  const getSlotHeight = (hour: number) => {
    const timeSlotEvents = getEventsForTimeSlot(hour)

    if (timeSlotEvents.length === 0) return BASE_SLOT_HEIGHT

    const eventsStartingInThisHour = timeSlotEvents.filter(event =>
      isEventStartHour(event, hour)
    )

    if (eventsStartingInThisHour.length === 0) return BASE_SLOT_HEIGHT

    const minDurationPercentage = eventsStartingInThisHour.reduce((min, event) => {
      const durationPercentage = calculateEventDurationPercentage(event)
      return Math.min(min, durationPercentage)
    }, 1)

    if (minDurationPercentage >= 1) return BASE_SLOT_HEIGHT

    const inversePercentage = 1 - minDurationPercentage
    const additionalHeight = inversePercentage * 125 
    const expandedHeight = BASE_SLOT_HEIGHT + additionalHeight

    return Math.round(expandedHeight)
  }

  const getEventContainerHeight = (event: CalendarEvent, slotHeight: number) => {
    const durationPercentage = calculateEventDurationPercentage(event)

    if (durationPercentage >= 1) {
      return BASE_SLOT_HEIGHT - 50 
    }

    const availableSpace = slotHeight - 35 
    const baseEventHeight = 60 
    const inversePercentage = 1 - durationPercentage
    const eventContainerHeight = baseEventHeight + (availableSpace - baseEventHeight) * inversePercentage

    return Math.max(60, eventContainerHeight) 
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="p-4 border-b border-gray-200 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentDate, "EEEE, MMMM dd, yyyy")}
        </h2>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {timeSlots.map((hour) => {
          const timeSlotEvents = getEventsForTimeSlot(hour)
          const groupedEvents = groupEventsByDateTime(timeSlotEvents)
          const slotHeight = getSlotHeight(hour)

          return (
            <div
              key={hour}
              className="flex border-b border-gray-100"
              style={{ minHeight: `${slotHeight}px` }}
            >
              <div className="w-20 p-2 text-right text-xs text-blue-600 font-medium border-r border-gray-200 flex-shrink-0">
                {hour === 0
                  ? "12 AM"
                  : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                      ? "12 PM"
                      : `${hour - 12} PM`}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 p-2 hover:bg-gray-50 transition-colors"
              >
                <div className="space-y-4 flex flex-col">
                  {groupedEvents.map((group, groupIndex) => {
                    const isStartingEvent = isEventStartHour(group.events[0], hour)
                    const eventContainerHeight = isStartingEvent
                      ? getEventContainerHeight(group.events[0], slotHeight)
                      : 'auto'

                    return (
                      <div key={groupIndex}>
                        {group.events.length === 1 ? (
                          <div
                            className="w-fit max-w-[320px] flex items-start"
                            style={{
                              height: eventContainerHeight !== 'auto' ? `${eventContainerHeight}px` : 'auto'
                            }}
                          >
                            <EventCard
                              event={group.events[0]}
                              onClick={() => onEventClick(group.events[0])}
                              showTimeRange={isStartingEvent}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={(e) =>
                              onDateEventsClick(group.events, e.currentTarget)
                            }
                            className="relative mb-[20px] cursor-pointer w-fit max-w-[220px] flex items-start"
                            style={{
                              height: eventContainerHeight !== 'auto' ? `${eventContainerHeight}px` : 'auto'
                            }}
                          >
                            <EventCard
                              event={group.events[0]}
                              onClick={() => {}}
                              showTimeRange={isStartingEvent}
                            />
                            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                              {group.events.length}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
