//module. angular is a global variable
var module1 = angular.module('myModule1', [ 'ngRoute' ]);

// for routing. This is a different service provided by a different .js, so need
// to add the dependency in the module as 'ngRoute'
module1.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'pages/main.html',
		controller : 'mainCntrlr'
	}).when('/add', {
		templateUrl : 'pages/add.html',
		controller : 'addCntrlr'
	}).when('/subtract', {
		templateUrl : 'pages/subtract.html',
		controller : 'subCntrlr'
	})
})

// controller for addition page. $scope is a service. Dependency injection done
// here.
module1.controller('addCntrlr',
		[
				'$scope',
				'myService',
				function($scope, myService) {
					$scope.number1 = '';
					$scope.number2 = '';
					$scope.result = '';

					$scope.addNumbers = function() {
						$scope.result = Number($scope.number1)
								+ Number($scope.number2);
					}

					$scope.thoughtTextAdd = myService.text;

					// You need to manually update the value of the variable in
					// service. Still on refresh of page, it would be gone
					// because practically you'll have to save the value in a
					// database
					//definition similar to that of controller
					$scope.$watch('thoughtTextAdd', function() {
						myService.text = $scope.thoughtTextAdd;
					})

					$scope.name = 'Karen';
					$scope.person = {
						surname : 'Walsh',
						word1 : 'How',
						word2 : 'are',
						word3 : 'you'
					}

					$scope.fullSentence = function(person) {
						return person.word1 + ' ' + person.word2 + ' '
								+ person.word3 + ' ?'
					}

				} ]);

// controller for subtraction page
module1.controller('subCntrlr',
		[
				'$scope',
				'myService',
				function($scope, myService) {
					$scope.number1 = '';
					$scope.number2 = '';
					$scope.result = '';

					$scope.subtract = function() {
						$scope.result = Number($scope.number1)
								- Number($scope.number2);
					}

					$scope.thoughtTextSub = myService.text;

					$scope.$watch('thoughtTextSub', function() {
						myService.text = $scope.thoughtTextSub;
					})
				} ]);

module1.controller('mainCntrlr', [ '$scope', function($scope) {
} ]);

// Service. Definition similar to that of a controller. Service lets info to be
// relayed between different pages
module1
		.service(
				'myService',
				function() {
					this.text = 'You can write your own thought for the day and it will get relayed to the other page as well! Try it!';

				})

// custom directive. Definition similar to that of a controller.
// properties: [1] restrict with values 'EAMC' (Element,Attribute, Comment,
// Class).
// These are the 4 ways a directive can be defined in HTML. Based on the value
// given here, only directive given in that way will be considered.
// [2]template: the html DOM elements OR templateUrl: location of the file where
// the html is placed.
// [3] replace: Default is 'false'. If set to true, the custom directive element
// is replaces by its HTML definition.
// scope is an isolate scope here so that the template(.html file) doesn't have
// access to variables defined in the controller of the corresponding view. '@'
// - for text. '=' for object. '&' for function.

module1.directive('myDir', function() {
	return {
		templateUrl : 'templates/custDir.html',
		scope : {
			myName : "@",
			myDetails : "=",
			myQuestion : "&"
		}
	}

})
