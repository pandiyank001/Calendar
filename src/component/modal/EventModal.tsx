"use client"

import { motion } from "framer-motion"
import { X, Eye, Download } from "lucide-react"
import { format } from "date-fns"
import type { CalendarEvent } from "../../types"

interface EventModalProps {
  event: CalendarEvent
  isOpen: boolean
  onClose: () => void
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!isOpen) return null

  const handleJoinMeeting = () => {
    if (event.link) {
      window.open(event.link, "_blank")
    }
  }

  const handleResumeDownload = () => {
    console.log("Download resume")
  }

  const handleAudiocardView = () => {
    console.log("View audiocard")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Event Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex">
          <div className="flex-1 space-y-4 pr-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Position: {event.job_id?.jobRequest_Title}</label>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Created By:</label>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Interview With:                 {event.user_det?.candidate?.candidate_firstName} {event.user_det?.candidate?.candidate_lastName}
              </label>

            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Interview Date: {format(new Date(event.start), "dd MMM yyyy")}</label>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Interview Time:  {format(new Date(event.start), "hh:mm a")} - {format(new Date(event.end), "hh:mm a")}</label>

            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleResumeDownload}
                className="flex items-center cursor-pointer space-x-2 px-3 py-2 w-48 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Resume docs</span>
                <Download className="w-4 h-4 ml-auto" />
              </button>

              <button
                onClick={handleAudiocardView}
                className="flex items-center cursor-pointer space-x-2 w-48 px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Audiocard</span>
                <Download className="w-4 h-4 ml-auto" />
              </button>
            </div>
          </div>

          <div className="w-px bg-gray-200"></div>

          <div className="flex flex-col items-center justify-center space-y-4 px-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 text-center">Interview Via:</label>
              <img src="./gmeet.jpg" className="w-20 h-20" />
              <p className="text-gray-600 text-sm text-center mt-2">Google Meet</p>
            </div>

            <button
              onClick={handleJoinMeeting}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors font-medium text-sm"
            >
              JOIN
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}