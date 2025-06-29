import express from 'express';
import {produceEvent} from "../producer.js";

const router = express.Router();

router.get('/create-order', async (req, res) => {
    try {
        await produceEvent('order-topic', 'order-key', 'Order is completed');

        return res.status(200).json({
            status: 'ok',
            data: "Order has been created."
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
})

router.get('/create-payment', async (req, res) => {
    try {
        await produceEvent('payment-topic', 'payment-key', 'Payment is completed');

        return res.status(200).json({
            status: 'ok',
            data: "Payment has been created."
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
})

export default router;