import express from "express";
import {
  getReservationById,
  getReservations,
  CreateReservation,
  DeleteReservation,
  UpdateReservation,
} from "../controllers/reservationController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getReservations);
router
  .route("/:id")
  .get(getReservationById)
  .delete(protect, DeleteReservation)
  .put(protect, UpdateReservation);
router.route("/create").post(protect, CreateReservation);

export default router;
