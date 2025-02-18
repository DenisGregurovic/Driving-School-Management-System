const mongoose = require("mongoose");

// Middleware za automatsko postavljanje `id` vrijednosti
const setIdMiddleware = async function (next) {
  if (this.id == null) {
    const modelName = this.constructor.modelName; // Dohvati ime trenutnog modela
    const count = await mongoose.model(modelName).countDocuments();
    this.id = count + 1; // Generiraj jedinstveni broj
  }
  next();
};

module.exports = setIdMiddleware;
