// -------------  Mongo connection in starter files -----------------------------
// Heroku Err: "TypeError: Cannot read properties of undefined (reading 'db')" referencing "db = client.db('myproject');"
// Works locally
// removed local host connection from url, got Err: "Cannot read properties of undefined (reading 'db')" - cannot connect to Atlas?
// Err: "UnhandledPromiseRejectionWarning: ReferenceError: client is not defined" - replaced mongo def with w3 version
// Err: "UnhandledPromiseRejectionWarning: MongoError: MongoClient must be connected before calling MongoClient.prototype.db"
// Removed "db = client.db('myproject');" from db calls - errors stopped but still only works locally
// Removed local host from uri: "TypeError: Cannot read property 'db' of undefined"

// const MongoClient = require('mongodb').MongoClient;
// const url         = process.env.REACT_APP_MONGO_URI?process.env.REACT_APP_MONGO_URI:'mongodb://localhost:27017';
// let db            = null;

const { MongoClient } = require('mongodb');

const uri = process.env.REACT_APP_MONGO_URI?process.env.REACT_APP_MONGO_URI:'mongodb://localhost:27017';
const client = new MongoClient(uri);

// connect to mongo
MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
    //console.log(db);
});

// // ---------------  Mongo connection in Atlas - MongoDB Driver "Connect to BankingCluster" ----------
// // Err: "MongoNetworkError: failed to connect to server [localhost:27017] on first connect [Error: connect ECONNREFUSED 127.0.0.1:27017"
// // Err: "ReferenceError: db is not defined" in async functions with "const customers = db" - added db variable, got following error
// // Err: "MongoError: MongoClient must be connected before calling MongoClient.prototype.db" - gave client var to run function, no change
// // Made sure all IP addresses are whitelisted
// // Updated connection uri in .env to new password - no change
// // Added uri directly into dal code to test if it's an .env connection issue - no change
// // Removed localhost option: "Err: MongoParseError: URI malformed, cannot be parsed"
// // Readded localhost, error on Create Account: "TypeError: Failed to fetch"
// // Updated node version to 14.17.3 and added "engines" to package.json - "ReferenceError: db is not defined"

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.REACT_APP_MONGO_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("myproject").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// // -------------  Mongo connection from mongoDB.github -----------------------------
// // Err: "TypeError: Cannot read properties of undefined (reading 'open')"
// // Added .prototype to mongoClient calls - no change

// var MongoClient = require('mongodb').MongoClient
//   , Server = require('mongodb').Server;

// var mongoClient = new MongoClient(new Server('localhost', 27017));
// mongoClient.prototype.open(function(err, mongoClient) {
//   var db = mongoClient.db("myproject");

//   mongoClient.prototype.close();
// });

// // -------------  Mongo connection from mongoDB community forum on malformed URI -----------------------------
// // link: https://www.mongodb.com/community/forums/t/mongoparseerror-uri-malformed-cannot-be-parsed-2-apis-one-works-other-one-not/202136
// // Err: "MongooseError: Mongoose.prototype.connect() no longer accepts a callback"

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.REACT_APP_MONGO_URI, (err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log("API no error is connected");
//         application.listen(process.env.PORT, () => {
//             console.log("App listening on port: " )
//         })
//     }
// });

// // -------------  Mongo connection from w3schools -----------------------------
// // Converted "require" to ES module "import" - Err: "Cannot use import statement outside a module"
// // Changed back to require - Err: SyntaxError: Unexpected token 'export' at bottom of page
// // Changed export to module.exports - no errors but keeps console logging test object
// // Err: "UnhandledPromiseRejectionWarning: ReferenceError: db is not defined" and fetch failed in browser
// // Added "const db = client.db('myproject');" to every db call - Err: "UnhandledPromiseRejectionWarning: MongoError: pool destroyed" "UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode)", failed to fetch

// const { MongoClient } = require('mongodb');

// const uri = process.env.REACT_APP_MONGO_URI?process.env.REACT_APP_MONGO_URI:'mongodb://localhost:27017';
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     const db = client.db('myproject');
//     const collection = db.collection('users');

//     // Find the first document in the collection
//     const first = await collection.findOne();
//     console.log(first);
//   } finally {
//     // Close the database connection when finished or an error occurs
//     await client.close();
//   }
// }
// run().catch(console.error);


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
        const db = client.db('myproject');
        const customers = db
        .collection('users')
        .find({})
        .toArray(function(err,docs) {
            err ? reject(err) : resolve(docs);
        });
    })
}


//export default { create, findOne, find, update, all };
module.exports = { create, findOne, find, update, all };