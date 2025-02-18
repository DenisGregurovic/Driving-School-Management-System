const express = require("express");
const { loginHandler, registerHandler } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/login", loginHandler); // Ruta za login
router.post("/register", registerHandler); // Ruta za registraciju

module.exports = router;
