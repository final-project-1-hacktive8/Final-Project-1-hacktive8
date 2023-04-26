require('dotenv').config()
const jwt = require("jsonwebtoken")

const SECRET_KEY = "team8"

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY)
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

module.exports = {
  generateToken,
  verifyToken
}