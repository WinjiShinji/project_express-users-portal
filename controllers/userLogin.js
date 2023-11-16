const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const userLogin = async (req, res) => {
  if (!req?.body?.username || !req?.body?.password) {
    return res.status(400).json({ message: 'username and password parameters are required!'})
  }
  const username = req?.body?.username
  const password = req?.body?.password

  // Check username exists //
  const validUser = await User.findOne({ username: username}).exec()
  if (!validUser) {
    return res.status(401).json({ message: 'unauthorized!'})
  }

  // Check password is a match //
  const validPass = await bcrypt.compare(password, validUser.password)
  if (!validPass) {
    return res.status(401).json({ message: 'unauthorized!'})
  }

  if (validPass) {
    try {
      // Create JWT access token //
      const accessToken = JWT.sign({
        // Payload //
        "UserInfo": {
          "username": validUser.username,
          "roles": validUser.roles
        },
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "900s" }    
      )
      
      // Create JWT refresh token //
      const refreshToken = JWT.sign({
        // Payload //
        "username": validUser.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d"}
      )
      
      // Save JWT refresh token //
      validUser.refreshToken = refreshToken
      await validUser.save()

      // Send JWT to Front-End //
      res.cookie('jwt', refreshToken, {
        httpOnly: true, 
        sameSite: 'None', secure: true, // @FIX: CORS
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ accessToken })
      
    } catch (error) {
      console.error(error)
    }
  } else {
    return res.sendStatus(401)
  }
}
  
module.exports = userLogin