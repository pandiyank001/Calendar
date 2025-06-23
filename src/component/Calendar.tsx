"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CalendarHeader from "./CalendarHeader"
import MonthView from "./views/MonthView"
import WeekView from "./views/WeekView"
import DayView from "./views/DayView"
import YearView from "./views/YearView"
import EventModal from "./modal/EventModal"
import EventListModal from "./modal/EventListModal"
import type { CalendarEvent, ViewType } from "../types"
import { fetchCalendarEvents } from "../service/calendarService"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
} from "date-fns"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<ViewType>("Month")
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[]>([])
  const [eventAnchorRect, setEventAnchorRect] = useState<DOMRect | null>(null)
  const [eventModalDirection, setEventModalDirection] = useState<"left" | "right">("left")
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isEventListModalOpen, setIsEventListModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadEvents = async () => {
    setLoading(true)
    try {
      let startDate: Date
      let endDate: Date

      switch (viewType) {
        case "Day":
          startDate = endDate = new Date(currentDate)
          break
        case "Week":
          startDate = startOfWeek(currentDate)
          endDate = endOfWeek(currentDate)
          break
        case "Month":
          startDate = startOfMonth(currentDate)
          endDate = endOfMonth(currentDate)
          break
        case "Year":
          startDate = new Date(currentDate.getFullYear(), 0, 1)
          endDate = new Date(currentDate.getFullYear(), 11, 31)
          break
        default:
          startDate = startOfMonth(currentDate)
          endDate = endOfMonth(currentDate)
      }

      const fetchedEvents = await fetchCalendarEvents(startDate, endDate)
      setEvents(fetchedEvents)
    } catch (error) {
      console.error("Failed to load events:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [currentDate, viewType])

  const navigateDate = (direction: "prev" | "next") => {
    switch (viewType) {
      case "Day":
        setCurrentDate(direction === "next" ? addDays(currentDate, 1) : subDays(currentDate, 1))
        break
      case "Week":
        setCurrentDate(direction === "next" ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1))
        break
      case "Month":
        setCurrentDate(direction === "next" ? addMonths(currentDate, 1) : subMonths(currentDate, 1))
        break
      case "Year":
        setCurrentDate(
          new Date(
            currentDate.getFullYear() + (direction === "next" ? 1 : -1),
            currentDate.getMonth(),
            currentDate.getDate(),
          ),
        )
        break
    }
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsEventModalOpen(true)

    setIsEventListModalOpen(false)
    setSelectedDateEvents([])
    setEventAnchorRect(null)
  }

  const handleDateEventsClick = (dateEvents: CalendarEvent[], anchorEl: HTMLElement) => {
    const rect = anchorEl.getBoundingClientRect()
    const spaceOnRight = window.innerWidth - rect.right
    const spaceOnLeft = rect.left

    const direction = spaceOnRight > spaceOnLeft ? "right" : "left"

    setSelectedDateEvents(dateEvents)
    setEventAnchorRect(rect)
    setEventModalDirection(direction)
    setIsEventListModalOpen(true)
  }

  const handleMonthClick = (month: Date) => {
    setCurrentDate(month)
    setViewType("Month")
  }

  const getDateRangeText = () => {
    switch (viewType) {
      case "Day":
        return format(currentDate, "dd MMMM yyyy")
      case "Week":
        return `${format(startOfWeek(currentDate), "dd MMM")} to ${format(endOfWeek(currentDate), "dd MMM, yyyy")}`
      case "Month":
        return format(currentDate, "MMMM yyyy")
      case "Year":
        return format(currentDate, "yyyy")
      default:
        return format(currentDate, "MMMM yyyy")
    }
  }

  const renderCalendarView = () => {
    const commonProps = {
      currentDate,
      events,
      onEventClick: handleEventClick,
      onDateEventsClick: handleDateEventsClick,
      loading,
    }

    switch (viewType) {
      case "Day":
        return <DayView {...commonProps} />
      case "Week":
        return <WeekView {...commonProps} />
      case "Month":
        return <MonthView {...commonProps} />
      case "Year":
        return <YearView {...commonProps} onMonthClick={handleMonthClick} />
      default:
        return <MonthView {...commonProps} />
    }
  }

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      <CalendarHeader
        title="Your Todo's"
        dateRange={getDateRangeText()}
        viewType={viewType}
        onViewTypeChange={setViewType}
        onNavigate={navigateDate}
        onCreateSchedule={() => {}}
      />

      <motion.div
        key={`${viewType}-${currentDate.toISOString()}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-4"
      >
        {renderCalendarView()}
      </motion.div>

      <AnimatePresence>
        {isEventModalOpen && selectedEvent && (
          <EventModal
            event={selectedEvent}
            isOpen={isEventModalOpen}
            onClose={() => {
              setIsEventModalOpen(false)
              setSelectedEvent(null)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEventListModalOpen && eventAnchorRect && (
          <EventListModal
            events={selectedDateEvents}
            isOpen={isEventListModalOpen}
            anchorRect={eventAnchorRect}
            direction={eventModalDirection}
            onClose={() => {
              setIsEventListModalOpen(false)
              setSelectedDateEvents([])
              setEventAnchorRect(null)
            }}
            onEventClick={handleEventClick}
          />
        )}
      </AnimatePresence>
    </div>
  )
}