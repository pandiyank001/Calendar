# 📅 Calendar Event Scheduler

A dynamic calendar application built with **React**, featuring smooth transitions, modal-based event handling, and flexible views for **Day**, **Week**, and **Month** scheduling.

---

## 🚀 Features

- Switch between **Month**, **Week**, and **Day** views
- View, click, and interact with events for specific dates and times
- Modals for:
  - Viewing detailed event information
  - Listing all events on a selected day
- **Smart Modal Positioning** based on available screen space
- Animated transitions using **Framer Motion**
- Mock event data for testing and development

---

## 🛠 Tech Stack

- **React** (TypeScript)
- **Tailwind CSS**
- **Framer Motion** for animation
- **date-fns** for date manipulation
- **Lucide React** icons

---

## 📂 Folder Structure

```bash
src/
│
├── components/
│   ├── Calendar.tsx           # Main Calendar component
│   ├── CalendarHeader.tsx     # Navigation and View Controls
│   ├── EventCard.tsx          # Displays event summary
│   ├── modal/
│   │   ├── EventModal.tsx     # Event detail modal
│   │   └── EventListModal.tsx # Modal for multiple events on the same day
│   └── views/
│       ├── DayView.tsx
│       ├── WeekView.tsx
│       └── MonthView.tsx
│
├── service/
│   └── calendarService.ts     # Mock event fetching logic
│
├── types/
│   └── index.ts               # TypeScript interfaces
│
└── utils/
    └── calendarutils.ts       # Event grouping utilities


## 🚀 MockData
Mock data is used from calendarService.ts and includes events with varying dates, times, and metadata.

/src/service/calendarService.ts


🖥️ How to Run
Clone the repo:

git clone https://github.com/yourusername/calendar-app.git

cd calendar-app

Install dependencies:

npm install

Start development server:

npm run dev

Visit http://localhost:5173 to see the calendar in action.