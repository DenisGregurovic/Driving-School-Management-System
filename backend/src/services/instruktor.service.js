const Korisnik = require("../models/Korisnik.js");
const Instruktor = require("../models/Instruktor.js");

// Dohvaćanje svih instruktora
const getAllInstructors = async () => {
  return await Instruktor.find().populate({
    path: "korisnik",           // Povezivanje s modelom Korisnik
    model: "Korisnik",
    localField: "korisnik",     // Koristi polje `korisnik` iz modela Instruktor
    foreignField: "id",         // Koristi polje `id` iz modela Korisnik
    select: "-_id",             // Isključuje `_id` iz odgovora
    options: { strictPopulate: false }, // Omogućava prilagođeno povezivanje
  });
};

// Dohvaćanje instruktora po ID-u
const getInstructorById = async (id) => {
  return await Instruktor.findOne({ korisnik: id }).populate({
    path: "korisnik",
    model: "Korisnik",
    localField: "korisnik",
    foreignField: "id",
    select: "-_id",             // Isključuje `_id` iz odgovora
    options: { strictPopulate: false },
  });
};

// Dodavanje instruktora
const addInstructor = async (instructorData) => {
  const newInstructor = new Instruktor(instructorData);
  return await newInstructor.save();
};

// Ažuriranje korisnika
const updateUser = async (id, updatedUserData) => {
  return await Korisnik.findOneAndUpdate({ id }, updatedUserData, { new: true });
};

// Ažuriranje instruktora
const updateInstructor = async (id, updatedInstructorData) => {
  return await Instruktor.findOneAndUpdate({ korisnik: id }, updatedInstructorData, { new: true }).populate({
    path: "korisnik",
    model: "Korisnik",
    localField: "korisnik",
    foreignField: "id",
    select: "-_id",
    options: { strictPopulate: false },
  });
};

// Ažuriranje instruktora i korisnika zajedno
const updateInstructorWithUser = async (id, updatedInstructorData, updatedUserData) => {
  if (updatedUserData) {
    await updateUser(id, updatedUserData);
  }
  return await updateInstructor(id, updatedInstructorData);
};

// Brisanje instruktora
const deleteInstructor = async (id) => {
  return await Instruktor.findOneAndDelete({ korisnik: id });
};

// Brisanje korisnika
const deleteUser = async (id) => {
  return await Korisnik.findOneAndDelete({ id });
};

const getInstructorsUsers = async () => {
  return await Korisnik.find({ razina_prava: "instruktor" }, { id: 1, ime: 1, prezime: 1 }); // Dohvati samo potrebna polja
};

module.exports = {
  getAllInstructors,
  getInstructorById,
  addInstructor,
  updateInstructorWithUser,
  deleteInstructor,
  getInstructorsUsers,
  deleteUser
};