var app = angular.module('appDiag', ['ui.bootstrap','diagnosticosServices','analiseService']);
var _ = require('underscore');

app.filter('getById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].tagDoEquipamento == +id) {
        return input[i];
      }
    }
    return null;
  }
});

app.controller('DuvalController', ['$scope','$filter','DuvalService','Analises' ,function ($scope,$filter, DuvalService, Analises) {
    // $scope.equipamento = window.equipamento;
    // $scope.analisesDoEquipamento = [];
    // $scope.loading = true;
    // $scope.ultimaAnalise;

    // $scope.m = 0;
    // $scope.a = 0;
    // $scope.y = 0;
    // $scope.diagnostico = '';


    // Analises.get()
    //     .success(function(data) {
    //       $scope.analisesDoEquipamento = data;
    //       $scope.ultimaAnalise = $filter('getById')($scope.analisesDoEquipamento, $scope.equipamento.tag);
    //       // $scope.ultimaAnalise = $scope.analisesDoEquipamento[$scope.analisesDoEquipamento.length-1];
    //       $scope.loading = false;

    //       $scope.m = DuvalService.m($scope.ultimaAnalise.ch4, $scope.ultimaAnalise.c2h2, $scope.ultimaAnalise.c2h4);
    //       $scope.a = DuvalService.a($scope.ultimaAnalise.ch4, $scope.ultimaAnalise.c2h2, $scope.ultimaAnalise.c2h4);
    //       $scope.y = DuvalService.y($scope.ultimaAnalise.ch4, $scope.ultimaAnalise.c2h2, $scope.ultimaAnalise.c2h4);
    //       $scope.diagnostico = DuvalService.diagnostico($scope.ultimaAnalise.ch4, $scope.ultimaAnalise.c2h2, $scope.ultimaAnalise.c2h4);
    //     });
    

    // $scope.formData = {
    //     ch4: 0,
    //     c2h2: 0,
    //     c2h4: 0
    // };
    
    $scope.m = function(analise) {
      return DuvalService.m(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.a = function(analise) {
      return DuvalService.a(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.y = function(analise) {
      return DuvalService.y(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.diagnostico = function(analise) {
      return DuvalService.diagnostico(analise.ch4, analise.c2h2, analise.c2h4);
    };


}]);

app.controller('DiagController', ['$scope','Analises' ,function ($scope, Analises) {
  $scope.equipamento = window.equipamento;

  Analises.getByTag(equipamento.tag)
      .success(function(data) {
        $scope.analise =   last(_.sortBy(data, 'dataDaAnalise'));
      });
}]);