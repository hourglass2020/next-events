import { MongoClient } from "mongodb";

const uri =
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

export async function connectDatabase() {
    const client = await MongoClient.connect(uri);
    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db("events");
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection, sort, find) {
    const db = client.db('events');

    const documents = await db
        .collection(collection)
        .find(find)
        .sort(sort)
        .toArray();

    return documents;
}