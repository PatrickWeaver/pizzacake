'use strict';

var app = angular.module('pizza', [])
  .controller('pizzaController', function($scope, $http){

    var randomPizza = Math.floor(Math.random() * 10);

    $scope.getPizzas = function() {
      $http({ method : "GET", url : "http://pizzacake.herokuapp.com/api/pizza?number=" + randomPizza, headers : { "Content-Type": "application/json" }})
        .success(function(data, status) {
          $scope.pizza = data[0];
        })
        .error(function(data, status) {
          alert("data: " + data);
          alert("status: " + status);
        });
    };
  });