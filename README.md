# Kafka Node.js App with Docker

This project demonstrates a basic Node.js application integrating with Apache Kafka using Docker.

## Prerequisites

- Docker and Docker Compose
- Node.js and npm

## Setup and Run

1.  **Clone the repository:**

```bash
git clone https://github.com/minhajul/nodejs-kafka
cd nodejs-kafka
```

2.  **Start Kafka, Zookeeper and Kafka UI using Docker Compose:**

To spin up the required Kafka infrastructure using Docker Compose, run:
```bash
docker-compose up -d
```

This command will start the following services in detached mode:
- **Zookeeper** – coordinates and manages Kafka brokers
- **Kafka** – the distributed event streaming platform
- **Kafka UI** – a web-based user interface to inspect topics, messages, and consumers

You can access Kafka UI at: http://localhost:8080 (or your configured port)

3.  **Install Node.js dependencies:**

```bash
npm install
```

4.  **Run the server:**

```bash
npm run dev
```

This will launch the Express application and expose two API routes for producing events to Kafka topics:

| Endpoint                  | Description              | Kafka Topic     |
|---------------------------| ------------------------ | --------------- |
| `GET /api/create-order`   | Produces an order event  | `order-topic`   |
| `GET /api/create-payment` | Produces a payment event | `payment-topic` |

Each endpoint sends a structured message to its corresponding Kafka topic using KafkaJS.

5.  **Run the Kafka consumer (in a separate terminal):**

```bash
npm run start:consumers
```

This will start consuming order and payment from the `order-topic` and `payment-topic` and log them to the console.

### Made with ❤️ by [[minhajul](https://github.com/minhajul)]
