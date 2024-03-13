var express = require('express');
var router = express.Router();

/* Launch an instanced game */
router.get('/', function(req, res, next) {
    res.render('game');
});

module.exports = router;