const express = require('express');
const cors = require('cors');
require('colors')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

// middle wares
app.use(cors())
app.use(express.json())





app.get('/', (req, res) => {
    res.send('my server is running')
})

app.listen(port, () => console.log(`server running on port: ${port}`.cyan))