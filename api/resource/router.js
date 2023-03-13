// build your `/api/resources` router here
const express = require('express');
const Resource = require('./model');
const router = express.Router();

router.get('/', (req, res, next) => {
    Resource.getResources()
        .then(resource => {
            res.status(200).json(resource);
        })
        .catch(next)
})

router.post('/', async (req, res, next) => {
    try {
        const newResource = await Resource.createResource(req.body);
        res.status(201).json(newResource);
    } catch(err) {
        next(err);
    }
})

module.exports = router;