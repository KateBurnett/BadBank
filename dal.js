// // -------------  Mongo connection in starter files -----------------------------
// // Err: "TypeError: Cannot read properties of undefined (reading 'db')" referencing "db = client.db('myproject');"
// const MongoClient = require('mongodb').MongoClient;
// const url         = process.env.REACT_APP_MONGO_URI?process.env.REACT_APP_MONGO_URI:'mongodb://localhost:27017';
// let db            = null;
 
// // connect to mongo
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('myproject');
// });

// ---------------  Mongo connection in Atlas - MongoDB Driver "Connect to BankingCluster" ----------
// Err: "MongoNetworkError: failed to connect to server [localhost:27017] on first connect [Error: connect ECONNREFUSED 127.0.0.1:27017"
// Err: "ReferenceError: db is not defined" in async functions with "const customers = db" - added db variable, got following error
// Err: "MongoError: MongoClient must be connected before calling MongoClient.prototype.db" - gave client var to run function, no change
// All IP addresses are whitelisted
// Updated connection uri in .env to new password

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.REACT_APP_MONGO_URI?process.env.REACT_APP_MONGO_URI:'mongodb://localhost:27017';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

db = client.db('myproject');

async function run(client) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



// -------------- rest of code to update database, do not change-------------------
// create user account using the collection.insertOne function
function create(name, email, password) {
    return new Promise ((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve (doc);
        });
    })
}

// find user account 
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// return all users by using the collection.find method
function all() {
    // TODO: populate this function based off the video
    return new Promise((resolve, reject) => {
        const customers = db
        .collection('users')
        .find({})
        .toArray(function(err,docs) {
            err ? reject(err) : resolve(docs);
        });
    })
}


module.exports = { create, findOne, find, update, all };