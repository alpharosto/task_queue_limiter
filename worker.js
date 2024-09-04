const redisClient = require('./utils/redisClient');

const processTasks = async () => {
    try {
        if (!redisClient.isOpen) {
            console.error('Redis client is not open');
            return;
        }
        const keys = await redisClient.keys('task:*');
        for (let key of keys) {
            console.log(`Processing task: ${key}`);
        
        }
    } catch (error) {
        console.error('Error processing tasks:', error);
    }
};

setInterval(processTasks, 1000);
