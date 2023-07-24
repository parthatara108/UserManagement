require('dotenv').config()
const express = require('express')
const server = express()
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/UserRoutes')

server.use(cors({
    exposedHeaders: ['X-Total-Count']
}))
server.use(express.json())
server.use('/user', userRoutes.router)

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected");
}

server.listen(process.env.PORT, () => {
    console.log('server started');
})