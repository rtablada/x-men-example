var sha1 = require('sha1');
var redis = require('redis').createClient();
var config = require('config');

var shuffle = function (str) {
    var a = str.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
};

module.exports = {
    create: function
        (user) {
        var time = new Date().getTime(),
            identifier = user.email,
            hash = sha1(time + identifier),
            key = shuffle(hash);

        redis.set(key, identifier);
        redis.expire(key, config.get('passwordResetTimout'));

        return key;
    },
    validate: function (email, token, callback) {
        redis.get(token, function (err, val) {
            if (!err && val === email) {
                callback(null, val);
            } else {
                callback(true);
            }
        });
    },
    expire: function(token) {
        redis.del(token);
    }
};
