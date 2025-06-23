"use client"

import { motion } from "framer-motion"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
  endOfDay,
  isWithinInterval,
} from "date-fns"
import type { CalendarEvent } from "../../types"
import EventCard from "../EventCard"
import { groupEventsByDateTime } from "../../utils/calendarutils"

interface MonthViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onDateEventsClick: (events: CalendarEvent[], anchorEl: HTMLElement) => void
  loading: boolean
}

export default function MonthView({
  currentDate,
  events,
  onEventClick,
  onDateEventsClick,
  loading,
}: MonthViewProps) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)

      return eventStart <= dayEnd && eventEnd >= dayStart
    })
  }

  const isEventStartDate = (event: CalendarEvent, date: Date) => {
    return isSameDay(new Date(event.start), date)
  }

  const getGroupedEventsForDate = (date: Date) => {
    const dayEvents = getEventsForDate(date)
    return groupEventsByDateTime(dayEvents)
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
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div key={day} className="p-3 text-center">
            <span className="text-sm font-medium text-blue-600">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const groupedEvents = getGroupedEventsForDate(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isDayToday = isToday(day)

          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`min-h-[120px] border-r border-b border-gray-200 p-2 relative ${
                !isCurrentMonth ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${
                    isDayToday
                      ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                      : isCurrentMonth
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {format(day, "d")}
                </span>
              </div>

              <div className="space-y-1">
                {groupedEvents.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    {group.events.length === 1 ? (
                      <EventCard 
                        event={group.events[0]} 
                        onClick={() => onEventClick(group.events[0])} 
                        compact 
                        showTimeRange={isEventStartDate(group.events[0], day)}
                      />
                    ) : (
                      <div
                        className="relative cursor-pointer"
                        onClick={(e) => onDateEventsClick(group.events, e.currentTarget)}
                      >
                        <EventCard 
                          event={group.events[0]} 
                          onClick={() => {}} 
                          compact 
                          showTimeRange={isEventStartDate(group.events[0], day)}
                        />
                        <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                          {group.events.length}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}