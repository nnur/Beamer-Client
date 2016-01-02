var ds = function(DS, DSHttpAdapter) {
    DS.registerAdapter('http', DSHttpAdapter, {
        default: true
    });
}

module.exports = ds;
