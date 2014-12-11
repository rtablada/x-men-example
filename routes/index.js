var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
	Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res) {
	Post.find(function(err, results) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(results);
		}
	});
});

router.post('/', function(req, res) {
	var post = new Post(req.body);

	post.save(function(err, results) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(results);
		}
	});
});

module.exports = router;
