"use client"

import { motion } from "framer-motion"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import type { CalendarEvent } from "../../types"
import EventCard from "../EventCard"
import { groupEventsByDateTime } from "../../utils/calendarutils"

interface WeekViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onDateEventsClick: (events: CalendarEvent[], anchorEl: HTMLElement) => void
  loading: boolean
}

export default function WeekView({ currentDate, events, onEventClick, onDateEventsClick, loading }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate)
  const weekEnd = endOfWeek(currentDate)
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const timeSlots = Array.from({ length: 24 }, (_, i) => i)

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start), date))
  }

  const getEventsForTimeSlot = (date: Date, hour: number) => {
    const dayEvents = getEventsForDate(date)
    
    return dayEvents.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const startHour = eventStart.getHours()
      const endHour = eventEnd.getHours()
      

      if (eventEnd.getMinutes() === 0) {
        return hour >= startHour && hour < endHour
      } else {
        return hour >= startHour && hour <= endHour
      }
    })
  }

  const isEventStartHour = (event: CalendarEvent, hour: number) => {
    return new Date(event.start).getHours() === hour
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
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-3"></div>
        {days.map((day) => (
          <div key={day.toISOString()} className="p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">{format(day, "EEE")}</div>
            <div className="text-sm font-medium">{format(day, "dd MMM")}</div>
            <div className="text-xs text-gray-500">{format(day, "EEEE")}</div>
          </div>
        ))}
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {timeSlots.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-100">
            <div className="p-2 text-right text-xs text-blue-600 font-medium border-r border-gray-200">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
            {days.map((day) => {
              const timeSlotEvents = getEventsForTimeSlot(day, hour)
              const groupedEvents = groupEventsByDateTime(timeSlotEvents)

              return (
                <motion.div
                  key={`${day.toISOString()}-${hour}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="min-h-[60px] p-1 border-l border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-1">
                    {groupedEvents.map((group, groupIndex) => (
                      <div key={groupIndex}>
                        {group.events.length === 1 ? (
                          <EventCard 
                            event={group.events[0]} 
                            onClick={() => onEventClick(group.events[0])} 
                            compact 
                            showTimeRange={isEventStartHour(group.events[0], hour)}
                          />
                        ) : (
                          <div 
                            onClick={(e) => onDateEventsClick(group.events, e.currentTarget)}
                            className="relative cursor-pointer"
                          >
                            <EventCard 
                              event={group.events[0]} 
                              onClick={() => { }} 
                              compact 
                              showTimeRange={isEventStartHour(group.events[0], hour)}
                            />
                            <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
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
        ))}
      </div>
    </div>
  )
}