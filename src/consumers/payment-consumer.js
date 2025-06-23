import { Kafka } from 'kafkajs';

const kafka = new Kafka({ clientId: 'payment-consumer', brokers: ['localhost:9093'] });
const consumer = kafka.consumer({ groupId: 'payment-group' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'payment-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log('🛒 Payment message:', message.value.toString());
        },
    });
};

run().catch(console.error);