import cluster from 'cluster';
import os from 'os';
import express from 'express';
import bodyParser from 'body-parser';
import { initKafka, sendMessage } from './producer.js';

const numCPUs = os.cpus().length;

const app = express();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    await sendMessage("order", "Receive a new order", 'order-1');
    res.status(200).send({ status: 'Message sent' });
});

// Global Error Handler (Prevents Server Crash)
app.use((err, req, res, next) => {
    console.error("Unexpected Error:", err);
    res.status(500).json({error: "Internal Server Error"});
});

if (cluster.isPrimary) {
    console.log(`Primary process running on PID: ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Backend server is running on port ${PORT}, PID: ${process.pid}`);
    });
}