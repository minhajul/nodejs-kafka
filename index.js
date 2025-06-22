import express from 'express';
import bodyParser from 'body-parser';
import { initKafka, sendMessage } from './producer.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    await sendMessage("order", "Receive a new order", 'order-1');
    res.status(200).send({ status: 'Message sent' });
});

// Start server after Kafka connects
app.listen(PORT, async () => {
    await initKafka();
    console.log(`Express server running on http://localhost:${PORT}`);
});
