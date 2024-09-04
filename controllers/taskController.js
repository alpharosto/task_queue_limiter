const redisClient = require('../utils/redisClient');
const winston = require('winston');
const fs = require('fs');



const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'task_completion.log' }) 
    ]
});

const queueTask = (userId, task) => {
    redisClient.rpush(`queue:${userId}`, JSON.stringify(task));
};
const processQueue = async (userId) => {
    redisClient.lpop(`queue:${userId}`, (err, task) => {
        if (task) {
            const taskObj = JSON.parse(task);
            logTaskCompletion(userId, taskObj);
        }
    });
};

const logTaskCompletion = (userId, task) => {
    const logEntry = `${new Date().toISOString()} - User ${userId} completed task ${task.id}\n`;
    fs.appendFileSync('task_completion.log', logEntry);
};


const handleTaskRequest = (req, res) => {
    const { userId, task } = req.body;
    queueTask(userId, task);
    res.status(200).send('Task received and queued');
};

module.exports = {
    handleTaskRequest,
    processQueue
};


