var express = require('express');
var router = express.Router();

/* Play as yellow SPY */
router.get('/', function(req, res, next) {
    res.render('Master');
});

module.exports = router;