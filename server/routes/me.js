const router = require('express-promise-router').default();
const graph = require('../graph');

router.get('/', async function(req, res) {
	const id = Object.keys(req.app.locals.cache.users)[0]; // a bit hacky? Assumes one user; TODO: Can I log in multiple?
	if(id) {
		const user = await graph.getUserDetails(req.app.locals.cache.msalClient, id);
		console.log(req.app.locals.cache.msalClient.getTokenCache());
		res.status(200).send(user);
	}
	else {
		res.status(404).send({});
	}
});

module.exports = router;