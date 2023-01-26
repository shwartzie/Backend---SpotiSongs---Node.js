const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
const utilService = require('../../services/util.service.js')
async function query(filterBy = {}) {
	try {
		const criteria = _buildCriteria(filterBy)
		const collection = await dbService.getCollection('report')
		const reports = await collection.find(criteria).toArray()
		// var reports = await collection.aggregate([
		//     {
		//         $match: criteria
		//     },
		//     {
		//         $lookup:
		//         {
		//             localField: 'byUserId',
		//             from: 'user',
		//             foreignField: '_id',
		//             as: 'byUser'
		//         }
		//     },
		//     {
		//         $unwind: '$byUser'
		//     },
		//     {
		//         $lookup:
		//         {
		//             localField: 'aboutUserId',
		//             from: 'user',
		//             foreignField: '_id',
		//             as: 'aboutUser'
		//         }
		//     },
		//     {
		//         $unwind: '$aboutUser'
		//     }
		// ]).toArray()
		// reports = reports.map(report => {
		//     report.byUser = { _id: report.byUser._id, fullname: report.byUser.fullname }
		//     report.aboutUser = { _id: report.aboutUser._id, fullname: report.aboutUser.fullname }
		//     delete report.byUserId
		//     delete report.aboutUserId
		//     return report
		// })
		return reports
	} catch (err) {
		logger.error('cannot find reports', err)
		throw err
	}
}

async function remove(reportId) {
	try {
		const store = asyncLocalStorage.getStore()
		const { loggedinUser } = store
		const collection = await dbService.getCollection('report')
		// remove only if user is owner/admin
		const criteria = { _id: ObjectId(reportId) }
		if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
		const { deletedCount } = await collection.deleteOne(criteria)
		return deletedCount
	} catch (err) {
		logger.error(`cannot remove report ${reportId}`, err)
		throw err
	}
}

async function update(report) {
	try {
		var id = ObjectId(report._id)
		delete report._id
		const collection = await dbService.getCollection('report')
		await collection.updateOne({ _id: id }, { $set: { ...report } })
		report._id = id
		return report
	} catch (err) {
		logger.error(`cannot update report ${report._id}`, err)
		throw err
	}
}

async function getReportsById(userId) {
	try {
		const collection = await dbService.getCollection('usersDemo')
		const report = collection.findOne({ _id: ObjectId(userId) })
		return report["reports"]
	} catch (err) {
		logger.error(`while finding report ${reportId}, err`)
		throw err
	}
}

async function addReport({loggedInUser,reportId,mood,reportedAt}) {
    try {
        const collection = await dbService.getCollection("usersDemo")

        
        loggedInUser?.reports.push({reportId,mood,reportedAt});

        await collection.updateOne({_id:ObjectId(loggedInUser._id)},{$set:{loggedInUser}})
        
        return loggedInUser
    } catch (err) {
        logger.error("cannot update reports", err)
        throw err
    }
}

function _buildCriteria(filterBy) {
	const criteria = {}
	if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
	return criteria
}



module.exports = {
	query,
	remove,
	update,
    addReport
}
