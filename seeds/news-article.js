var mongoose = require('mongoose'),
    NewsArticle = mongoose.model('NewsArticle');


NewsArticle.remove().exec().then(function() {
    NewsArticle.create({
        title: 'Kyle Quit the Band',
        body: 'Taxidermy cornhole irony, mixtape drinking vinegar locavore tofu hashtag gluten-free authentic keffiyeh. Godard cardigan mixtape bicycle rights swag, lo-fi American Apparel fingerstache wayfarers.',
        publishDate: Date(2014, 12, 1)
    }).then(function(newsArticle) {
        console.log(newsArticle);
        process.exit();
    });
});
