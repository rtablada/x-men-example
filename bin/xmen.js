var Mongoose = require('mongoose');
var Mystique = require('mystique');
var _ = require('lodash');
var url = require('url');

var defaultBeforeSave = (model, save) => {
  save();
};

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
      var beforeSave = options.beforeSave || defaultBeforeSave;
      var afterSave = options.afterSave || () => {};

      var Transformer = Mystique.getTransformer(modelName);

      var data = Transformer.rawItem(req, Transformer.mapIn);
      var Model = Mongoose.model(modelName);

      var model = new Model(data);
      beforeSave(model, () => {
        model.save((err) => {
          if (err) {
            return res.send({err});
          }

          model.populate(options.include, () => {
            res.send(model.toObject());

            afterSave(model);
          });
        });
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
