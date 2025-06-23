import express from 'express';
import bodyParser from 'body-parser';
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.get('/health', (req, res) => res.status(200).send('OK'));
app.use('/api', eventRoutes);

// Global Error Handler (Prevents Server Crash)
app.use((err, req, res, next) => {
    console.error("Unexpected Error:", err);
    res.status(500).json({error: "Internal Server Error"});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}, PID: ${process.pid}`);
});