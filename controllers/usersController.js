const model = require('../models/userSchema')

// Read //
const getUserById = async (req, res) => {
  // Invalid ID Parameter
  if (!req?.params?.id) {
    return res.status(400).json({ message: 'ID parameter required!'})
  }
  // No ID
  const user = await model.findOne({ _id: req.params.id }).exec()
  if (!user) {
    return res.status(204).json({ message: 'No such user exists!'})
  }
  // Return Data
  return res.json(user)
}

const getUsers = async (req, res) => {
  const users = await model.find()
  // No Users
  if (!users) {
    return res.status(204).json({ message: 'No users found!'})
  }
  // Return Data
  return res.json(users)
}

// Write //
const createNewUser = async (req, res) => {
  // Check username
  if (!req?.body?.username) {
    return res.status(400).json({ message: 'username required!'})
  }
  // Create user data
  try {
    const result = await model.create({
      username: req.body.username
    })
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
  }
}

// Update //
const updateUser = async (req, res) => {
  // Check ID in request
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter required'})
  }
  // Find user by ID
  const user = await model.findOne({ _id: req.body.id }).exec()
  // No User Exists
  if (!user) {
    return res.status(204).json({ message: `No user with ID: ${req.body.id}`})
  }
  // Set firstname & lastname
  if (req?.body?.username) user.username = req.body.username
  // Return Data
  const result = await user.save()
  res.json(result)
}

// Delete //
const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'Id Parameter required!'})
  }
  // Find user by ID
  const user = await model.findOne({ _id: req.body.id }).exec()
  // No User Exists
  if (!user) {
    return res.status(204).json({ message: `No user with ID: ${req.body.id}`})
  }
  // Return Data
  const result = await user.deleteOne({ _id: req.body.id })
  res.json(result)
}



module.exports = {
  getUserById,
  getUsers,
  createNewUser,
  updateUser,
  deleteUser
}