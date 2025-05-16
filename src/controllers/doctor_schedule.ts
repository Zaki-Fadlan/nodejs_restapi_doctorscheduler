import { Request, Response } from "express";
import { sendError, sendResponse } from "../utils/response";
import { DoctorScheduleDTO } from "../types/doctor_schedule";
import { DoctorScheduleService } from "../services/doctor-schedule.service";

export class DoctorControllerSchedule {
  static async getDoctorSchedule(req: Request, res: Response): Promise<void> {
    try {
      const schedule = await DoctorScheduleService.getAllSchedules();
      sendResponse(
        res,
        200,
        "Schedule Doctor data retrieved successfully",
        schedule
      );
    } catch (error: any) {
      sendError(res, 500, error.message);
    }
  }

  static async getDoctorScheduleById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const schedule = await DoctorScheduleService.getScheduleById(id);
      sendResponse(
        res,
        200,
        "Schedule Doctor data retrieved successfully",
        schedule
      );
    } catch (error: any) {
      sendError(res, 404, error.message);
    }
  }

  static async createDoctorSchedule(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const scheduleData: DoctorScheduleDTO = req.body;
      const schedule = await DoctorScheduleService.createSchedule(scheduleData);
      sendResponse(res, 201, "Schedule Doctor created successfully", schedule);
    } catch (error: any) {
      sendError(res, 400, error.message);
    }
  }

  static async updateDoctorSchedule(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const scheduleData: Partial<DoctorScheduleDTO> = req.body;
      const schedule = await DoctorScheduleService.updateSchedule(
        id,
        scheduleData
      );
      sendResponse(res, 200, "Schedule Doctor updated successfully", schedule);
    } catch (error: any) {
      sendError(res, 404, error.message);
    }
  }

  static async deleteDoctorSchedule(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      await DoctorScheduleService.deleteSchedule(id);
      sendResponse(res, 200, "Schedule Doctor deleted successfully");
    } catch (error: any) {
      sendError(res, 404, error.message);
    }
  }
}
