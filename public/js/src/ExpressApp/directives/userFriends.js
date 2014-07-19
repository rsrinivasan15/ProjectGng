angular.module('ExpressApp').directive('userFriends', function($http, UserInformation) {
    return {
        restrict: 'A',
        templateUrl: 'js/src/ExpressApp/directives/templates/user_friends.html',
        scope: {
            userId: '=',
            titleName: '@',
            own: '@'
        },
        link: function(scope, element, attrs) {
            scope.userInformation = UserInformation.getUserInformation();
            scope.own = scope.own === 'true';
            scope.$watch('userId' , function(userId, oldUserId) {
                if (userId) {
                    var url = '/getFriends?facebookId=' + userId;
                    $http.get(url).then(function(response) {
                        UserInformation.setFriends(response.data);
                        scope.friends = response.data;
                    });
                }
            });

        }
    }
});