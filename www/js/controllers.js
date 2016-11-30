angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $cordovaOauth, $ionicSideMenuDelegate, $localStorage, $state, $http) {


    var AppId = "376968542634974";
    
    $scope.init = function() {
        $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "name", format: "json" }}).then(function(result) {
            $scope.profileName = result.data.name;
        }, function(error) {
            alert("There was a problem getting your profile.  Check the logs for details.");
            console.log(error);
        });
    };

    $scope.logoutFb = function () {
        $scope.menuB = true;
        delete $localStorage.accessToken;
        $state.go('home');
    }
})

.controller('PlaylistsCtrl', function ($scope, $ionicModal, $timeout, $cordovaOauth, $ionicSideMenuDelegate, $localStorage, $state, $http) {
    var AppId = "376968542634974";
    $scope.loginButton = function () {
        $cordovaOauth.facebook(AppId, ["email"])
            .then(function (result) {
                $scope.menuB = false;
                $localStorage.accessToken = result.access_token;
                $state.go('app.profile');
//                $scope.$emit("accessToken", $localStorage.accessToken);
        }, function (error) {
                alert("Error -> " + error)

        })
    }
})