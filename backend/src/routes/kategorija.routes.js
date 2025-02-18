const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("../controllers/kategorija.controller.js");

const router = express.Router();

router.get("/", getCategories); // Dohvaćanje svih kategorija
router.get("/:id", getCategory); // Dohvaćanje kategorije po ID-u
router.post("/", createCategory); // Dodavanje nove kategorije
router.put("/:id", updateCategoryHandler); // Ažuriranje kategorije
router.delete("/:id", deleteCategoryHandler); // Brisanje kategorije

module.exports = router;
