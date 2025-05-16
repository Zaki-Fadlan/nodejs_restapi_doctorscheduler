import { Router } from "express";
import { UsersController } from "../controllers/users";
const router = Router();

router.get("/", UsersController.getUsers);
router.get("/:id", UsersController.getUsersById);
router.post("/", UsersController.createUsers);
router.put("/:id", UsersController.updateUsers);
router.delete("/:id", UsersController.deleteUsers);

export default router;
