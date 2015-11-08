var Mystique = require('mystique');

var PersonTransformer = Mystique.Transformer.extend({
  resourceName: 'person',
  mapOut: function(person) {
    return {
      'first-name': person.first,
      'last-name': person.last,
      email: person.email,
    };
  },

  mapIn(req) {
    return {
      first: req.body['first-name'],
      last: req.body['last-name'],
      email: req.body.email,
    };
  },
});

Mystique.registerTransformer('Person', PersonTransformer);
