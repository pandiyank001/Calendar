"use client"

import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import type { ViewType } from "../types"

interface CalendarHeaderProps {
  title: string
  dateRange: string
  viewType: ViewType
  onViewTypeChange: (viewType: ViewType) => void
  onNavigate: (direction: "prev" | "next") => void
  onCreateSchedule: () => void
}

export default function CalendarHeader({
  title,
  dateRange,
  viewType,
  onViewTypeChange,
  onNavigate,
  onCreateSchedule,
}: CalendarHeaderProps) {
  const viewTypes: ViewType[] = ["Day", "Week", "Month", "Year"]

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

        <div className="flex items-center space-x-2">
          <button onClick={() => onNavigate("prev")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <span className="text-lg font-medium text-gray-900 min-w-[200px] text-center">{dateRange}</span>

          <button onClick={() => onNavigate("next")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {viewTypes.map((type) => (
            <button
              key={type}
              onClick={() => onViewTypeChange(type)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === type ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              } cursor-pointer`}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          onClick={onCreateSchedule}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Schedule</span>
        </button>
      </div>
    </div>
  )
}
