"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useRef } from "react"
import type { CalendarEvent } from "../../types"
import EventCard from "../EventCard"

interface EventListModalProps {
  events: CalendarEvent[]
  isOpen: boolean
  anchorRect: DOMRect
  direction: "left" | "right"
  onClose: () => void
  onEventClick: (event: CalendarEvent) => void
}

export default function EventListModal({
  events,
  isOpen,
  anchorRect,
  direction,
  onClose,
  onEventClick,
}: EventListModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !anchorRect) return null

  const offset = 20
  const left =
    direction === "right"
      ? anchorRect.right-60 + offset
      : anchorRect.left - 320 - offset

  const modalStyle: React.CSSProperties = {
    position: "absolute",
    top: `${anchorRect.top + window.scrollY - 100}px`,
    left: `${left}px`,
    zIndex: 9999,
  }

  return (
    <motion.div
      ref={modalRef}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      style={modalStyle}
      className="bg-white rounded-lg shadow-xl w-64 p-4 border-l-4 border-l-blue-500"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Meetings</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-3 max-h-96 ">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg border border-gray-200 border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              onEventClick(event)
              onClose()
            }}
          >
            <EventCard
              event={event}
              onClick={() => {
                onEventClick(event)
                onClose()
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}