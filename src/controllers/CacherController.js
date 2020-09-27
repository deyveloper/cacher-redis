// Imports
const redisClient = require('../client/redis.db');
const snappy = require('snappy');


class CacherController {
    async init(req, res) {
        if (CacherController[req.params.ACTION.projectAction]) {
            const response = await CacherController[req.params.ACTION.projectAction](req, res);
            res.send(response);
        } else {
            res.sendStatus(503);
            console.error(`Undefined action named: ${req.params.ACTION.projectAction}`);
        }
    };

    static async getProjectHKeys(req, res) {
        const {
            project,
            shortIt
        } = req.params.ACTION;

        const data = await redisClient.hkeys(project);

        if(shortIt) return {
            error: false,
            data: snappy.compressSync(data),
            shortIt
        }
        return { error: false, data: await redisClient.hkeys(project) };
    };

    static async getProjectHData(req, res) {
        const {
            project,
            shortIt
        } = req.params.ACTION;

        const {
            dataKey
        } = req.body;

        if (!dataKey) return { error: true, errorCode: 'invalidDataKey' };

        const data = await redisClient.hget(project, dataKey);

        if (shortIt) return { 
            error: false,
            data: snappy.compressSync(data),
            key: dataKey,
            shortIt
        };
        return {
            error: false,
            data,
            key: dataKey
        };
    };

    static setProjectHData(req, res) {
        const {
            project
        } = req.params.ACTION;

        const {
            dataKey,
            dataValue,
            expire
        } = req.body;


        if (!dataKey) return { error: true, errorCode: 'invalidDataKey' };
        if (!dataValue) return { error: true, errorCode: 'invalidDataValue' };

        redisClient.hset(project, dataKey, dataValue);
        if (expire) redisClient.expire(project, expire);

        return { error: false, message: "Saved succesfuly.", key: dataKey };
    };

    static delProjectHData(req, res) {
        const {
            project
        } = req.params.ACTION;

        const {
            dataKey,
            allData
        } = req.body;

        if (allData) {
            redisClient.del(project);
        } else {
            if (!dataKey) return { error: true, errorCode: 'invalidDataKey' };
            redisClient.hdel(project, dataKey);
        };

        return { error: false, message: "Deleted succesfuly." };
    };
};


module.exports = new CacherController();