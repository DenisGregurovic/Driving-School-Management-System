const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUserHandler,
  deleteUserHandler,
  getInstructors,
  getUsers,
} = require("../controllers/korisnik.controller.js");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);
router.get("/role/instruktor", getInstructors); // Nova ruta za dohvaćanje instruktora
router.get("/role/korisnik", getUsers); // Nova ruta za dohvaćanje instruktora

module.exports = router;
