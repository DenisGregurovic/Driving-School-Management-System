const Usluga = require("../models/Usluga.js");

// Dohvaćanje svih usluga
const getAllServices = async () => {
  return await Usluga.find();
};

// Dohvaćanje usluge po ID-u
const getServiceById = async (id) => {
  return await Usluga.findOne({ id }); // Pretražuje po našem `id` polju, ne `_id`
};

// Dodavanje nove usluge
const addService = async (serviceData) => {
  const newService = new Usluga(serviceData);
  return await newService.save();
};

// Ažuriranje usluge
const updateService = async (id, updatedData) => {
  return await Usluga.findOneAndUpdate({ id }, updatedData, { new: true }); // Ažurira prema `id` polju
};
// Brisanje usluge
const deleteService = async (id) => {
  return await Usluga.findOneAndDelete({ id }); // Briše prema `id` polju
};

module.exports = {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
};
