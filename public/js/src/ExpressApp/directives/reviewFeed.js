angular.module('ExpressApp').directive('reviewFeed', function() {
    return {
        restrict: 'A',
        templateUrl: 'js/src/ExpressApp/directives/templates/review_feed.html',
        scope: {
            reviews: '=',
            own: '@'
        }
    }
});