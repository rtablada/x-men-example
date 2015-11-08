var Mongoose = require('mongoose');
var Mystique = require('mystique');
var _ = require('lodash');
var url = require('url');

module.exports = function(req, res, next) {
  req.store = {
    // req.store.recordCollection('Book', {indlude: ['author'], queryBy: ['year'], orderBy: 'year'});
    recordCollection(modelName, options) {
      options = options || {};
      options.include = options.include || [];
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
      options = options || {};
      options.include = options.include || [];
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

    recordItemById(modelName, id, options) {
      options = options || {};
      options.include = options.include || [];
      var Model = Mongoose.model(modelName);

      var query = Model.findById(id)
        .populate([])
        .exec((err, results) => {
          res.send(results);
        });
    },
  };

  return next();
};
