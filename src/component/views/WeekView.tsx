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
  const BASE_HOUR_HEIGHT = 100 

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

  const calculateEventDurationPercentage = (event: CalendarEvent) => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)
    const durationInMinutes = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60)
    
    const cappedDuration = Math.min(durationInMinutes, 60)
    
    return (cappedDuration / 60) * 100
  }

  const calculateDynamicHourHeight = (date: Date, hour: number) => {
    const timeSlotEvents = getEventsForTimeSlot(date, hour)
    
    if (timeSlotEvents.length === 0) {
      return BASE_HOUR_HEIGHT 
    }

  
    const startingEvent = timeSlotEvents.find(event => isEventStartHour(event, hour))
    
    if (!startingEvent) {
      return BASE_HOUR_HEIGHT 
    }

    const durationPercentage = calculateEventDurationPercentage(startingEvent)

    const spaceMultiplier = 2.0 - (durationPercentage / 100) * 1.2
    
    return Math.max(BASE_HOUR_HEIGHT * spaceMultiplier, 60) 
  }

  const calculateEventHeight = (event: CalendarEvent) => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)
    const durationInMinutes = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60)
    const durationInHours = Math.min(durationInMinutes / 60, 1) 
    
    return Math.max(durationInHours * BASE_HOUR_HEIGHT, 40) 
  }

  const calculateEventTopOffset = (event: CalendarEvent, hour: number, hourHeight: number) => {
    const eventStart = new Date(event.start)
    const eventHour = eventStart.getHours()
    const eventMinutes = eventStart.getMinutes()
    
    if (eventHour === hour) {
      return (eventMinutes / 60) * hourHeight
    }
    return 0
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

      <div className="max-h-[800px] overflow-y-auto">
        {timeSlots.map((hour) => {
          const maxHourHeight = Math.max(
            ...days.map(day => calculateDynamicHourHeight(day, hour))
          )

          return (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-100" style={{ height: `${maxHourHeight}px` }}>
              <div className="p-2 text-right text-xs text-blue-600 font-medium border-r border-gray-200 flex items-start">
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
                    className="relative border-l border-gray-200 hover:bg-gray-50 transition-colors h-full"
                  >
                  <div className="absolute inset-0 p-2">
                    {groupedEvents.map((group, groupIndex) => {
                      if (!isEventStartHour(group.events[0], hour)) {
                        return null 
                      }

                      const event = group.events[0]
                      const eventHeight = calculateEventHeight(event)
                      const topOffset = calculateEventTopOffset(event, hour, maxHourHeight)

                      return (
                        <div 
                          key={groupIndex}
                          className="absolute left-2 right-2"
                          style={{
                            top: `${topOffset}px`,
                            height: `${eventHeight}px`,
                            zIndex: 10
                          }}
                        >
                          {group.events.length === 1 ? (
                            <div style={{ height: '100%' }}>
                              <EventCard 
                                event={event} 
                                onClick={() => onEventClick(event)} 
                                compact 
                                showTimeRange={true}
                              />
                            </div>
                          ) : (
                            <div 
                              onClick={(e) => onDateEventsClick(group.events, e.currentTarget)}
                              className="relative cursor-pointer h-full"
                            >
                              <EventCard 
                                event={event} 
                                onClick={() => { }} 
                                compact 
                                showTimeRange={true}
                              />
                              <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                                {group.events.length}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                                  </motion.div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}