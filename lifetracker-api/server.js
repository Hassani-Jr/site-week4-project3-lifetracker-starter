
const {NotFoundError,BadRequestError} = require('./utils/errors')
const cors = require('cors')
const {PORT} = require('./config')
const express = require('express')
const morgan  = require('morgan')
const authRoutes = require('./routes/auth')
const security = require('./middleware/security')


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
//for every req check if a token exist
//if it does add the decoded user to res.local
app.use(security.extractUserFromJwt)




app.use('/auth',authRoutes)

app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })
  
app.use((req,res,next) => {
    return next(new NotFoundError())
})

app.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error : {message,status},
    })
})



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
