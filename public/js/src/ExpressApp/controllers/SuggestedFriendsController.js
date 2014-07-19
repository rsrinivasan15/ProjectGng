angular.module('ExpressApp').controller('SuggestedFriendsController', function($scope, $http, UserInformation, EVENTS, $rootScope) {
    $scope.suggestedFriends = [];

    var url = '/suggestedFriends?facebookId=' + UserInformation.getUserInformation().facebookId;

    $http.get(url).then(function(response) {
        if (response && response.data) {
            $scope.suggestedFriends = response.data;
        }
    });

    $scope.addFriend = function(friend) {
        var friendFacebookId = friend.facebookId;
        var data = {
            facebookIdOfFriend: friendFacebookId,
            facebookIdOfMe:UserInformation.getUserInformation().facebookId
        };

        $http.post('/addFriend', data).then(function(response) {
            UserInformation.getUserInformation().friends.push(friend);
            $scope.suggestedFriends = _.filter($scope.suggestedFriends, function(friend) {
                return friend.facebookId !== friendFacebookId;
            });

            $rootScope.$broadcast(EVENTS.REFRESH_REVIEW_FEED);

        });

    };
});