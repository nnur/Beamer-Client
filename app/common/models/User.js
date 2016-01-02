var User = function(DS, apiEndpoint, session) {
    var User = DS.defineResource({
        name: 'users',
        computed: {
            initial: ['username', function(username) {
                return username.charAt(0);
            }],
            sortedRoutes: ['routes', function(routes) {
                return _.sortBy(routes, function(n) {
                    return n.routename;
                })
            }]
        },
        idAttribute: 'username',
        basePath: apiEndpoint,
        linkRelations: true,
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
        },
        afterUpdate: function(resource, data, cb) {
            cb(null, data.data);
        }
    });

    return User;
}

module.exports = User;
