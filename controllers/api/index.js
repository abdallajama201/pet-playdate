const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const eventRoutes = require('./eventRoutes');
const auth = require('./auth');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/events', eventRoutes);
router.use('/auth', auth);

module.exports = router;