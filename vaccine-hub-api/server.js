const app = require("./app")

const cors = require("cors")

const morgan = require('morgan')

app.use(cors())

app.use(morgan("tiny"))


const { NotFoundError } = require("../utils/errors")

app.use(express.json())



app.use((req, res, next) => {


    return next(new NotFoundError())

})


app.use((err, req, res, next) => {


    const status = err.status

    const message = err.message

    return res.status(status).json({


        error : {message, status}
    })


})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`🚀 Server listening on port http://localhost:${port}`)
})