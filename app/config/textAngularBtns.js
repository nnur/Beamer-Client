var textAngularBtns = function($provide) {
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
        taOptions.toolbar = [
            ['h1', 'h2', 'h3', 'p', 'pre', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'html']
        ];
        return taOptions;
    }]);
}

module.exports = textAngularBtns;
