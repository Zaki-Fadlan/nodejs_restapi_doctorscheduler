import db from "../config/database";
import { DoctorSchedule, DoctorScheduleDTO } from "../types/doctor_schedule";
import { formatDateToYMD } from "../utils/dateUtils";
import { UserModel } from "../models/user";

export class DoctorScheduleModel {
  static async createDoctorSchedule(scheduleEntry: {
    doctor_id: string;
    day: string;
    time_start: string;
    time_finish: string;
    quota: number;
    status: boolean;
    date: Date;
  }): Promise<DoctorSchedule> {
    try {
      const result = await db.query(
        `INSERT INTO doctor_schedules 
        (doctor_id, day, time_start, time_finish, quota, status, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          scheduleEntry.doctor_id,
          scheduleEntry.day,
          scheduleEntry.time_start,
          scheduleEntry.time_finish,
          scheduleEntry.quota,
          scheduleEntry.status,
          scheduleEntry.date,
        ]
      );

      const user = await UserModel.findById(scheduleEntry.doctor_id);
      const inserted = result.rows[0];
      inserted.doctor_name = user.name;
      inserted.date = formatDateToYMD(inserted.date);

      return inserted;
    } catch (error: any) {
      console.error("Create Schedule Error:", error);
      throw new Error("Schedule creation failed");
    }
  }

  static async getDoctorSchedule(): Promise<DoctorSchedule[]> {
    try {
      const result = await db.query(
        `SELECT ds.*, u.name as doctor_name, to_char(ds.date, 'YYYY-MM-DD') as date
        FROM doctor_schedules ds
        JOIN users u ON ds.doctor_id = u.id`
      );
      return result.rows;
    } catch (error: any) {
      console.error("Get Schedule Error:", error);
      throw new Error("Failed to retrieve schedule");
    }
  }

  static async getDoctorScheduleById(
    id: string
  ): Promise<DoctorSchedule | null> {
    try {
      const result = await db.query(
        `SELECT ds.*, u.name as doctor_name, to_char(ds.date, 'YYYY-MM-DD') as date
        FROM doctor_schedules ds
        JOIN users u ON ds.doctor_id = u.id
        WHERE ds.id = $1`,
        [id]
      );
      return result.rows[0] || null;
    } catch (error: any) {
      console.error("Get Schedule By ID Error:", error);
      throw new Error("Failed to retrieve schedule");
    }
  }

  static async updateDoctorSchedule(
    id: string,
    data: Partial<DoctorScheduleDTO>
  ): Promise<DoctorSchedule> {
    try {
      const setClause = Object.keys(data)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(", ");

      const values = Object.values(data);

      const result = await db.query(
        `UPDATE doctor_schedules
        SET ${setClause}
        WHERE id = $1
        RETURNING *`,
        [id, ...values]
      );

      if (result.rows.length === 0) {
        throw new Error("Schedule not found");
      }

      const schedule = result.rows[0];
      const userResult = await db.query(
        `SELECT name as doctor_name FROM users WHERE id = $1`,
        [schedule.doctor_id]
      );

      return {
        ...schedule,
        doctor_name: userResult.rows[0].doctor_name,
        date: formatDateToYMD(schedule.date),
      };
    } catch (error: any) {
      console.error("Update Schedule Error:", error);
      throw new Error("Failed to update schedule");
    }
  }

  static async deleteDoctorSchedule(id: string): Promise<void> {
    try {
      const result = await db.query(
        `DELETE FROM doctor_schedules WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        throw new Error("Schedule not found");
      }
    } catch (error: any) {
      console.error("Delete Schedule Error:", error);
      throw new Error("Failed to delete schedule");
    }
  }
}
