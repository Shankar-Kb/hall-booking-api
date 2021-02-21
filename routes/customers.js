var express = require('express');
var router = express.Router();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
//const dbUrl = "mongodb+srv://ShankarKb:mongodb@cluster0.w8xxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbUrl = "mongodb://localhost:27017";
const dbName = "roomsDatabase";
const collName = "customers";

router.get("/customers", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let customers = await db.collection(collName).find().toArray();
        client.close();
        res.json(customers);
       
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
 })

 router.post("/book-room", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        
        let room = await db.collection("rooms").findOne({bookedStatus: false});
        
        let count = await db.collection(collName).find().toArray();
        let customer = await db.collection(collName).insertOne({
            customerName: req.body.customerName,
            roomName: room.roomName,
            date: new Date(),
            hoursBooked: req.body.hours,
            id: count.length + 1
        });
        
        await db.collection("rooms").updateOne({roomName: room.roomName},{ $set: {customerName: customer.customerName, bookedStatus: true}});
        
        client.close();
        res.json({
                id: customer.insertedId,
                message: `Room has been booked.`
            })
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
})

router.delete("/customer/:id", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        let customer = await db.collection(coll).findOneAndDelete({_id:id});
        client.close();
        res.json(customer);
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
 })
 
 module.exports = router;
