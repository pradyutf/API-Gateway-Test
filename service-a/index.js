const express = require('express');
const app = express();
const amqp = require('amqplib');

// Send message to RabbitMQ on each request to /service1
app.get('/service1', async (req, res) => {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        const queue = 'test_queue';

        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from('Message from Service 1'));

        console.log('Message sent to queue');
        res.send('Response from Service 1');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send message');
    }
});

app.listen(3001, () => {
    console.log('Service 1 running on port 3001');
});
