var bean = __.newBean('com.enonic.app.alive.AliveBean');

exports.isAlive = function () {
    var result = bean.isAlive();
    return __.toNativeObject(result);
};
