// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
// router.use(authMiddleware);

// CRUD operations
router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/stats', projectController.getProjectStats);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Additional routes
router.get('/client/:clientId', projectController.getProjectsByClient);

module.exports = router;
