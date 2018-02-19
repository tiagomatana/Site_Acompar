/**
 * @param {type} angular
 * @returns {angular.module}
 * @author
 * @since 8/8/2017
 */

(function () {
  'use strict';

  angular
    .module('dialogDemo1', ['ngMaterial'])
    .controller('AppCtrl', function ($scope, $mdDialog, $http) {
      $scope.historico = false;
      $scope.dialogNucleo = true;
      $scope.depoimentos = false;
      $scope.eventos = [{
          dia: "15",
          mes: 'Mai',
          title: 'Aniversário da Acompar',
          detail: 'detalhe do evento'
        },
        {
          dia: "02",
          mes: 'Out',
          title: 'Semana da paz',
          detail: 'detalhe do evento'
        }
      ];
      $scope.status = '';
      $scope.customFullscreen = false;

      function clearEmail(){
        $scope.name = '';
        $scope.email = '';
        $scope.subject = '';
        $scope.message = '';
      }

      $scope.sendEmail = function (ev) {
        var data= {'name': $scope.name,'email': $scope.email,'subject': $scope.subject,'message': $scope.message};
        $http.post(
          "https://acompar.org/home/email.php",
          data
        ).then(function (response) {
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Enviando...')
            .textContent(response.data)
            .ariaLabel('Alert Dialog Demo')
            .ok('FECHAR')
            .targetEvent(ev)
          );
          if(response.data === "Email enviado com sucesso."){
            clearEmail();
          }
        },function(response){
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('ATENÇÃO')
            .textContent(response.data)
            .ariaLabel('Alert Dialog Demo')
            .ok('FECHAR')
            .targetEvent(ev)
          );
        });
      }

      $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        var msg = 'Nosso novo parceiro ' + $scope.status;
        $mdDialog.show(

          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Obrigado!')
          .textContent(msg)
          .ariaLabel('Alert Dialog Demo')
          .ok('FECHAR')
          .targetEvent(ev)
        );
      };

      $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

        $mdDialog.show(confirm).then(function () {
          $scope.status = 'You decided to get rid of your debt.';
        }, function () {
          $scope.status = 'You decided to keep your debt.';
        });
      };

      $scope.showPrompt = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('Novo Parceiro')
          .textContent('Qual é o seu nome?')
          .placeholder('Nome')
          .ariaLabel('name')
          .initialValue('')
          .targetEvent(ev)
          .ok('OK')
          .cancel('Cancelar');

        $mdDialog.show(confirm).then(function (result) {
          $scope.status = result;
          $scope.showAlert(ev);
        }, function () {
          $scope.status = 'Você cancelou a ação.';
        });
      };

      $scope.showAdvanced = function (ev, nucleo, page) {
        self.nucleo = nucleo;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: page + '.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
          .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function () {
            $scope.status = 'You cancelled the dialog.';
          });

      };

      $scope.showTabDialog = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'tabDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function () {
            $scope.status = 'You cancelled the dialog.';
          });
      };

      $scope.showPrerenderedDialog = function (ev) {
        $mdDialog.show({
          contentElement: '#myDialog',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        });
      };

      function DialogController($scope, $mdDialog) {
        $scope.nucleo = self.nucleo;
        $scope.hide = function () {
          $mdDialog.hide();
        };

        $scope.cancel = function () {
          $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        };
        $scope.verify = function () {
          var w = $(window).width();

          if (w > 400) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
})();
