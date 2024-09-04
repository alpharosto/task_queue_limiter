const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('../utils/redisClient');


const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 20, 
    duration: 60, 
    keyPrefix: 'rateLimiter',
});

module.exports = async (req, res, next) => {
    try {
        await rateLimiter.consume(req.body.userId, 1);
        next();
    } catch (rejRes) {
        res.status(401).send('exceeds request');
    }
};
