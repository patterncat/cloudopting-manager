/**
 * Created by a591584 on 30/06/2015.
 */
'use strict';

angular.module('cloudoptingApp')
    .factory('ProcessService', function ($http, $log) {

        var baseURI = 'api/process';
        var baseURITest = 'api/processTest';
        var header = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};

        return {

            /**
             * FIXME: This function should be deleted together with the Button Screen.
             * Method to test a particular case of the process
             * @param callback Function that will take care of the returned objects.
             * @returns {*}
             */
            apiProcessOne: function (callback) {
                var customizationId = 4308;
                var isDemo = false;
                var isTesting = true;
                var endpoint = baseURI +
                    '?customizationId=' + customizationId +
                    '&isDemo=' + isDemo +
                    '&isTesting=' + isTesting;
                return $http.post(endpoint, {}, { headers: header } )
                    .success(function (data, status, headers, config) {
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        $log.error("ProcessService.apiProcessOne error. " +
                            "Data: " + data + ", status: " + status + ", headers: " + headers + ", config: " + config);
                        callback(data, status, headers, config);
                    });
            },

            /**
             * Method to get a test zip file for the instance with identification 'instanceId'.
             * @param instanceId Identification of the instance.
             * @param callback Function that will take care of the returned objects.
             * @returns {*}
             */
            test: function(instanceId, callback) {
                var isDemo = false;
                var isTesting = true;
                var endpoint = baseURITest +
                    '?customizationId=' + instanceId +
                    '&isDemo=' + isDemo +
                    '&isTesting=' + isTesting;
                return $http.post(endpoint, {}, { headers: header , responseType: "blob"})
                    .success(function (data, status, headers, config) {
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        $log.error("ProcessService.test error. " +
                            "Data: " + data + ", status: " + status + ", headers: " + headers + ", config: " + config);
                        callback(data, status, headers, config);
                    });
            },

            /**
             * Method to launch a demo for the instance with identification 'instanceId'.
             * @param instanceId Identification of the instance.
             * @param callback Function that will take care of the returned objects.
             * @returns {*}
             */
            demo: function(instanceId, callback) {
                var isDemo = true;
                var isTesting = false;
                var endpoint = baseURI +
                    '?customizationId=' + instanceId +
                    '&isDemo=' + isDemo +
                    '&isTesting=' + isTesting;
                return $http.post(endpoint, {}, { headers: header })
                    .success(function (data, status, headers, config) {
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        $log.error("ProcessService.demo error. " +
                            "Data: " + data + ", status: " + status + ", headers: " + headers + ", config: " + config);
                        callback(data, status, headers, config);
                    });
            },

            /**
             * Method to deploy an instance for the instance with identification 'instanceId'.
             * @param instanceId Identification of the instance.
             * @param callback Function that will take care of the returned objects.
             * @returns {*}
             */
            deploy: function(instanceId, callback) {
                var isDemo = false;
                var isTesting = false;
                var endpoint = baseURI +
                    '?customizationId=' + instanceId +
                    '&isDemo=' + isDemo +
                    '&isTesting=' + isTesting;
                return $http.post(endpoint, {}, { headers: header } )
                    .success(function (data, status, headers, config) {
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        $log.error("ProcessService.deploy error. " +
                            "Data: " + data + ", status: " + status + ", headers: " + headers + ", config: " + config);
                        callback(data, status, headers, config);
                    });
            }
        };
    }
);