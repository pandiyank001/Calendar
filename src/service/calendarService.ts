import type { CalendarEvent } from "../types"

const mockEvents: CalendarEvent[] = [
  {
    id: 1,
    summary: "1st Round",
    desc: "1st Round",
    start: "2025-06-14T01:00:00+05:30",
    end: "2025-06-14T02:00:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      P: 8,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "Django developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "Django",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "Django developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "Django",
      jobRequest_Description: "asfffasf",
    },
  },

  {
    id: 3,
    summary: "2nd Round",
    desc: "2nd Round",
    start: "2025-06-26T03:00:00+05:30",
    end: "2025-06-26T04:00:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      o: 6,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "Lakshman_hr@dataterrain.com",
        username: "Lakshman_hr",
        firstName: "Lakshman_hr",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "NodeJs developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "NodeJs",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "NodeJs developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "NodeJs",
      jobRequest_Description: "asfffasf",
    },
  },

   {
    id: 4,
    summary: "2nd Round",
    desc: "2nd Round",
    start: "2025-06-26T03:00:00+05:30",
    end: "2025-06-26T04:00:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      o: 6,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "NodeJs developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "NodeJs",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "NodeJs developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "NodeJs",
      jobRequest_Description: "asfffasf",
    },
  },
    {
    id: 6,
    summary: "2nd Round",
    desc: "2nd Round",
    start: "2025-06-23T03:00:00+05:30",
    end: "2025-06-23T04:00:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      o: 6,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "Frontend developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "Frontend",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "Frontend developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "Frontend",
      jobRequest_Description: "asfffasf",
    },
  },  
   {
    id: 7,
    summary: "2nd Round",
    desc: "2nd Round",
    start: "2025-06-23T03:00:00+05:30",
    end: "2025-06-23T04:00:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      o: 6,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "Lakshman_hr@dataterrain.com",
        username: "Lakshman_hr",
        firstName: "Lakshman_hr",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "Frontend developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "Frontend",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "Frontend developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "Frontend",
      jobRequest_Description: "asfffasf",
    },
  },  
  
]

export async function fetchCalendarEvents(_startDate: Date, _endDate: Date): Promise<CalendarEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockEvents
}

export async function fetchEventDetails(eventId: number): Promise<CalendarEvent> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const event = mockEvents.find((e) => e.id === eventId)
  if (!event) {
    throw new Error("Event not found")
  }

  return event
}
