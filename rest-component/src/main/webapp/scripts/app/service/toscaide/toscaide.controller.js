'use strict';

angular.module('cloudoptingApp').controller('ToscaideController', function(SERVICE, $rootScope, $scope, $http, ToscaideService,Blob, FileSaver) {
	// TODO: Write a controller here
	$scope.mapData = [];
	$scope.edgeData = [];
	$scope.formTypes = [];
	// data types/groups object - used Cytoscape's shapes just
	// to make it more clear
	$scope.form = [ "*", {
		type : "submit",
		title : "Save"
	} ];
	$scope.dynamicPopover = {
		    content: 'content',
		    templateUrl: 'myPopoverTemplate.html',
		    title: 'Import JSON'
		  };
	$scope.model = {};

	$scope.schema = {
		type : "object",
		properties : {
			name : {
				type : "string",
				minLength : 2,
				title : "Name",
				description : "Name or alias"
			},
			title : {
				type : "string",
				enum : [ 'dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj' ]
			}
		}
	};

	$scope.schema = {
		type : "object",
		title : "DockerContainerProperties properties",
		properties : {
			entrypoint : {
				title : "Entry1point in the Dockerfile",
				type : "string"
			},
			from : {
				title : "Base image1",
				type : "string"
			},
			cmd : {
				title : "Command in th1e Dockerfile",
				type : "string"
			}
		}
	};

	var getNodes = function() {
		var callback = function(data, status, headers, config) {
			$scope.objTypes = data;
			console.debug($scope.objTypes);
			$rootScope.$broadcast('appChanged');
		};
		ToscaideService.getNodes(callback);
	};
	getNodes();
	
	var getNodeTypes = function() {
		var callback = function(data, status, headers, config) {
			$scope.templateData = data;
			console.debug($scope.templateData);
			$rootScope.$broadcast('appChanged');
		};
		ToscaideService.getNodeTypes(callback);
	};
	getNodeTypes();
	
	var getEdges = function() {
		var callback = function(data, status, headers, config) {
			$scope.formArr = data;
			console.debug($scope.formArr);
			$rootScope.$broadcast('appChanged');
		};
		ToscaideService.getEdges(callback);
	};
	getEdges();
	
	var getEdgeTypes = function() {
		var callback = function(data, status, headers, config) {
			$scope.templateEdgeData = data;
			console.debug($scope.templateEdgeData);
			$rootScope.$broadcast('appChanged');
		};
		ToscaideService.getEdgeTypes(callback);
	};
	getEdgeTypes();
	
	// add object from the form then broadcast event which
	// triggers the
	// directive redrawing of the chart
	// you can pass values and add them without redrawing the
	// entire
	// chart, but this is the simplest way
	$scope.addObj = function() {
		// collecting data from the form
		// var newObj = $scope.form.obj.name;
		// var newObjType = $scope.form.obj.objTypes;
		var newObj = $scope.scheda.obj.name;
		var newObjType = $scope.scheda.obj.objTypes;
		// building the new Node object
		// using the array length to generate an id for the
		// sample (you
		// can do it any other way)
		var newNode = {
			id : ($scope.mapData.length),
			name : newObj,
			type : newObjType
		};
		// adding the new Node to the nodes array
		$scope.mapData.push(newNode);
		// broadcasting the event
		$rootScope.$broadcast('appChanged');
		// resetting the form
		$scope.scheda.obj = '';
		$scope.$broadcast('schemaFormRedraw');
	};

	// add Edges to the edges object, then broadcast the change
	// event
	$scope.addEdge = function() {
		// collecting the data from the form
		var edge1 = $scope.formEdges.fromName.id;
		var edge2 = $scope.formEdges.toName.id;
		// building the new Edge object from the data
		// using the array length to generate an id for the
		// sample (you
		// can do it any other way)
		var newEdge = {
			id : "e" + ($scope.edgeData.length),
			source : edge1,
			target : edge2,
			type : $scope.formEdges.type
		};
		// adding the new edge object to the adges array
		$scope.edgeData.push(newEdge);
		// broadcasting the event
		$rootScope.$broadcast('appChanged');
		// resetting the form
		$scope.formEdges = '';
	};

	// sample function to be called when clicking on an object
	// in the
	// chart
	$scope.doClick = function(value) {
		// sample just passes the object's ID then output it to
		// the
		// console and to an alert
		console.debug(value);
		// alert(value);
		console.debug('before' + $scope.schema);
		console.debug($scope.schema);
		$scope.schema = JSON.parse(JSON.stringify(value.props));
		$scope.workingNode = value.id;
		$scope.isFormNode = true;
		console.debug('after' + $scope.schema);
		console.debug($scope.schema);
		// $scope.typeform.pop();
		$scope.form = [ "*", {
			type : "submit",
			title : "Save"
		} ];

		console.debug("value.model");
		console.debug($scope.mapData[value.id].model);

		if (typeof $scope.mapData[value.id].model == "undefined") {
			$scope.model = {};
		} else {
			$scope.model = $scope.mapData[value.id].model;
		}
		$scope.$broadcast('schemaFormRedraw');

		$scope.$apply();
	};

	$scope.doEdgeClick = function(value) {
		console.debug(value);
		$scope.schema = JSON.parse(JSON.stringify(value.props));
		$scope.workingEdge = value.id.substring(1);
		$scope.isFormNode = false;
		console.debug($scope.workingEdge);
		console.debug('after' + $scope.schema);
		console.debug($scope.schema);
		// $scope.typeform.pop();
		$scope.form = [ "*", {
			type : "submit",
			title : "Save"
		} ];

		console.debug("value.model");
		console.debug($scope.edgeData[$scope.workingEdge].model);

		if (typeof $scope.edgeData[$scope.workingEdge].model == "undefined") {
			$scope.model = {};
		} else {
			$scope.model = $scope.edgeData[$scope.workingEdge].model;
		}
		$scope.$broadcast('schemaFormRedraw');

		$scope.$apply();
	};
	
	$scope.doRemoveNode = function(value){
		console.log("in remove node");
		console.log(value.id);
		console.debug($scope.mapData);
		for (var index = 0; index < $scope.mapData.length; index++) {
            // If current array item equals itemToRemove then
            if ($scope.mapData[index].id == value.id) {
                // Remove array item at current index
            	$scope.mapData.splice(index, 1);

                // Decrement index to iterate current position 
                // one more time, because we just removed item 
                // that occupies it, and next item took it place
                index--;
            }
        }
		console.debug($scope.mapData);
		console.log("fine remove node");
		$rootScope.$broadcast('appChanged');
	};
	
	$scope.doRenameNode = function(value){
		console.log("in rename node");
		console.log(value.id);
		console.debug($scope.mapData);
		for (var index = 0; index < $scope.mapData.length; index++) {
            // If current array item equals itemToRemove then
			console.log($scope.mapData[index]);
            if ($scope.mapData[index].id == value.id) {
                // Remove array item at current index
            	console.log('trovato'+$scope.scheda.obj.name);
            	$scope.mapData[index].name = $scope.scheda.obj.name;

           }
        }		console.debug($scope.mapData);
		console.log("fine rename node");
		$rootScope.$broadcast('appChanged');
	};

	$scope.onSubmit = function(form) {
		// First we broadcast an event so all fields validate
		// themselves
		$scope.$broadcast('schemaFormValidate');
		console.debug("saving the model");
		console.debug($scope.model);
		console.debug($scope.mapData);
		console.debug($scope.edgeData);
		console.debug($scope.workingNode);
		console.debug($scope.workingEdge);
		console.debug("the mapdata");
		console.debug($scope.mapData[$scope.workingNode]);
		console.debug($scope.edgeData[$scope.workingEdge]);
		if ($scope.isFormNode) {
			$scope.mapData[$scope.workingNode].model = $scope.model;
		} else {
			$scope.edgeData[$scope.workingEdge].model = $scope.model;
		}
		console.debug($scope.mapData[$scope.workingNode]);
		// Then we check if the form is valid
		if (form.$valid) {
			// ... do whatever you need to do with your data.
			console.debug("The form is valid, let's send it: "

			);
			var callback = function(data) {
				console.debug("in the callback");
//				console.debug("sendCustomForm succeeded with data: " + data);
                if(data) {
                    var zip = new Blob([data], {type: 'application/zip'});
                    var fileName = 'TOSCA_Archive.zip';
					return FileSaver.saveAs(zip, fileName);
                }
			};
		}
	};

	// reset the sample nodes
	$scope.reset = function() {
		$scope.mapData = [];
		$scope.edgeData = [];
		// $scope.$broadcast('schemaFormRedraw');
		$scope.$apply();
		$rootScope.$broadcast('appChanged');

	};
	

	$scope.sendService = function() {
		console.debug("sending data");
		var data = JSON.stringify({
			nodes : $scope.mapData,
			edges : $scope.edgeData,
			serviceName : $scope.serviceName
		});

		var callback = function(data, status, headers, config) {
//			console.debug(data);
            if(data) {
                var zip = new Blob([data], {type: 'application/zip'});
                var fileName = 'TOSCA_Archive.zip';
                FileSaver.saveAs(zip, fileName);
            }
		};
		return ToscaideService.sendData(data, callback);
	};

	$scope.saveService = function() {
		console.debug("sending data for save");
		var data = JSON.stringify({
			nodes : $scope.mapData,
			edges : $scope.edgeData,
			serviceName : $scope.serviceName
		});

		var callback = function(data, status, headers, config) {
			console.debug(data);
		};
		return ToscaideService.saveData(data, callback);
	};

	$scope.loadTopology = function() {
		console.debug("loading saved data");
		var data = JSON.stringify({
			serviceName : $scope.serviceName
		});

		var callback = function(data, status, headers, config) {
			$scope.mapData = [];
			$scope.edgeData = [];
			console.debug(data);
			console.debug(status);
			// $scope.mapData = data.nodes;
			data.nodes.forEach(function(entry) {
				console.log(entry);
				$scope.mapData.push(entry);
			});
			data.edges.forEach(function(entry) {
				console.log(entry);
				$scope.edgeData.push(entry);
			});
			console.debug(data.nodes);
			console.debug($scope.mapData);
			// $scope.edgeData = data.edges;
			$rootScope.$broadcast('appChanged');

		};
		return ToscaideService.loadTopology(data, callback);
	};
	
	$scope.importJson = function(){
		console.log($scope.dynamicPopover);
		var data = JSON.parse($scope.dynamicPopover.content);
		data.nodes.forEach(function(entry) {
			console.log(entry);
			$scope.mapData.push(entry);
		});
		data.edges.forEach(function(entry) {
			console.log(entry);
			$scope.edgeData.push(entry);
		});
		$scope.serviceName = data.serviceName;
		console.debug(data.nodes);
		console.debug($scope.mapData);
		// $scope.edgeData = data.edges;
		$rootScope.$broadcast('appChanged');
	}

});
