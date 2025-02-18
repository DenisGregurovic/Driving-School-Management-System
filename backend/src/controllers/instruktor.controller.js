const {
  getAllInstructors,
  getInstructorById,
  addInstructor,
  updateInstructorWithUser,
  deleteInstructor,
  getInstructorsUsers,
  deleteUser
} = require("../services/instruktor.service.js");

// Dohvaćanje svih instruktora
const getInstructors = async (req, res) => {
  try {
    const instructors = await getAllInstructors();
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dohvaćanje instruktora po ID-u
const getInstructor = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await getInstructorById(Number(id));
    if (!instructor) {
      res.status(404).json({ message: "Instructor not found" });
      return;
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dodavanje instruktora
const createInstructor = async (req, res) => {
  const { korisnik, kategorije } = req.body; // Očekuje se cijeli korisnik objekt
  try {
    const newInstruktor = await addInstructor({ korisnik: korisnik.id, kategorije });
    res.status(201).json(newInstruktor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Ažuriranje instruktora
const updateInstructorHandler = async (req, res) => {
  const { id } = req.params;
  const { kategorije, korisnik } = req.body;

  try {
    const updatedInstructor = await updateInstructorWithUser(Number(id), { kategorije }, korisnik);
    if (!updatedInstructor) {
      res.status(404).json({ message: "Instructor not found" });
      return;
    }
    res.status(200).json(updatedInstructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Brisanje instruktora
const deleteInstructorHandler = async (req, res) => {
  const { id } = req.params; // ID korisnika povezanog s instruktorom

  try {
    // Prvo brišemo instruktora
    const deletedInstructor = await deleteInstructor(Number(id));
    if (!deletedInstructor) {
      res.status(404).json({ message: "Instructor not found" });
      return;
    }

    // Zatim brišemo povezanog korisnika
    const deletedUser = await deleteUser(Number(id));
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Instructor and associated user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getInstructors,
  getInstructor,
  createInstructor,
  updateInstructorHandler,
  deleteInstructorHandler
};
