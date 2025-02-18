const {
    getAllReservations,
    getReservationById,
    addReservation,
    updateReservation,
    deleteReservation,
  } = require("../services/rezervacija.service.js");
  
  // Dohvaćanje svih rezervacija
  const getReservations = async (req, res) => {
    try {
      const reservations = await getAllReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Dohvaćanje rezervacije po ID-u
  const getReservation = async (req, res) => {
    const { id } = req.params;
    try {
      const reservation = await getReservationById(Number(id));
      if (!reservation) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Dodavanje nove rezervacije
  const createReservation = async (req, res) => {
    try {
      const newReservation = await addReservation(req.body);
      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Ažuriranje rezervacije
  const updateReservationHandler = async (req, res) => {
    const { id } = req.params; // ID rezervacije
    const { korisnik, instruktor, usluga, datum } = req.body; // Novi podaci za rezervaciju
  
    try {
      const updatedReservation = await updateReservation(Number(id), {
        korisnik,
        instruktor,
        usluga,
        datum,
      });
  
      if (!updatedReservation) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
  
      res.status(200).json(updatedReservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Brisanje rezervacije
  const deleteReservationHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedReservation = await deleteReservation(Number(id));
      if (!deletedReservation) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
      res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getReservations,
    getReservation,
    createReservation,
    updateReservationHandler,
    deleteReservationHandler,
  };
  