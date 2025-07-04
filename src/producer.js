import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:9093']
});

const producer = kafka.producer();

export const initKafka = async () => {
    await producer.connect();
};

export const produceEvent = async (topic, key, value) => {
    await initKafka();

    await producer.send({
        topic,
        messages: [{key, value}],
    });
};
