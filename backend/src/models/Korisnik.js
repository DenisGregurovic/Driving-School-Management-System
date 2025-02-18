const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const setIdMiddleware = require("../middlewares/setIdMiddleware.js");

const korisnikSchema = new Schema(
  {
    id: { type: Number, unique: true }, // Automatski generirani broj
    ime: { type: String, required: true },
    prezime: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lozinka: { type: String, required: true },
    razina_prava: {
      type: String,
      required: true,
      enum: ["admin", "korisnik", "instruktor"],
    },
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

// Middleware za automatsko postavljanje `id` vrednosti
korisnikSchema.pre("save", setIdMiddleware);

// Middleware za hashiranje lozinke pre čuvanja
korisnikSchema.pre("save", async function (next) {
  if (this.isModified("lozinka")) {
    try {
      const salt = await bcrypt.genSalt(10); // Generiše salt
      this.lozinka = await bcrypt.hash(this.lozinka, salt); // Hashira lozinku
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Korisnik", korisnikSchema);
