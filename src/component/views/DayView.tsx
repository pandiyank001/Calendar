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

  const getEventsForTimeSlot = (hour: number) => {
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.start), currentDate)
    )
    return dayEvents.filter(
      (event) => new Date(event.start).getHours() === hour
    )
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

          return (
            <div
              key={hour}
              className="flex border-b border-gray-100 min-h-[80px]"
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
                <div className="space-y-2">
                  {groupedEvents.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      {group.events.length === 1 ? (
                        <div className="w-fit max-w-[220px]">
                          <EventCard
                            event={group.events[0]}
                            onClick={() => onEventClick(group.events[0])}
                          />
                        </div>
                      ) : (
                        <div
                          onClick={(e) =>
                            onDateEventsClick(group.events, e.currentTarget)
                          }
                          className="relative cursor-pointer w-fit max-w-[220px]"
                        >
                          <EventCard
                            event={group.events[0]}
                            onClick={() => {}}
                          />
                          <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                            {group.events.length}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
