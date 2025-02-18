const Rezervacija = require("../models/Rezervacija.js");
const Korisnik = require("../models/Korisnik.js");
const Instruktor = require("../models/Instruktor.js");
const Usluga = require("../models/Usluga.js");

// Dohvaćanje svih rezervacija
const getAllReservations = async () => {
    const reservations = await Rezervacija.find();
  
    // Ručno povezivanje podataka
    return await Promise.all(
      reservations.map(async (reservation) => {
        const korisnik = await Korisnik.findOne({ id: reservation.korisnik });
        const instruktor = await Instruktor.findOne({ korisnik: reservation.instruktor });
        const usluga = await Usluga.findOne({ id: reservation.usluga });
  
        return {
          id: reservation.id,
          korisnik,
          instruktor,
          usluga,
          datum: reservation.datum,
        };
      })
    );
  };

// Dohvaćanje rezervacije po ID-u
const getReservationById = async (id) => {
    const reservation = await Rezervacija.findOne({ id });
  
    if (!reservation) {
      return null;
    }
  
const korisnik = await Korisnik.findOne({ id: reservation.korisnik });
const instruktor = await Instruktor.findOne({ korisnik: reservation.instruktor });
const usluga = await Usluga.findOne({ id: reservation.usluga });

  
    return {
      id: reservation.id,
      korisnik,
      instruktor,
      usluga,
      datum: reservation.datum,
    };
  };

// Dodavanje nove rezervacije
const addReservation = async (reservationData) => {
  const newReservation = new Rezervacija(reservationData);
  return await newReservation.save();
};

// Ažuriranje rezervacije
const updateReservation = async (id, updatedData) => {
    const { korisnik, instruktor, usluga, datum } = updatedData;
  
    // Provjeri da li korisnik postoji
    const existingUser = await Korisnik.findOne({ id: korisnik });
    if (!existingUser) {
      throw new Error(`User with id ${korisnik} not found`);
    }
  
    // Provjeri da li instruktor postoji
    const existingInstructor = await Instruktor.findOne({ korisnik: instruktor });
    if (!existingInstructor) {
      throw new Error(`Instructor with id ${instruktor} not found`);
    }
  
    // Provjeri da li usluga postoji
    const existingService = await Usluga.findOne({ id: usluga });
    if (!existingService) {
      throw new Error(`Service with id ${usluga} not found`);
    }
  
    // Ažuriraj rezervaciju
    return await Rezervacija.findOneAndUpdate(
      { id },
      { korisnik, instruktor, usluga, datum },
      { new: true }
    );
  };

// Brisanje rezervacije
const deleteReservation = async (id) => {
  return await Rezervacija.findOneAndDelete({ id });
};

module.exports = {
  getAllReservations,
  getReservationById,
  addReservation,
  updateReservation,
  deleteReservation,
};
