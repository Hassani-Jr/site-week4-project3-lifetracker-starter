
const express = require("express")
const User = require("../models/user.js")
const router = express.Router()

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.login(req.body)
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})


router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})

module.exports = router