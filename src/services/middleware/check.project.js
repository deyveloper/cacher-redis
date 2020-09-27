const projectsService = require('../projects.service');


const checkProjectMDW = (req, res, next) => {
    const ACTION = {
        project: req.params.project,
        projectKey: req.body.projectKey,
        projectAction: req.body.projectAction,
        shortIt: req.body.shortIt
    };

    if (!(ACTION.project in projectsService)) return res.status(403).json({ error: true, message: 'Access denied.' });
    if ((ACTION.projectKey != projectsService[ACTION.project].key)) return res.status(403).json({ error: true, message: 'Access denied.' });

    req.params.ACTION = ACTION;
    next();
};


module.exports = checkProjectMDW;