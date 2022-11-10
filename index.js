const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());

// mongodb connection



const uri = `mongodb+srv://${process.env.Db_user}:${process.env.Db_PASSWORD}@cluster0.oczpomj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const serviceCollection = client.db('greenven').collection('services');



        // order get 
        const ordersCollection = client.db('greenven').collection('orders');


        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });




        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query);
            res.send(service)
        });

        app.post('/services', async (req, res) => {
            const order = req.body;
            const result = await serviceCollection.insertOne(order);
            res.send(result)

        })




        // orders api

        // C
        app.get('/orders', async (req, res) => {

            let query = {};
            if (req.query.email) {

                query = {
                    email: req.query.email

                }
            }

            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders)
        })
        //   R
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.send(result)

        })

        // U
        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await ordersCollection.findOne(query)
            res.send(user);
        })
        app.put('/orders/:id', async (req, res) => {
            const id = req.params.id;
            // const status = req.body.status
            const query = { _id: ObjectId(id) };
            const updateduser = req.body;
            console.log(updateduser)
            // const updateDoc = {
            //     $set: {
            //         status: status
            //     }
            // }
            // const result = await ordersCollection.updateOne(query, updateDoc)
            // res.send(result)
        })


        // d
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query)
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(err => console.error(err))






app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`going to run my kingdom in ${port}`)
})


