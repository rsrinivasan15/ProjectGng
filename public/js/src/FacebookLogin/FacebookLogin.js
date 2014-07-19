angular.module('FacebookLogin', ['facebook'])
    .config(['FacebookProvider', function(FacebookProvider) {
        FacebookProvider.init('505693772873871');
    }])
    .constant('FACEBOOK_CONNECTION_STATUS', {
        'CONNECTED': 'connected',
        'UNKNOWN': 'unknown'
    });