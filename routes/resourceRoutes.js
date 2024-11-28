import express from "express";
import {
  authenticateToken,
  authorizePermission,
} from "../middlewares/authMiddleware.js";
import {
  readResource,
  writeResource,
  deleteResource,
} from "../controllers/resourceController.js";

const router = express.Router();

router.get(
  "/read",
  authenticateToken,
  authorizePermission("read"),
  readResource
);
router.post(
  "/write",
  authenticateToken,
  authorizePermission("write"),
  writeResource
);
router.delete(
  "/delete",
  authenticateToken,
  authorizePermission("delete"),
  deleteResource
);

export default router;
