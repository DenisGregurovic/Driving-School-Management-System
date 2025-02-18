const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Korisnik = require("../models/Korisnik.js");

const login = async (email, lozinka) => {
  const user = await Korisnik.findOne({ email });
  if (!user) {
    console.log("Korisnik nije pronađen za email:", email);
    throw new Error("Pogrešan email ili lozinka.");
  }

  const isPasswordValid = await bcrypt.compare(lozinka, user.lozinka);
  console.log("Provjera lozinke:", isPasswordValid);

  if (!isPasswordValid) {
    throw new Error("Pogrešan email ili lozinka.");
  }

  const token = jwt.sign(
    { id: user.id, razina_prava: user.razina_prava },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  console.log("Token generiran:", token);

  return { user, token };
};

const register = async (data) => {
  const existingUser = await Korisnik.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Korisnik sa ovim emailom već postoji.");
  }

  const newUser = new Korisnik(data);
  return await newUser.save();
};

module.exports = { login, register };
