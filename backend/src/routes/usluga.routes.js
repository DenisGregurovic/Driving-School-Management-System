const express = require("express");
const {
  getServices,
  getService,
  createService,
  updateServiceHandler,
  deleteServiceHandler,
} = require("../controllers/usluga.controller.js");

const router = express.Router();

router.get("/", getServices); // Dohvaćanje svih usluga
router.get("/:id", getService); // Dohvaćanje usluge po ID-u
router.post("/", createService); // Dodavanje nove usluge
router.put("/:id", updateServiceHandler); // Ažuriranje usluge
router.delete("/:id", deleteServiceHandler); // Brisanje usluge

module.exports = router;
