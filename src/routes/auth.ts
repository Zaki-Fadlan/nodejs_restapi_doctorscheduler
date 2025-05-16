import { Router } from "express";
import { AuthController } from "../controllers/auth";

const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *               - role_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *               role_id:
 *                 type: number
 *                 description: User's role ID
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 body:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token for the user
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: User ID
 *                         name:
 *                           type: string
 *                           description: User's name
 *                         username:
 *                           type: string
 *                           description: User's username
 *                         role:
 *                           type: string
 *                           description: User's role
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: text
 *                 description: User's username
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", AuthController.login);
// router.post("/refresh-token", AuthController.refreshToken);
// router.post("/logout", AuthController.logout);
// router.post("/forgot-password", AuthController.forgotPassword);
// router.post("/reset-password", AuthController.resetPassword);
export default router;
