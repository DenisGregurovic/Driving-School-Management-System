const mongoose = require("mongoose");
const { Schema } = mongoose;
const setIdMiddleware = require("../middlewares/setIdMiddleware.js");

const uslugaSchema = new Schema(
  {
    id: { type: Number, unique: true }, // Automatski generiramo jedinstveni broj
    ime: { type: String, required: true },
    opis: { type: String, required: true },
    cijena: { type: Number, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id; // Uklanja `_id` iz odgovora
      },
    },
  }
);

// Koristi izdvojeni middleware za automatski ID
uslugaSchema.pre("save", setIdMiddleware);

module.exports = mongoose.model("Usluga", uslugaSchema);
