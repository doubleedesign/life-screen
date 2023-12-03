import Router from 'express-promise-router';
import { ResponseCode } from '../responses';
const router = Router();


/**
 * Get user summary
 */
router.get('/', async function(req, res) {
	res.status(ResponseCode.NotImplemented).json('Feature not yet implemented');
});


/**
 * Get all the user's calendars
 */
router.get('/calendars', async function (req, res) {
	res.status(ResponseCode.NotImplemented).json('Feature not yet implemented');
});


/**
 * Get upcoming events from a specific calendar by its ID
 */
router.get('/:calendarId', async function (req, res) {
	res.status(ResponseCode.NotImplemented).json('Feature not yet implemented');
});

export default router;
