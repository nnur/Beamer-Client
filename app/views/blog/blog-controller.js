var BlogController = function($scope) {
    $scope.htmlcontent = 'New post!';
    $scope.originalHtml = $scope.htmlcontent;
    $scope.disabled = false;

}

module.exports = BlogController;
