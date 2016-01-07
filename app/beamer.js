/**
 * @file Defines the structure for the `beamer` module. Represents a top level
 *          glob for all the angular components of the app.
 * @author Naila Nur
 */
module.exports = {
    views: {
        user: {
            routes: {
                module: require('./views/user/routes/routes.js')
            }
        },
        blog: {
            module: require('./views/blog/blog.js'),
            editBlogs: {
                module: require('./views/blog/editBlogs/edit-blogs.js')
            }
        }
    },
    common: {
        login: {
            module: require('./common/login/login.js')
        },
        auth: {
            module: require('./common/auth/auth.js')
        },
        session: {
            module: require('./common/session/session.js')
        },
        sidebar: {
            module: require('./common/sidebar/sidebar.js')
        },
        routesPanel: {
            module: require('./common/routesPanel/routes-panel.js')
        },
        models: {
            module: require('./common/models/models.js')
        },
        logoutModal: {
            module: require('./common/modals/logoutModal/logout-modal.js')
        },
        editRouteModal: {
            module: require('./common/modals/editRouteModal/edit-route-modal.js')
        },
        confirmDeleteModal: {
            module: require('./common/modals/confirmDeleteModal/confirm-delete-modal.js')
        },
        saveChangesModal: {
            module: require('./common/modals/saveChangesModal/save-changes-modal.js')
        },
        blogsList: {
            module: require('./common/blogsList/blogs-list.js')
        }
    },
    config: {
        router: require('./config/router'),
        jwt: require('./config/jwt'),
        ds: require('./config/ds'),
        routeAccess: require('./config/routeAccess'),
        saveChanges: require('./config/saveChanges'),
        textAnguarBtns: require('./config/textAngularBtns')
    }
};
