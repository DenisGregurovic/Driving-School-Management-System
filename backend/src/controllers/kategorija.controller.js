const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../services/kategorija.service.js");

// Dohvaćanje svih kategorija
const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dohvaćanje kategorije po ID-u
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(Number(id)); // Pretvori ID u broj
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dodavanje nove kategorije
const createCategory = async (req, res) => {
  try {
    const newCategory = await addCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error in createCategory:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Ažuriranje kategorije
const updateCategoryHandler = async (req, res) => {
  const { id } = req.params; // Preuzima ID iz parametara rute
  try {
    const updatedCategory = await updateCategory(Number(id), req.body); // Pretvara ID u broj
    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Brisanje kategorije
const deleteCategoryHandler = async (req, res) => {
  const { id } = req.params; // Preuzima ID iz parametara
  try {
    const deletedCategory = await deleteCategory(Number(id)); // Pretvara ID u broj
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategoryHandler,
  deleteCategoryHandler,
};
