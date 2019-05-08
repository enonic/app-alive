var mustache = require('/lib/xp/mustache');
var StatusView = resolve('./status.html');
var aliveService = require('/lib/alive/alive');

exports.handleGet = function (req) {

    var alive = aliveService.isAlive();

    if (!alive) {
        return {
            contentType: 'text/html',
            status: 503
        };
    }

    var params = {
        message: "I'm alive"
    };

    return {
        contentType: 'text/html',
        body: mustache.render(StatusView, params)
    };
};
