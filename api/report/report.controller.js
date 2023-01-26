const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const reportService = require('./report.service')

const utilService = require('../../services/util.service.js')
async function getReports(req, res) {
    try {
        const reports = await reportService.query(req.query)
        res.send(reports)
    } catch (err) {
        logger.error('Cannot get reports', err)
        res.status(500).send({ err: 'Failed to get reports' })
    }
}
async function getReport(req, res) {
    try {
        const reportId = req.params.id
        const report = await reportService.getById(reportId)
        res.json(report)
    } catch (err) {
        logger.error('Failed to get report', err)
        res.status(500).send({ err: 'Failed to get report' })
    }
}


async function deleteReport(req, res) {
    try {
        const deletedCount = await reportService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove report' })
        }
    } catch (err) {
        logger.error('Failed to delete report', err)
        res.status(500).send({ err: 'Failed to delete report' })
    }
}


async function addReport(req, res) {
    const {loggedInUser,mood,reportedAt} = req.body
 
    try {
       
        const reportId = utilService.makeId(10) // need to check if not exist in database
        const user = await reportService.addReport({loggedInUser,reportId,mood,reportedAt})
       
    // socketService.broadcast({type: 'report-added', data: report, userId: loggedinUser._id.toString()})
    // socketService.emitToUser({type: 'report-about-you', data: report, userId: report.aboutUserId})
    // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send({user})

    } catch (err) {
        logger.error('Failed to add report', err)
        res.status(500).send({ err: 'Failed to add report' })
    }   
}

async function updateReport(req, res) {
    try {
      const report = req.body
      const updatedReport = await reportService.update(report)
      res.json(updatedReport)
    } catch (err) {
      logger.error("Failed to update report", err)
      res.status(500).send({ err: "Failed to update report" })
    }
  }

module.exports = {
    getReports,
    deleteReport,
    addReport,
    getReport,
    updateReport,
}