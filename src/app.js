import express from 'express';
import bodyParser from 'body-parser';
import {sendMessage} from './producer.js';

const app = express();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    await sendMessage("test-topic", 'test-key', "Test message");
    res.status(200).send({status: 'Message sent'});
});

// Global Error Handler (Prevents Server Crash)
app.use((err, req, res, next) => {
    console.error("Unexpected Error:", err);
    res.status(500).json({error: "Internal Server Error"});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}, PID: ${process.pid}`);
});