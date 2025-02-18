const Kategorija = require("../models/Kategorija.js");

// Dohvaćanje svih kategorija
const getAllCategories = async () => {
  return await Kategorija.find();
};

// Dohvaćanje kategorije po ID-u
const getCategoryById = async (id) => {
  return await Kategorija.findOne({ id }); // Traži prema `id`, a ne `_id`
};

// Dodavanje nove kategorije
const addCategory = async (categoryData) => {
  const newCategory = new Kategorija(categoryData);
  return await newCategory.save();
};

// Ažuriranje kategorije
const updateCategory = async (id, updatedData) => {
  return await Kategorija.findOneAndUpdate({ id }, updatedData, { new: true }); // Pretražuje prema polju `id`
};

// Brisanje kategorije
const deleteCategory = async (id) => {
  return await Kategorija.findOneAndDelete({ id }); // Pretražuje i briše prema `id` polju
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
