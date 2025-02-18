const mongoose = require("mongoose");
const { Schema } = mongoose;

const instruktorSchema = new Schema(
  {
    korisnik: { type: Number, ref: "Korisnik", required: true }, // Povezivanje prema numeričkom `id` korisnika
    kategorije: { type: [String], required: true }, // Kategorije koje instruktor nudi
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

module.exports = mongoose.model("Instruktor", instruktorSchema);
