const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "Pristup odbijen. Token nije dostavljen." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Dekodirani podaci iz tokena
    next();
  } catch (error) {
    res.status(403).json({ error: "Neispravan ili istekao token." });
  }
};

module.exports = verifyToken;
