import { Router } from "express";
import { DoctorControllerSchedule } from "../controllers/doctor_schedule";
import { authenticateToken } from "../middlewares/auth";
import { checkPermission } from "../middlewares/rbac";
const router = Router();

/**
 * @swagger
 * /doctor_schedule:
 *   get:
 *     summary: Get All Doctor Schedule
 *     tags: [Doctor Schedule]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Schedule Doctor data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Schedule ID
 *                       doctor_id:
 *                         type: string
 *                         description: Doctor ID
 *                       day:
 *                         type: string
 *                         description: Day of schedule (e.g., "senin")
 *                       time_start:
 *                         type: string
 *                         description: Start time (format HH:mm:ss)
 *                       time_finish:
 *                         type: string
 *                         description: End time (format HH:mm:ss)
 *                       quota:
 *                         type: number
 *                         description: Maximum number of patients
 *                       status:
 *                         type: boolean
 *                         description: Whether the schedule is active
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date in YYYY-MM-DD format
 *                       doctor_name:
 *                         type: string
 *                         description: Doctor's name
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

router.get("/", authenticateToken, DoctorControllerSchedule.getDoctorSchedule);
/**
 * @swagger
 * /doctor_schedule:
 *   post:
 *     summary: Create new doctor schedules (bulk)
 *     tags: [Doctor Schedule]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctor_id
 *               - date_range
 *               - schedule
 *             properties:
 *               doctor_id:
 *                 type: string
 *                 description: ID of the doctor
 *               date_range:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *                 minItems: 2
 *                 maxItems: 2
 *                 description: Start and end date for schedule generation
 *               schedule:
 *                 type: array
 *                 description: List of weekly schedules
 *                 items:
 *                   type: object
 *                   required:
 *                     - day
 *                     - time_start
 *                     - time_finish
 *                     - quota
 *                     - status
 *                   properties:
 *                     day:
 *                       type: string
 *                       description: Name of the day (e.g., "senin")
 *                     time_start:
 *                       type: string
 *                       example: "08:00"
 *                       description: Start time (HH:mm)
 *                     time_finish:
 *                       type: string
 *                       example: "12:00"
 *                       description: End time (HH:mm)
 *                     quota:
 *                       type: number
 *                       description: Maximum patient quota
 *                     status:
 *                       type: boolean
 *                       description: Schedule active status
 *     responses:
 *       200:
 *         description: Create Schedule Doctor data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       doctor_id:
 *                         type: string
 *                       day:
 *                         type: string
 *                       time_start:
 *                         type: string
 *                       time_finish:
 *                         type: string
 *                       quota:
 *                         type: number
 *                       status:
 *                         type: boolean
 *                       date:
 *                         type: string
 *                         format: date
 *                       doctor_name:
 *                         type: string
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */

router.post(
  "/",
  [authenticateToken, checkPermission("manage:schedule")],
  DoctorControllerSchedule.createDoctorSchedule
);
router.get(
  "/:id",
  authenticateToken,
  DoctorControllerSchedule.getDoctorScheduleById
);
router.put(
  "/:id",
  [authenticateToken, checkPermission("manage:schedule")],
  DoctorControllerSchedule.updateDoctorSchedule
);
router.delete(
  "/:id",
  [authenticateToken, checkPermission("manage:schedule")],
  DoctorControllerSchedule.deleteDoctorSchedule
);

export default router;
