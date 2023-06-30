
const {NotFoundError,BadRequestError} = require('./utils/errors')
const cors = require('cors')
const {PORT} = require('./config')
const express = require('express')
const morgan  = require('morgan')
const authRoutes = require('./routes/auth')


const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())



app.use('/auth',authRoutes)

app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })

app.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error : {message,status},
    })
})

app.use((req,res,next) => {
    return next(new NotFoundError())
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
