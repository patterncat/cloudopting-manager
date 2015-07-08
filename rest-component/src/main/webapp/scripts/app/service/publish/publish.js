'use strict';

angular.module('cloudoptingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('publish', {
                parent: 'service',
                url: '/publish',
                data: {
                    roles: ['ROLE_ADMIN', 'ROLE_PUBLISHER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/service/publish/publish_one.html',
                        controller: 'PublishController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('publish');
                        return $translate.refresh();
                    }]
                }
            })
            .state('publish2', {
                parent: 'service',
                url: '/publish2',
                data: {
                    roles: ['ROLE_ADMIN']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/service/publish/publish_two.html',
                        controller: 'PublishController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('publish');
                        return $translate.refresh();
                    }]
                }
            })
            .state('publish3', {
                parent: 'service',
                url: '/publish3',
                data: {
                    roles: ['ROLE_ADMIN']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/service/publish/publish_three.html',
                        controller: 'PublishController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('publish');
                        return $translate.refresh();
                    }]
                }
            });
    });