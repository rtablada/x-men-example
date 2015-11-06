var Mongoose = require('mongoose');
var Mystique = require('mystique');
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

    createRecord(modelName, options) {
      var Transformer = Mystique.getTransformer(modelName);

      var data = Transformer.rawItem(req, Transformer.mapIn);
      var Model = Mongoose.model(modelName);

      var model = new Model(data);
      model.save((err) => {
        if (err) {
          return res.send({err});
        }

        res.send(model.toObject());
      });
    },
  };

  return next();
};
