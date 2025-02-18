const express = require("express");
const {
  getInstructors,
  getInstructor,
  createInstructor,
  updateInstructorHandler,
  deleteInstructorHandler,
} = require("../controllers/instruktor.controller.js");

const router = express.Router();

router.get("/", getInstructors); // Dohvaćanje svih instruktora
router.get("/:id", getInstructor); // Dohvaćanje instruktora po ID-u
router.post("/", createInstructor); // Dodavanje novog instruktora
router.put("/:id", updateInstructorHandler); // Ažuriranje instruktora po ID-u
router.delete("/:id", deleteInstructorHandler); // Brisanje instruktora po ID-u


module.exports = router;
