const express = require('express');
const app = express();

app.get('/service1', (req, res) => {
  res.send('Response from Service 1');
});

app.listen(3001, () => {
  console.log('Service 1 running on port 3001');
});


const amqp = require('amqplib');

async function sendToQueue() {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'test_queue';

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from('Message from Service 1'));

    console.log('Message sent to queue');
}

sendToQueue();
