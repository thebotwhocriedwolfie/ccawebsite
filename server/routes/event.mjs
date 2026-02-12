import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//define special character function
function specialChar(name) {
    var operators = ['!','@','#','$','%',"^",'&','*','(',')','-','_','+','=','/'];

    for (var i = 0; i < name.length; i++) {
        if (operators.includes(name[i])) {
            return true; 
        }
    }

    return false; 
}

// This section will help you get a list of all the events.
router.get("/", async (req, res) => {
    let collection = await db.collection("events");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("events");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if(!result) res.send("Not found").status(400);
    else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
    try {
        // Validate input fields
        const { name, description, date } = req.body;
    
        if (!name || !description || !date) {
          return res.status(400).send("All fields are required.");
        }
    
        if (name.length > 80) {
          return res.status(400).send("Maximum length for name is 80 characters.");
        }
    
        if (specialChar(name)) { 
          return res.status(400).send("Name contains special characters. Use letters and spaces only.");
        }
        const selectedDate = new Date(date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Normalise time

        if (selectedDate < currentDate) {
            return res.status(400).json({ error: "Cannot create an event with a past date." });
        }
    
    let newDocument = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date
    };
    let collection = await db.collection("events");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
    } catch (error) {
    console.error("Error creating record !", error);
    return res.status(500).send("Internal server error");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date
        }
    };

    let collection = await db.collection("events");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id) };

    const collection = db.collection("events");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;