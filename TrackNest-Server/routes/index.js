// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const clientRoutes = require('./clientRoutes');
const projectRoutes = require('./projectRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const deliverableRoutes = require('./deliverableRoutes');
const ticketRoutes = require('./ticketRoutes');
// const updateRoutes = require('./updateRoutes');

router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/projects', projectRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/deliverables', deliverableRoutes);
router.use('/tickets', ticketRoutes);
// router.use('/updates', updateRoutes);

module.exports = router;
