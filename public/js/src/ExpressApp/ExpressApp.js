angular.module('ExpressApp', ['FacebookLogin',
    'ui.bootstrap',
    'ngRoute',
    'ngCookies'])

    .constant('EVENTS', {
        'REFRESH_REVIEW_FEED': 'refresh.review.feed'
    })

    .constant('AUTHENTICATION_MODE', {
        'FACEBOOK': 'authentication_mode_facebook',
        'NATIVE': 'authentication_mode_native'
    });
