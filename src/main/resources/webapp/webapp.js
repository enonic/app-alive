const io = require('/lib/xp/io');
const mustache = require('/lib/mustache');
const router = require('/lib/router')();

const SHORT_CACHE_HEADERS = {
    'Cache-Control': 'private, max-age=1'
};
const aliveService = require('/lib/alive/alive');
const StatusView = resolve('/lib/alive/status.html');

router.get('/', () => {
    const alive = aliveService.isAlive();
    return {
        contentType: 'text/html;charset=utf-8',
        body: mustache.render(StatusView, {
            message: alive ? "I'm alive" : "I'm dead"
        }),
        status: alive ? 200 : 503,
        headers: SHORT_CACHE_HEADERS
    };
});

router.get('/favicon.png', () => {
    const filename = aliveService.isAlive() ? '/lib/alive/favicon-32x32.png' : '/lib/alive/favicon-broken-32x32.png';
    return {
        contentType: io.getMimeType(filename),
        body: io.getResource(filename).getStream(),
        headers: SHORT_CACHE_HEADERS
    };
});

exports.all = (req) => router.dispatch(req);
