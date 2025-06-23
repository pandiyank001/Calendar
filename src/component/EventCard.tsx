"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import type { CalendarEvent } from "../types"
import { Edit, Trash2 } from "lucide-react"

interface EventCardProps {
  event: CalendarEvent
  onClick: () => void
  compact?: boolean
  showTimeRange?: boolean
}

export default function EventCard({ 
  event, 
  onClick, 
  compact = false, 
  showTimeRange = true 
}: EventCardProps) {
  const startTime = format(new Date(event.start), "hh:mm a")
  const endTime = format(new Date(event.end), "hh:mm a")
  
  const eventDuration = new Date(event.end).getTime() - new Date(event.start).getTime()
  const isLongEvent = eventDuration > (2 * 60 * 60 * 1000) 

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white text-black rounded-md p-2 cursor-pointer transition-colors border-l-4 ${
        isLongEvent ? 'border-l-orange-500' : 'border-l-blue-500'
      } shadow-sm ${isLongEvent && !showTimeRange ? 'opacity-75 border-dashed' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">
            {event.job_id?.jobRequest_Title || event.summary}
            {isLongEvent && !showTimeRange && (
              <span className="ml-1 text-xs text-orange-600">• ongoing</span>
            )}
          </div>
          <div className="text-gray-600 text-xs truncate">{event.summary}</div>
          {!compact && (
            <div className="text-gray-600 text-xs mt-1">
              Interviewer: {event.user_det?.handled_by?.firstName} {event.user_det?.handled_by?.lastName}
            </div>
          )}
          {showTimeRange && (
            <div className="text-gray-700 text-xs">
              Time: {startTime} - {endTime}
              {isLongEvent && (
                <span className="ml-1 text-orange-600 text-xs">
                  ({Math.round(eventDuration / (60 * 60 * 1000))}h duration)
                </span>
              )}
            </div>
          )}
          {!showTimeRange && isLongEvent && (
            <div className="text-gray-500 text-xs italic">
              Started at {startTime}
            </div>
          )}
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