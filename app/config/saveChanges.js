var saveChanges = function($state, $rootScope, saveChangesModal, unsavedChanges) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (unsavedChanges.blogs) {
            event.preventDefault();
            saveChangesModal
                .showConfirmation()
                .then(function(res) {
                    unsavedChanges.blogs = false;
                    $state.go(toState, toParams)
                });
        }
    });

}

module.exports = saveChanges;
