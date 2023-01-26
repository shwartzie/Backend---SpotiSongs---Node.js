const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const {addReport, getReports, deleteReport,getReport, updateReport} = require('./report.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log,getReports)
router.get('/:id',getReport)
router.post('/', addReport)
router.put('/:id', updateReport)
router.delete('/:id', deleteReport)


module.exports = router