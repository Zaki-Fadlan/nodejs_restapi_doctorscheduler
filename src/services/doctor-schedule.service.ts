import { DoctorScheduleModel } from "../models/doctor_schedule";
import { DoctorSchedule, DoctorScheduleDTO } from "../types/doctor_schedule";
import { getAllDatesInRange, DayToDatesMap } from "../utils/dateUtils";
export class DoctorScheduleService {
  static async getAllSchedules() {
    return await DoctorScheduleModel.getDoctorSchedule();
  }
  static async createSchedule(
    scheduleData: DoctorScheduleDTO
  ): Promise<DoctorSchedule[]> {
    try {
      if (
        !scheduleData.doctor_id ||
        !scheduleData.date_range ||
        !scheduleData.schedule
      ) {
        throw new Error("Invalid schedule data");
      }

      const [date_start, date_end] = scheduleData.date_range.map(
        (d) => new Date(d)
      );
      const allDates = getAllDatesInRange(date_start, date_end);

      const dayToDatesMaps = DayToDatesMap(allDates);

      const createdSchedules: DoctorSchedule[] = [];

      for (const schedule of scheduleData.schedule) {
        const datesForDay = dayToDatesMaps[schedule.day.toLowerCase()];
        if (!datesForDay) continue;

        for (const date of datesForDay) {
          const scheduleEntry = {
            doctor_id: scheduleData.doctor_id,
            day: schedule.day,
            time_start: schedule.time_start,
            time_finish: schedule.time_finish,
            quota: schedule.quota,
            status: schedule.status,
            date: date,
          };

          const created = await DoctorScheduleModel.createDoctorSchedule(
            scheduleEntry
          );
          createdSchedules.push(created);
        }
      }

      return createdSchedules;
    } catch (error: any) {
      throw new Error(`Failed to create schedule: ${error.message}`);
    }
  }

  static async getScheduleById(id: string): Promise<DoctorSchedule | null> {
    const schedule = await DoctorScheduleModel.getDoctorScheduleById(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return schedule;
  }

  static async updateSchedule(
    id: string,
    scheduleData: Partial<DoctorScheduleDTO>
  ): Promise<DoctorSchedule> {
    const schedule = await DoctorScheduleModel.getDoctorScheduleById(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return await DoctorScheduleModel.updateDoctorSchedule(id, scheduleData);
  }

  static async deleteSchedule(id: string): Promise<void> {
    const schedule = await DoctorScheduleModel.getDoctorScheduleById(id);
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    await DoctorScheduleModel.deleteDoctorSchedule(id);
  }
}
