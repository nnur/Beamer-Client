var Blog = function(DS, apiEndpoint) {
    var blog = DS.defineResource({
        name: 'blogs',
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
        afterCreate: function(resource, data, cb) {
            // do something more specific to "blogs"
            cb(null, data.data);
        },
        afterUpdate: function(resource, data, cb) {
            cb(null, data.data);
        }
    });
    return blog;
}

module.exports = Blog;
