'use strict';

(function () {

  angular.module('electricityConsumptionApp')
    .factory('MainResource', ($resource) => $resource('/api/panels/:id/:controller', {
      id: '@_id',
      controller: '@controller'
    }, {
      get: {
        method: 'GET',
        isArray: false,
        /*transformResponse: function (data) {
          console.log(data)
          // return [...data];
          // return JSON.parse(data);
        }*/
      }
    }));
})();
