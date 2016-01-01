/**
 * @file Defines the structure for the `beamer` module. Represents a top level
 *          glob for all the angular components of the app.
 * @author Naila Nur
 */
module.exports = {
    views: {
        profile: {
            module: require('./views/profile/profile.js')
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
        routeListItem: {
            module: require('./common/routeListItem/route-list-item.js')
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
        }
    },
    config: {
        router: require('./config/router'),
        jwt: require('./config/jwt'),
        ds: require('./config/ds'),
        routeAccess: require('./config/routeAccess'),
    }
};
