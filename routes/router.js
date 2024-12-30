const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");


// register user

router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { name, email, age, number, work, address, desc } = req.body;

    if (!name || !email || !age || !number || !work || !address || !desc) {
        res.status(422).json("plz fill the data");
    }

    try {

        const preuser = await users.findOne({ email: email });
        console.log(preuser);

        if (preuser) {
            res.status(422).json("this is user is already present");
        } else {
            const adduser = new users({
                name, email, age, number, work, address, desc
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})

// get userdata

router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log('userdata from backend');
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the `id`
        console.log(`Request received to fetch user with ID: ${id}`);

        // Find user in the database
        const userindividual = await users.findById(id);

        if (!userindividual) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(`User data retrieved:`, userindividual);
        res.status(200).json(userindividual);
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


// update user data

router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateduser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuser = await users.findByIdAndDelete({ _id: id })
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

//filter api
router.get("/api/search", async (req, res) => {
    const query = req.query.q?.toLowerCase();
    console.log("serching ......");

    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
    }

    try {
        // Find users whose `name` or other fields match the query
        const filteredResults = await users.find({
            name: { $regex: query, $options: "i" } // Case-insensitive search
        });

        res.status(200).json({ results: filteredResults });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

module.exports = router;