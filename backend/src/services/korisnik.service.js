const Korisnik = require("../models/Korisnik.js");

// Dohvaćanje svih korisnika
const fetchAllUsers = async () => {
  return await Korisnik.find();
};

// Dohvaćanje korisnika po ID-u
const fetchUserById = async (id) => {
  return await Korisnik.findOne({ id });
};

// Dodavanje novog korisnika
const createNewUser = async (userData) => {
  const newUser = new Korisnik(userData);
  return await newUser.save();
};

// Ažuriranje korisnika
const modifyUser = async (id, updatedData) => {
  return await Korisnik.findOneAndUpdate({ id }, updatedData, { new: true });
};

// Brisanje korisnika
const removeUser = async (id) => {
  return await Korisnik.findOneAndDelete({ id });
};

// Dohvaćanje korisnika po emailu
const fetchUserByEmail = async (email) => {
  return await Korisnik.findOne({ email });
};
// Dohvaćanje korisnika s određenom ulogom
const fetchUsersByRole = async (role) => {
  return await Korisnik.find({ razina_prava: role }); // Dohvati sve korisnike s određenom ulogom
};

module.exports = {
  fetchAllUsers,
  fetchUserById,
  createNewUser,
  modifyUser,
  removeUser,
  fetchUserByEmail,
  fetchUsersByRole, 
};
