const mongoose = require("mongoose");
const { Schema } = mongoose;
const setIdMiddleware = require("../middlewares/setIdMiddleware.js");

const kategorijaSchema = new Schema(
  {
    id: { type: Number, unique: true }, // Automatski generirani ID
    ime: { type: String, required: true },
    opis: { type: String, required: true },
  },
  {
    versionKey: false, // Uklanja polje `__v`
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret.id; // Zadržavamo polje `id`
        delete ret._id; // Uklanjamo `_id` iz odgovora
      },
    },
  }
);

// Koristi izdvojeni middleware za postavljanje `id` vrijednosti
kategorijaSchema.pre("save", setIdMiddleware);

module.exports = mongoose.model("Kategorija", kategorijaSchema);
