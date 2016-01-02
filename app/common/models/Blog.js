var Blog = function(DS, apiEndpoint) {
    var blog = DS.defineResource({
        name: 'blogs',
        basePath: apiEndpoint + '/users/dharness/routes/noodleIsPreeCute/',
        cacheResponse: true,
        linkRelations: true,
        relations: {
            belongsTo: {
                routes: {
                    parent: true,
                    localField: 'route',
                    localKey: 'routename'
                },
            },
        },
        afterFindAll: function(resource, data, cb) {
            // do something more specific to "blogs"
            cb(null, data.data.blogs);
        },
        afterUpdate: function(resource, data, cb) {
            cb(null, data.data);
        }
    });
    return blog;
}

module.exports = Blog;
