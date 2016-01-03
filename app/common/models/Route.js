var Route = function(DS, apiEndpoint, session) {

    var route = DS.defineResource({
        name: 'routes',
        computed: {
            routeSlashName: ['routename', function(routename) {
                return '/' + routename;
            }]
        },
        idAttribute: 'routename',
        basePath: apiEndpoint + '/users/' + session.getUsername() + '/',
        cacheResponse: true,
        linkRelations: true,
        relations: {
            belongsTo: {
                users: {
                    parent: true,
                    localField: 'user',
                    localKey: 'username'
                }
            },
            hasMany: {
                blogs: [{
                    localField: 'blogs',
                    foreignKey: 'routename'
                }]
            }
        },
        afterFindAll: function(resource, data, cb) {
            // do something more specific to "routes"
            cb(null, data.data.routes);
        },
        afterUpdate: function(resource, data, cb) {
            cb(null, data.data);
        }
    });
    return route;
}

module.exports = Route;
