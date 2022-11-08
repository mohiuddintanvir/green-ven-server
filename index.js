const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());

// mongodb connection



const uri = `mongodb+srv://${process.env.Db_user}:${process.env.Db_PASSWORD}@cluster0.oczpomj.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});







app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`going to run my kingdom in ${port}`)
})


