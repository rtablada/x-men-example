var Mongoose = require('mongoose');
var _ = require('lodash');
var url = require('url');

module.exports = function(req, res, next) {
  req.store = {
    // req.store.recordCollection('Book', {indlude: ['author'], queryBy: ['year'], orderBy: 'year'});
    recordCollection(modelName, options) {
      var Model = Mongoose.model(modelName);

      var urlParts = url.parse(req.url, true);

      var searchvValues = _.pick(urlParts.query, options.queryBy);
      var query = Model.find(searchvValues)
        .sort(urlParts.query.orderBy || options.orderBy)
        .populate(options.include)
        .exec((err, results) => {
          res.send(results);
        });
    },
  };

  return next();
};
