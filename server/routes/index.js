const express = require('express');
const router = express.Router();

router.get('/', async function (req, res, next) {
	res.send('Silence is golden');
});

module.exports = router;
