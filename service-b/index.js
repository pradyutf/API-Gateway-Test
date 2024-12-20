const express = require('express');
const app = express();

app.get('/service2', (req, res) => {
  res.send('Response from Service 2');
});

app.listen(3002, () => {
  console.log('Service 2 running on port 3002');
});


const amqp = require('amqplib');

async function consumeFromQueue() {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'test_queue';

    await channel.assertQueue(queue);
    console.log('Waiting for messages...');
    channel.consume(queue, (msg) => {
        console.log('Received:', msg.content.toString());
        channel.ack(msg);
    });
}

consumeFromQueue();
