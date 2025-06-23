"use client"

import { motion } from "framer-motion"
import {
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
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
  getYear,
} from "date-fns"
import type { CalendarEvent } from "../../types"
import { groupEventsByDateTime } from "../../utils/calendarutils"

interface YearViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onDateEventsClick: (events: CalendarEvent[], anchorEl: HTMLElement) => void
  onMonthClick: (month: Date) => void
  loading: boolean
}

export default function YearView({
  currentDate,
  events,
  onEventClick,
  onDateEventsClick,
  onMonthClick,
  loading,
}: YearViewProps) {
  const yearStart = startOfYear(currentDate)
  const yearEnd = endOfYear(currentDate)
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd })
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)
      
      return eventStart <= dayEnd && eventEnd >= dayStart
    })
  }

  const getEventCountForDate = (date: Date) => {
    return getEventsForDate(date).length
  }

  const getMonthDays = (month: Date) => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }

  const getEventIntensity = (eventCount: number) => {
    if (eventCount === 0) return "bg-white"
    if (eventCount === 1) return "bg-blue-100"
    if (eventCount === 2) return "bg-blue-200"
    if (eventCount === 3) return "bg-blue-300"
    if (eventCount >= 4) return "bg-blue-400"
  }

  const getEventDot = (eventCount: number) => {
    if (eventCount === 0) return null
    if (eventCount === 1) return "bg-blue-500"
    if (eventCount === 2) return "bg-orange-500"
    if (eventCount >= 3) return "bg-red-500"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {getYear(currentDate)}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month, monthIndex) => {
          const monthDays = getMonthDays(month)
          const monthEvents = events.filter((event) => {
            const eventStart = new Date(event.start)
            const eventEnd = new Date(event.end)
            const monthStart = startOfMonth(month)
            const monthEnd = endOfMonth(month)
            
            return eventStart <= monthEnd && eventEnd >= monthStart
          })

          return (
            <motion.div
              key={month.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: monthIndex * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div 
                className="text-center mb-3 cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors"
                onClick={() => onMonthClick(month)}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {format(month, "MMMM")}
                </h3>
                {monthEvents.length > 0 && (
                  <div className="text-xs text-blue-600 mt-1">
                    {monthEvents.length} event{monthEvents.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 font-medium p-1">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day) => {
                  const isCurrentMonth = isSameMonth(day, month)
                  const isDayToday = isToday(day)
                  const eventCount = getEventCountForDate(day)
                  const dayEvents = getEventsForDate(day)

                  return (
                    <motion.div
                      key={day.toISOString()}
                      whileHover={{ scale: 1.1 }}
                      className={`
                        relative w-8 h-8 text-xs flex items-center justify-center rounded cursor-pointer transition-all
                        ${isDayToday 
                          ? "bg-blue-600 text-white font-bold" 
                          : isCurrentMonth 
                            ? eventCount > 0 
                              ? `${getEventIntensity(eventCount)} text-gray-900 hover:scale-110` 
                              : "text-gray-900 hover:bg-gray-100"
                            : "text-gray-400 hover:bg-gray-50"
                        }
                      `}
                      onClick={(e) => {
                        if (dayEvents.length === 1) {
                          onEventClick(dayEvents[0])
                        } else if (dayEvents.length > 1) {
                          onDateEventsClick(dayEvents, e.currentTarget)
                        }
                      }}
                    >
                      <span className="relative z-10">
                        {format(day, "d")}
                      </span>
                      
                      {eventCount > 0 && !isDayToday && (
                        <div className="absolute bottom-0 right-0 flex space-x-0.5">
                          <div 
                            className={`w-1.5 h-1.5 rounded-full ${getEventDot(eventCount)}`}
                          />
                          {eventCount > 1 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          )}
                          {eventCount > 2 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          )}
                        </div>
                      )}

                      {eventCount > 3 && !isDayToday && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          {eventCount}
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {monthEvents.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Events this month:</span>
                      <span className="font-medium text-blue-600">
                        {monthEvents.length}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {getYear(currentDate)} Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-3 rounded">
            <div className="text-2xl font-bold text-blue-600">{events.length}</div>
            <div className="text-xs text-gray-600">Total Events</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-2xl font-bold text-green-600">
              {events.filter(e => new Date(e.start) <= new Date()).length}
            </div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-2xl font-bold text-orange-600">
              {events.filter(e => new Date(e.start) > new Date()).length}
            </div>
            <div className="text-xs text-gray-600">Upcoming</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(events.map(e => e.user_det?.handled_by?.firstName)).size}
            </div>
            <div className="text-xs text-gray-600">Interviewers</div>
          </div>
        </div>
      </div>
    </div>
  )
}