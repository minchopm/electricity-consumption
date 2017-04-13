'use strict';

(function () {

  class MainController {

    constructor(MainResource, $scope, $mdDialog) {

      var panelPower = 200;
      $scope.panelCostOfPower = [3, 2];
      $scope.years = [30, 20];

      $scope.calculation = function () {
        if (!$scope.electricityForm.$valid) {
          return;
        }
        MainResource.get({
          selectedIndex: $scope.selectedIndex,
          costOfPower: $scope.costOfPower,
          electricityConsumption: $scope.electricityConsumption,
          solarEnergy: $scope.solarEnergy
        }).$promise
          .then(response => {

            $mdDialog.show({
              controller: ($scope, $mdDialog)=> {

                $scope.donutColors = ["rgba(102,204,26,1)", 'rgba(247,70,74,1)'];
                $scope.donutData = response.data.map(item=>item.toFixed(2));
                $scope.panels = response.panels;
                $scope.totalCost = response.totalCost;
                $scope.panelCost = response.panelCost;


                $scope.donutLabels = ["Saved money", "Money for electricity provider"];
                $scope.donutOptions = {
                  // maintainAspectRatio: false,
                  responsive: true,
                  tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                      label: function (tooltipItem, data) {
                        console.log(tooltipItem, data)
                        var label = data.labels[tooltipItem.index];
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + addCommas(datasetLabel);
                      }
                    }
                  },
                };

                $scope.cancel = () => {
                  $mdDialog.cancel();
                };
                /**************************************/
                $scope.labels = response.xAxis;
                // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
                $scope.series = [response.years + ' life time'];
                // $scope.series = ['Series A', 'Series B'];
                $scope.colors = ["rgba(102,204,26,1)"];
                $scope.data = response.yAxis;
                /*$scope.data = [
                 [65, 59, 80, 81, 56, 55, 40],
                 [28, 48, 40, 19, 86, 27, 90]
                 ];*/
                $scope.onClick = function (points, evt) {
                  console.log(points, evt);
                };
                $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
                $scope.options = {
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    yAxes: [
                      {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                      }/*,
                       {
                       id: 'y-axis-2',
                       type: 'linear',
                       display: true,
                       position: 'right'
                       }*/
                    ]
                  }
                };
              },
              controllerAs: 'ctrl',
              template: `
              <md-content>
              <md-card>
              <md-card-title layout="column" flex="100" layout-align="center center">
                         <h1 layout="row" flex>{{panels}} panels X &#36;{{panelCost.toFixed(2)}}</h1>
                         <h3 layout="row" flex> total cost &#36;{{totalCost.toFixed(2)}}</h3>
              </md-card-title>
              <md-card-content layout-gt-sm="row" layout-sm="column">
             
  
              <div layout-gt-sm="column" layout-sm="row" layout-align="space-between center"  flex-sm="50" flex-gt-sm="50">
       
       

              <canvas id="doughnut" class="chart chart-doughnut chart-xs" chart-data="donutData"
                      chart-labels="donutLabels" chart-colors="donutColors"></canvas>
                     
            </div>
      
            
            <div layout-gt-sm="column" layout-sm="row" layout-align="space-between center"  flex-sm="50" flex-gt-sm="50">
             <canvas id="line" class="chart chart-bar" chart-data="data"
                chart-labels="labels" chart-series="series" chart-options="options"
                chart-dataset-override="datasetOverride" chart-click="onClick">
                </canvas>
              
            </div>

            </md-card-content>
            </md-card>
            </md-content>`,

              parent: $('body'),

              clickOutsideToClose: true
            })
              .then((res) => {
              }, () => {
              });

          });
      }
    }
  }

  angular.module('electricityConsumptionApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
