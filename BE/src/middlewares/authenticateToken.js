const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token not provided' })
  }

  try {
    const decoded = jwt.verify(token, 'MYserCRETKey')
    req.decodedToken = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token has expired' })
    }
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

module.exports = { authenticateToken, cookieParser }
