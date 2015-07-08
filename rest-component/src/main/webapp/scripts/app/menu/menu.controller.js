'use strict';

angular.module('cloudoptingApp')
    .controller('MenuController', function (SERVICE, $state, $scope, Principal, Auth) {

        $scope.logoutButton = Principal.isAuthenticated();
        //$scope.name = Principal.isAuthenticated ? Principal.identity().login : '';
        if (Principal.isAuthenticated()) {
            Principal.identity().then(function (account) {
                $scope.name = account.login;
            });
        }

        $scope.logout = function(){
            Auth.logout();
            $state.go("login");
        };

        $scope.$watch(
            function() {
                return Principal.isAuthenticated();
            },
            function(newVal, oldVal)
            {
                $scope.logoutButton = Principal.isAuthenticated();
                //$scope.name = Principal.isAuthenticated ? Principal.identity().login : '';
                if (Principal.isAuthenticated()) {
                    Principal.identity().then(function (account) {
                        $scope.name = account.login;
                    });
                }

                $scope.isPublisher = function (){
                    return Principal.isInRole(SERVICE.ROLE.SUBSCRIBER);
                };

                $scope.logout = function(){
                    Auth.logout();
                    $state.go("catalog");
                };
            },
            true
        );

        $scope.showMenu = function(item){
            if(Principal.isInRole(SERVICE.ROLE.ADMIN)){
                return true;
            }
            else if(Principal.isInRole(SERVICE.ROLE.OPERATOR)){
                if(item=='catalog' || item=='detail' || item=='detail') {
                    return true;
                }
            }
            else if(Principal.isInRole(SERVICE.ROLE.PUBLISHER)){
                if(item=='catalog' || item=='detail' || item=='instances' || item=='publish') {
                    return true;
                }
            }
            else if(Principal.isInRole(SERVICE.ROLE.SUBSCRIBER)){
                if(item=='catalog' || item=='detail' || item=='instances' || item=='subscriber' || item=='taylor') {
                    return true;
                }
            }
        };
    }
);