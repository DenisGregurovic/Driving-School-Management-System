const express = require("express");
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservationHandler,
  deleteReservationHandler,
} = require("../controllers/rezervacija.controller.js");

const router = express.Router();

router.get("/", getReservations); // Dohvaćanje svih rezervacija
router.get("/:id", getReservation); // Dohvaćanje rezervacije po ID-u
router.post("/", createReservation); // Dodavanje nove rezervacije
router.put("/:id", updateReservationHandler); // Ažuriranje rezervacije po ID-u
router.delete("/:id", deleteReservationHandler); // Brisanje rezervacije po ID-u

module.exports = router;
