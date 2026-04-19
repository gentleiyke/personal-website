import express from "express"
import Message from "../models/Message.js"

import auth from "../middleware/auth.js"

const router = express.Router()


router.get("/messages", auth, async (req, res) => {

const messages = await Message.find().sort({ createdAt: -1 })

res.json(messages)

})


router.post("/", async (req, res) => {

try {

const { name, email, message } = req.body

if (!name || !email || !message) {

return res.status(400).json({
error: "All fields are required"
})

}

const newMessage = new Message({
name,
email,
message
})

await newMessage.save()

res.json({
success: true,
message: "Message saved successfully"
})

}

catch (error) {

res.status(500).json({
error: "Server error"
})

}

})

export default router