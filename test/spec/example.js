var assert = require('chai').assert,
    del    = require('del'),
    config = require('../../package.json').config;

del([__dirname + '/screenshots/*.png'], function(err, paths){
//    console.log('Deleted files/folders:\n', paths.join('\n'));
});

/* ====================== tests when not logged in ====================== */
describe('1. journalsurf enrich', function () {
    before(function (done) {
        browser.url('http://' + config.host + '/enrich', done);
    });

    it('check the enrich page shows results', function (done) {
        browser
            .saveScreenshot(__dirname + '/screenshots/01_check_the_enrich_page_shows_results.png')
            .getText('.search-result__showing')
            .then(function(text){
                assert.match(text, /Showing \d–\d+ of \d+ results/);
            })
            .call(done);
    });

});

describe('2. journalsurf enrich', function () {
    before(function (done) {
        browser.url('http://' + config.host + '/enrich', done);
    });

    it('check the enrich resources are not downloadable to an unauthenticated user', function (done) {
        // We have some free enrich resources which are available to all users.
        // Preusme no more than 5.
        browser
            .saveScreenshot(__dirname + '/screenshots/02_check_the_enrich_resources_are_not_downloadable_to_an_unauthenticated_user.png')
            .elements('.search-result__enrich_item')
            .then(function(elements){
                assert.isBelow(elements.value.length, 6);
            })
            .call(done);
    });

});

describe('3. journalsurf search', function () {
    before(function (done) {
        browser.url('http://' + config.host + '/search', done);
    });

    it('check that journal items are not searchable by unauthenticated users', function (done) {
        browser
            // we're showing mobile by default -- we can't getText if the element is not visisble
            .setViewportSize({
                width: 860,
                height: 600
            })
            .setValue('input[name=query]', 'cats')
            .click('label[for=search_option_all]')
            // Attempt to select journal items option
            .click('label[for=search_option_journalitems]')
            // Submit the search form
            .click('#search-form .show-for-medium-up button[type=submit]')
            // Wait for the showing text to appear on the following screen
            .waitForText('#top-bar-message .alert.message', 4000)
            .saveScreenshot(__dirname + '/screenshots/03_check_that_journal_items_are_not_searchable_by_unauthenticated_users.png')
            .getText('#top-bar-message .alert.message')
            .then(function(text){
                assert.equal(text, 'You must login to use this search function!');
            })
            .elements('.search-result__journalitem')
            .then(function(elements){
                assert.equal(elements.value.length, 0);
            })
            .call(done);
    });

});

describe('4. journalsurf news', function () {
    before(function (done) {
        browser.url('http://' + config.host + '/news', done);
    });

    it('check that we can access news', function (done) {
        browser
            .saveScreenshot(__dirname + '/screenshots/04_check_that_we_can_access_news.png')
            .elements('.news-item')
            .then(function(elements){
                assert.isAbove(elements.value.length, 0);
            })
            .call(done);
    });

});
