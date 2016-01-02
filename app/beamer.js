/**
 * @file Defines the structure for the `beamer` module. Represents a top level
 *          glob for all the angular components of the app.
 * @author Naila Nur
 */
module.exports = {
    views: {
        profile: {
            module: require('./views/profile/profile.js')
        },
        blog: {
            module: require('./views/blog/blog.js')
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
            module: require('./common/logoutModal/logout-modal.js')
        },
        editRouteModal: {
            module: require('./common/editRouteModal/edit-route-modal.js')
        },
        confirmDeleteModal: {
            module: require('./common/confirmDeleteModal/confirm-delete-modal.js')
        }
    },
    config: {
        router: require('./config/router'),
        jwt: require('./config/jwt'),
        ds: require('./config/ds'),
        routeAccess: require('./config/routeAccess'),
    }
};
