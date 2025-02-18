const { login, register } = require("../services/auth.service.js");

const loginHandler = async (req, res) => {
  const { email, lozinka } = req.body;

  try {
    const { user, token } = await login(email, lozinka);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerHandler = async (req, res) => {
  try {
    const newUser = await register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginHandler, registerHandler };
