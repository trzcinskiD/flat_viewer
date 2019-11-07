const { Stitch, RemoteMongoClient } = require("mongodb-stitch-browser-sdk");

// Initialize the App Client
const client = Stitch.initializeDefaultAppClient("olxsearcher-sorfe");

// Get a MongoDB Service Client
const mongodb = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas-olxSearcher");

// Get a reference to the my database
const db = mongodb.db("olx");

module.exports = { db, client };
