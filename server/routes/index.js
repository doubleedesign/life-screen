import Router from 'express-promise-router';
const router = Router();

router.get('/', function(req, res) {

	if(req.session.userId) {
		res.redirect('http://localhost:3000');
	}
	else {
		res.status(401).send(req.session);
	}
});


export default router;
