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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.o9jnfig.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        
        await client.connect()
        const servicesCollection = client.db("cakeHouse").collection('cakes')

        app.post('/cakes', async (req, res) => {
            const order = req.body;
            const result = await servicesCollection.insertOne(order);
            res.send(result);
        })

        app.get('/feature', async (req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor.limit(3).toArray()
            res.send(services)
        })

        app.get('/allServices', async (req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/product/:id', async (req, res) => {
            console.log()
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await servicesCollection.findOne(query)
            console.log(result)
            res.send(result)
        })

    } catch (error) {
        console.log(error.name.bgRed.bold, error.message) 
    }
}

run()

app.get('/', (req, res) => {
    res.send('my server is running')
})

app.listen(port, () => console.log(`server running on port: ${port}`.cyan))

module.exports = app;