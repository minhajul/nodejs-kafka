import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId: 'test-consumer',
    brokers: ['localhost:9093'],
});

const consumer = kafka.consumer({groupId: 'test-group'});

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: 'order-1', fromBeginning: true});

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log(`[${partition}] ${message.key?.toString()}: ${message.value.toString()}`);
        },
    });
};

run().catch(console.error);
