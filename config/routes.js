const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbHelpers');
const secret = require('../auth/secrets').jwtSecret;
const jwt = require("jsonwebtoken");

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const generateToken = (user, secret) => {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
};

async function register(req, res) {
  // implement user registration
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "You must have a username and password to register a user" })
  const hash = bcrypt.hashSync(password, 8);
  req.body.password = hash;
  try {
    const newUserId = await db.addUser(req.body);
    const newUser = await db.findBy({ id: newUserId[0] }).first();
    const newUserWithoutPassword = {
      id: newUser.id,
      username: newUser.username
    }
    res.status(201).json(newUserWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "We could not register a user at this time" })
  }
}


async function login(req, res) {
  // implement user login
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "You must have a username and password to register a user" });
  try {
    const user = await db.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user, secret);
      return res.status(200).json({ message: 'Logged In', token })
    }
    else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: "We could not log you in at this time" })
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
