const express = require('express');
const router = express.Router();
const deliverableController = require('../controllers/deliverableController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', deliverableController.createDeliverable);
router.get('/project/:projectId', deliverableController.getDeliverablesByProject);
router.put('/:id', deliverableController.updateDeliverable);

module.exports = router;