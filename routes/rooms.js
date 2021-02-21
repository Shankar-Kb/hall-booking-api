var express = require('express');
var router = express.Router();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
//const dbUrl = "mongodb+srv://ShankarKb:mongodb@cluster0.w8xxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbUrl = "mongodb://localhost:27017"
const dbName = "roomsDatabase";
const collName = "rooms";


router.get("/rooms", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let rooms = await db.collection(collName).find().toArray();
        client.close();
        res.json(rooms);
       
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
 })

 router.post("/create-room", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let count = await db.collection(collName).find().toArray();
        let room = await db.collection(collName).insertOne({
            roomName: req.body.roomName,
            pricePerHour: 25,
            ameninties: ['Wifi', 'TV', 'AC'],
            bookedStatus: false,
            id: count.length + 1
        });
        client.close();
        res.json({
                id: room.insertedId,
                message: `Room has been created.`
            })
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
})

router.delete("/room/:id", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        let room = await db.collection(collName).findOneAndDelete({_id:id});
        client.close();
        res.json(room);
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
 })
 
 module.exports = router;