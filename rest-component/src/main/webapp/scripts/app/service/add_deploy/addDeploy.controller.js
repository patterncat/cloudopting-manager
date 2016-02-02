'use strict';

angular.module('cloudoptingApp')
    .controller('AddDeployController', function (SERVICE, $scope, $state, $log, localStorageService, ApplicationService, InstanceService) {
        $scope.cloudNodeList = null;
        $scope.osList = null;
        $scope.skinList = null;

        var currentApp = localStorageService.get(SERVICE.STORAGE.CURRENT_APP);
        if(currentApp !== undefined && currentApp !== null)
        {
            $scope.cloudNodeList = currentApp.cloudNodeList;
            $scope.osList = currentApp.osList;
            $scope.skinList = currentApp.skinList;
        }
        else
        {
            //If not application go to catalogue.
            $state.go('catalogue');
        }

        $scope.saveTemplate = function(service) {
            //Save the template temporarily
            $scope.tempTemplate = service;
        };

        $scope.uploadTemplate = function(service) {
            //Save the template temporarily
            var callback = function(data, status, headers, config){
                $log.info(data);
            };
            InstanceService.create(service, callback);
            //$scope.message = "Service send successfully!";
        };
    }
);
