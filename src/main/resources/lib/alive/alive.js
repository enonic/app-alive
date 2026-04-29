const contextLib = require('/lib/xp/context');
const nodeLib = require('/lib/xp/node');

exports.isAlive = () => {
    try {
        return contextLib.run({
            repository: 'system-repo',
            branch: 'master',
            principals: ['role:system.admin']
        }, () => nodeLib.connect({
            repoId: 'system-repo',
            branch: 'master'
        }).get('/')) != null;
    } catch (e) {
        log.error('Alive check failed', e);
        return false;
    }
};
