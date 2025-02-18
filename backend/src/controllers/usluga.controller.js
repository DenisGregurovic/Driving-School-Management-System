const {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
} = require("../services/usluga.service.js");

// Dohvaćanje svih usluga
const getServices = async (req, res) => {
  try {
    const services = await getAllServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dohvaćanje usluge po ID-u
const getService = async (req, res) => {
  const { id } = req.params; // ID dolazi iz parametara rute
  try {
    const service = await getServiceById(Number(id)); // Pretvori ID u broj
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dodavanje nove usluge
const createService = async (req, res) => {
  try {
    const newService = await addService(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ažuriranje usluge
const updateServiceHandler = async (req, res) => {
  const { id } = req.params; // Preuzima ID iz parametara
  try {
    const updatedService = await updateService(Number(id), req.body); // Pretvara ID u broj
    if (!updatedService) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Brisanje usluge
const deleteServiceHandler = async (req, res) => {
  const { id } = req.params; // Preuzima ID iz parametara
  try {
    const deletedService = await deleteService(Number(id)); // Pretvara ID u broj
    if (!deletedService) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateServiceHandler,
  deleteServiceHandler,
};
