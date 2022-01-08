// Requiering express and initializing the app:
const app = require('express')();
// Requiering the cors middleware:
const cors = require('cors');
const res = require('express/lib/response');

const PORT = 5001 // We will use port 5001

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://hebaulf:mobster.matte.proviso.shriven.arty@cluster0.eukfe.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors()); // Telling express to use the cors middleware

app.get('/', (req, res) => { // Listen to a get request
    client.connect(async err => {
        const collection = client.db("test").collection("devices");
        // Perform actions on the collection object
        // Find everything in the collection and turn it into an array:
        const data = await collection.find().toArray();
        // Now we turn our data into a string and send it over to the client.
        // Remember that our data is an array of objects (in this case only one object) 
        // but JSON.stringify turns it into a string 
        res.send(JSON.stringify(data));
    });
});

app.listen(PORT, () => { // Listen to the port we chose above
    // Print to the console that the server is listening
    console.log("Listening to port: " + PORT);
});

