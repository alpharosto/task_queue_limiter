const {createClient } = require('redis')
const {parseurl} = require('parseurl');


const redisClient = createClient({
    //url: 'redis-15275.c9.us-east-1-2.ec2.redns.redis-cloud.com:15275'
    password: '1YmBOyGi7RrVmqlZqZdFlePfiDXOZzCi',
    socket: {
        host: 'redis-15275.c9.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15275
    }
});

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

module.exports = redisClient;