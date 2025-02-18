const bcrypt = require("bcrypt"); // Dodano za hashiranje
const {
  fetchAllUsers,
  fetchUserById,
  createNewUser,
  modifyUser,
  removeUser,
  fetchUserByEmail,
  fetchUsersByRole,
} = require("../services/korisnik.service.js");

// Dohvaćanje svih korisnika
const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dodavanje novog korisnika
const createUser = async (req, res) => {
  try {
    const existingUser = await fetchUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const users = await fetchAllUsers();
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;

    // Hashiranje lozinke prije spremanja
    const salt = await bcrypt.genSalt(10);
    req.body.lozinka = await bcrypt.hash(req.body.lozinka, salt);

    const newUser = await createNewUser({ ...req.body, id: maxId + 1 });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ažuriranje korisnika
const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { lozinka, ...otherData } = req.body; // Odvajanje lozinke iz tijela zahtjeva

  try {
    const existingUser = await fetchUserByEmail(otherData.email);
    if (existingUser && existingUser.id !== Number(id)) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let hashedLozinka = lozinka;
    if (lozinka) {
      const salt = await bcrypt.genSalt(10);
      hashedLozinka = await bcrypt.hash(lozinka, salt);
    }

    const updatedUser = await modifyUser(Number(id), { ...otherData, lozinka: hashedLozinka });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Dohvaćanje korisnika po ID-u
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await fetchUserById(Number(id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Brisanje korisnika
const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await removeUser(Number(id));
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dohvaćanje svih korisnika s ulogom instruktora
const getInstructors = async (req, res) => {
  try {
    const instructors = await fetchUsersByRole("instruktor"); // Dohvati sve korisnike s ulogom "instruktor"
    res.status(200).json(instructors); // Vrati instruktore kao JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Vrati grešku ako postoji
  }
};
const getUsers = async (req, res) => {
  try {
    const korisniks = await fetchUsersByRole("korisnik"); // Dohvati sve korisnike s ulogom "instruktor"
    res.status(200).json(korisniks); // Vrati instruktore kao JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Vrati grešku ako postoji
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserHandler,
  deleteUserHandler,
  getInstructors,
  getUsers,
};
