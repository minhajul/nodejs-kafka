import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId: 'order-consumer',
    brokers: ['localhost:9093']
});

const consumer = kafka.consumer({groupId: 'order-group'});

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: 'order-topic', fromBeginning: true});

    await consumer.run({
        eachMessage: async ({message}) => {
            console.log('Order message:', message.value.toString());
        },
    });
};

run().catch(console.error);
