import Reservation from "../models/reservationModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user reservations
// @route   GET /api/reservation
// @access  Private
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id });
  res.json(reservations);
});

//@description     Fetch single Reservation
//@route           GET /api/reservation/:id
//@access          Public
const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).json({ message: "Reservation not found" });
  }

  res.json(Reservation);
});

//@description     Create single Reservation
//@route           GET /api/reservations/create
//@access          Private
const CreateReservation = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const reservation = new Reservation({ user: req.user._id, title, content, category });

    const createdReservation = await reservation.save();

    res.status(201).json(createdReservation);
  }
});

//@description     Delete single Reservation
//@route           GET /api/reservations/:id
//@access          Private
const DeleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (reservation) {
    await reservation.remove();
    res.json({ message: "Reservation Canceled" });
  } else {
    res.status(404);
    throw new Error("Reservation not Found");
  }
});

// @desc    Update a reservation
// @route   PUT /api/reservations/:id
// @access  Private
const UpdateReservation = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const reservation = await Reservation.findById(req.params.id);

  if (reservation.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (reservation) {
    reservation.title = title;
    reservation.content = content;
    reservation.category = category;

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } else {
    res.status(404);
    throw new Error("Reservation not found");
  }
});

export { getReservationById, getReservations, CreateReservation, DeleteReservation, UpdateReservation };
