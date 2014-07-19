angular.module('ExpressApp').factory('UserInformation',
    function() {
        var userInformation = {
            facebookId: null,
            isLoggedIn: false,
            firstName: null,
            lastName: null,
            authenticationMode: null,
            profilePicture: null,
            friends: []
        };

        return {
            getUserInformation: function() {
                return userInformation;
            },

            setUserLoggedIn: function(isLoggedIn) {
                userInformation.isLoggedIn = isLoggedIn;
            },

            setFirstName: function(firstName) {
                userInformation.firstName = firstName;
            },

            setLastName: function(lastName) {
                userInformation.lastName = lastName
            },

            setAuthenticationMode: function(mode) {
                userInformation.authenticationMode = mode;
            },

            setProfilePicture: function(pic) {
                userInformation.profilePicture = pic;
            },

            setId: function(id) {
                userInformation.facebookId = id;
            },

            setFriends: function(friends) {
                userInformation.friends = friends;
            }

        }
    });