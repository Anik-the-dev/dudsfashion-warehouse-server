const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const objectId =  require('mongodb').ObjectId


var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;


// mongo Database Atlas connection.........

const uri = `mongodb+srv://dusfashionspanik22:nVsYiJb8cybBLCvT@cluster0.k6gvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    
    
    try {
        
        await client.connect();
        console.log(`Connection establish21`)
        const database = client.db('dudfashion').collection('inventoryItems-Dress');

        // get data from mongo db
        app.get('/users', async (req, res)=>{
            const query = {}
            const cursor = database.find(query)
            const usersdb = await cursor.toArray()
            res.send(usersdb)
        })
        
        // get data by filtering Query..........
        app.get('/myitem', async (req, res)=>{
            const email = req.query.email
            const query = {email:email}
            const cursor = database.find(query)
            const filter = await cursor.toArray()
            res.send(filter)
        })

        // get data via params
        app.get('/users/:id', async (req, res)=>{
            const id = req.params.id
            console.log("id",id)
            const query = {_id: objectId(id)}
            const cursor = database.find(query)
            const usersdb = await cursor.toArray()
            res.send(usersdb)
        })


        // post data to Mongo DB
        app.post('/users', async(req,res)=>{
            const product = req.body
            const result = await database.insertOne(product)
            console.log(`Product Added! ${result.insertedId}`)
            res.send({ack: "successfully add product to Server"})
        })

    } finally {
        // await client.close()
    }

}
run().catch(console.dir);

app.listen(port, () => {
    console.log("Look mama, Anik Listening 5000")
})