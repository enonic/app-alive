var router = require('/lib/router')();
var status = require('/lib/pages/status/status');

router.get('/', status.handleGet);

exports.all = function (req) {
    return router.dispatch(req);
};
