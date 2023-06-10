import express from 'express'
import { addHostnameToQueue, getDomainNameByHostname } from '../controllers/domain.controller'
import { requestParamValidator, validateHostname } from '../middlewares'
const router = express.Router()

router.route('/').post(validateHostname, addHostnameToQueue)
router.route('/:hostname').get(requestParamValidator, getDomainNameByHostname)
export default router
