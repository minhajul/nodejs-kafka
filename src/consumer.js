import {Kafka} from 'kafkajs';
import {sendMail} from "./resend.js";

const kafka = new Kafka({
    clientId: 'test-consumer',
    brokers: ['localhost:9093'],
});

const consumer = kafka.consumer({groupId: 'test-group'});

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: 'test-topic', fromBeginning: true});

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            await sendMail();

            console.log(`[${partition}] ${message.key?.toString()}: ${message.value.toString()}`);
        },
    });
};

run().catch(console.error);
