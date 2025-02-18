const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const kategorijaRoutes = require("./src/routes/kategorija.routes.js");
const uslugaRoutes = require("./src/routes/usluga.routes.js");
const korisnikRoutes = require("./src/routes/korisnik.routes.js");
const instruktorRoutes = require("./src/routes/instruktor.routes.js");
const rezervacijaRoutes = require("./src/routes/rezervacija.routes.js");
const authRoutes = require("./src/routes/auth.routes.js");
const emailRoutes = require('./src/routes/email.routes');
require("dotenv").config();

dotenv.config(); // Učitavanje .env varijabli

const app = express();

// Povezivanje s bazom
connectDB();
app.use(express.json());
// Postavljanje CORS-a
app.use(
    cors({
      origin: "http://localhost:4200", // Dozvoli zahtjeve s frontend domena
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Dozvoljene metode
      allowedHeaders: ["Content-Type", "Authorization"], // Dozvoljeni headeri
      credentials: true, // Ako je potrebno slati kolačiće ili autentifikaciju
    })
  );
  


// Rute
app.use('/api', emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/kategorije", kategorijaRoutes);
app.use("/api/usluge", uslugaRoutes);
app.use("/api/korisnici", korisnikRoutes);
app.use("/api/instruktori", instruktorRoutes);
app.use("/api/rezervacije", rezervacijaRoutes);

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
