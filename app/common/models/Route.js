var Route = function(DS, apiEndpoint) {
    var route = DS.defineResource({
        name: 'routes',
        computed: {
            routeSlashName: ['routename', function(routename) {
                return '/' + routename;
            }]
        },
        idAttribute: 'routename',
        basePath: apiEndpoint + '/users/dharness/',
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
        },
        afterUpdate: function(resource, data, cb) {
            cb(null, data.data);
        }
    });
    return route;
}

module.exports = Route;
