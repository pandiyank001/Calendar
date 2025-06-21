"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import type { CalendarEvent } from "../types"
import { Edit, Trash2 } from "lucide-react"

interface EventCardProps {
  event: CalendarEvent
  onClick: () => void
  compact?: boolean
}

export default function EventCard({ event, onClick, compact = false }: EventCardProps) {
  const startTime = format(new Date(event.start), "HH:mm")
  const endTime = format(new Date(event.end), "HH:mm")

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white text-black rounded-md p-2 cursor-pointer transition-colors border-l-4 border-l-blue-500 shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{event.job_id?.jobRequest_Title || event.summary}</div>
          <div className="text-gray-600 text-xs truncate">{event.summary}</div>
          {!compact && (
            <div className="text-gray-600 text-xs mt-1">
              Interviewer: {event.user_det?.handled_by?.firstName} {event.user_det?.handled_by?.lastName}
            </div>
          )}
          <div className="text-gray-700 text-xs">
            Time: {startTime} - {endTime}
          </div>
        </div>
        {!compact && (
          <div className="flex space-x-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="p-1 hover:bg-blue-100 rounded transition-colors"
            >
              <Edit className="w-3 h-3 text-gray-600 hover:text-blue-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="p-1 hover:bg-red-100 rounded transition-colors"
            >
              <Trash2 className="w-3 h-3 text-red-400 hover:text-red-600" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}