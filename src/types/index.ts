export interface CalendarEvent {
  id: number
  summary: string
  desc: string
  start: string
  end: string
  attendees: any
  status: any
  comment: any
  score: Record<string, number>
  link: string
  user_det: {
    id: number
    question_score: any
    status: any
    candidate: {
      id: number
      candidate_firstName: string
      candidate_lastName: string
      candidateGender: string
      candidateComment: string
      candidate_email: string
    }
    handled_by: {
      id: number
      last_login: any
      userEmail: string
      username: string
      firstName: string
      lastName: string
      userRole: string
    }
    job_id: {
      id: number
      jobRequest_Title: string
      jobRequest_Role: string
      jobRequest_KeySkills: string
      jobRequest_Description: string
    }
  }
  job_id: {
    id: number
    jobRequest_Title: string
    jobRequest_Role: string
    jobRequest_KeySkills: string
    jobRequest_Description: string
  }
}

export type ViewType = "Day" | "Week" | "Month" | "Year"

export interface EventGroup {
  dateTime: string
  events: CalendarEvent[]
}
