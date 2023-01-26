const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { getUser, getUsers, deleteUser, updateUser, logout, getUsersAndReports } = require('./user.controller.js');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/reports', getUsersAndReports);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.post('/', logout);

// router.put('/:id',  requireAuth, updateUser)
router.delete('/:id', deleteUser);

module.exports = router;