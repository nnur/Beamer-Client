var ds = function(DS, $rootScope, apiEndpoint) {

    DS.defineResource({
        name: 'users',
        idAttribute: 'username',
        basePath: apiEndpoint,

        relations: {
            hasMany: {
                routes: [{
                    localField: 'routes',
                    foreignKey: 'username'
                }]
            }
        },
        // set just for this resource
        afterFind: function(resource, data, cb) {
            // do something more specific to "users"
            cb(null, data.data.user);
        }
    });

    DS.defineResource({
        name: 'routes',
        idAttribute: 'routename',
        basePath: apiEndpoint,
        cacheResponse: true,
        relations: {
            belongsTo: {
                users: {
                    parent: true,
                    localField: 'users',
                    localKey: 'username'
                }
            }
        },
        afterFindAll: function(resource, data, cb) {
            // do something more specific to "users"
            cb(null, data.data.routes);
        }
    });
}

module.exports = ds;
