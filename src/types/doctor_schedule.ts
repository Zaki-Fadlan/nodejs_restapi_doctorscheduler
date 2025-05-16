export interface DoctorSchedule {
  id: number;
  doctor: string;
  day: string;
  time_start: string;
  time_finish: string;
  quota: number;
  status: boolean;
  doctor_name: string;
  date: Date;
}

export interface DoctorScheduleDTO {
  doctor_id: string;
  date_range: [date_start: Date, date_end: Date];
  schedule: {
    day: string;
    time_start: string;
    time_finish: string;
    quota: number;
    status: boolean;
  }[];
}
