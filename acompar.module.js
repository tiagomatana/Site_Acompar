/**
 * @param {type} angular
 * @returns {angular.module}
 * @author
 * @since 8/8/2017
 */

(function () {
  'use strict';

  angular
    .module('acomparjs', ['ngMaterial'])
    .controller('AppCtrl', function ($scope, $http) {

      var self = this;

      function clearEmail(){
        $scope.name = '';
        $scope.email = '';
        $scope.message = '';
      }


      $scope.sendEmail = function (ev) {
        var host = window.location.href;
        var rest = "email.php";
        var hostname = host.concat(rest);
        var data= {'name': $scope.name,'email': $scope.email,'subject': '[SITE]','message': $scope.message};
        $http.post(
          hostname,
          data
        ).then(function (response) {
          if(response.data === "Email enviado com sucesso."){
            clearEmail();
          }
        },function(response){
          alert("Não foi possível enviar o email.");
        });
      }

    });
})();
