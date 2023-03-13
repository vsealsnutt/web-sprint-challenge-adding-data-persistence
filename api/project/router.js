// build your `/api/projects` router here
const express = require('express');
const Project = require('./model');
const router = express.Router();

router.get('/', (req, res, next) => {
    Project.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next)
}) 

router.post('/', async (req, res, next) => {
    try {
        const newProject = await Project.createProject(req.body);
        res.status(200).json({
            project_id: newProject.project_id,
            project_name: newProject.project_name,
            project_description: newProject.project_description,
            project_completed: newProject.project_completed === 0 ? false : true
        });
    } catch(err) {
        next(err);
    }
})

module.exports = router;