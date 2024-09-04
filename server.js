const cluster = require('cluster');
const numCPUs = 2;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); 
    });
} else {
const express = require('express');
const rateLimiter = require('./middleware/rateLimiter');
const { handleTaskRequest, processQueue } = require('./controllers/taskController');
const redisClient = require('./utils/redisClient');

const app = express();
app.use(express.json());


app.use(rateLimiter);


app.post('/task', handleTaskRequest);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started`);
});

process.on('SIGINT', () => {
    redisClient.quit(() => {
        console.log('Redis client disconnected');
        process.exit(0);
    });

});
}
