
const express = require("express")
const User = require("../models/user.js")
const {createUserJwt} = require('../utils/tokens.js')
const security = require('../middleware/security.js')
const router = express.Router()

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.login(req.body)
    const token = createUserJwt(user)
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    const token = createUserJwt(user)
    return res.status(201).json({ user, token })
  } catch (err) {
    next(err)
  }
})


router.get("/me", security.requrireAuthUser, async (req,res,next) => {
  try{
    const {email} = res.locals.user
    const user = await User.fetchUserByEmail(email)
    const publicUser = await User.makeUserPublic(user)
    return res.status(200).json({user: publicUser})
  }catch(err){
    next(err)
  }
})

module.exports = router