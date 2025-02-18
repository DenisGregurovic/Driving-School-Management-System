const mongoose = require("mongoose");
const { Schema } = mongoose;
const setIdMiddleware = require("../middlewares/setIdMiddleware.js");

const rezervacijaSchema = new Schema(
  {
    id: { type: Number, unique: true }, // Automatski generiran ID
    korisnik: { type: Number, ref: "Korisnik", required: true }, // ID korisnika
    instruktor: { type: Number, ref: "Instruktor", required: true }, // ID instruktora
    usluga: { type: Number, ref: "Usluga", required: true }, // ID usluge
    datum: { type: Date, required: true }, // Datum i vrijeme rezervacije
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
rezervacijaSchema.pre("save", setIdMiddleware);

module.exports = mongoose.model("Rezervacija", rezervacijaSchema);
