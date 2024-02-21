//login - alexandrita2010
//pass - jM3rjAn5N7V6qBZ0
//mongodb+srv://alexandrita2010:<password>@cluster0.pcndhts.mongodb.net/

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

//Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

mongoose.set('strictQuery', false);

// app.get('/', (req, res) => {
//     return res.json({message: 'All is fine'})
// })

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.pcndhts.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        )

        app.listen(PORT, () => console.log(`Server started on port : ${PORT}`))

    } catch (error) {
        console.log(error)
    }
}
start()