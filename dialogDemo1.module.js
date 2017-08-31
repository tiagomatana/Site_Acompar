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
        .controller('AppCtrl', function($mdDialog) {
            var self = this;
            self.status = '';
            self.customFullscreen = false;

            self.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
                $mdDialog.show(

                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('This is an alert title')
                    .textContent('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
              };

              self.showConfirm = function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                      .title('Would you like to delete your debt?')
                      .textContent('All of the banks have agreed to forgive you your debts.')
                      .ariaLabel('Lucky day')
                      .targetEvent(ev)
                      .ok('Please do it!')
                      .cancel('Sounds like a scam');

                $mdDialog.show(confirm).then(function() {
                  self.status = 'You decided to get rid of your debt.';
                }, function() {
                  self.status = 'You decided to keep your debt.';
                });
              };

  self.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('What would you name your dog?')
      .textContent('Bowser is a common name.')
      .placeholder('Dog name')
      .ariaLabel('Dog name')
      .initialValue('Buddy')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('I\'m a cat person');

    $mdDialog.show(confirm).then(function(result) {
      self.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      self.status = 'You didn\'t name your dog.';
    });
  };

  self.showAdvanced = function(ev) {
      var w = window.innerWidth;
    console.log(w);
      if(w>200){
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'dialog1.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              self.status = 'You said the information was "' + answer + '".';
            }, function() {
              self.status = 'You cancelled the dialog.';
            });
      }else{
          var confirm = $mdDialog.confirm()
                      .title('Desculpe...')
                      .textContent('Acesse o site atráves de um computador para visualizar esse conteúdo!')
                      .ariaLabel('Alert')
                      .targetEvent(ev)
                        .ok('Entendi')
                      .cancel('');

                $mdDialog.show(confirm).then(function() {
                  self.status = 'You decided to get rid of your debt.';
                }, function() {
                  self.status = 'You decided to keep your debt.';
                });
      }
  };

  self.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          self.status = 'You said the information was "' + answer + '".';
        }, function() {
          self.status = 'You cancelled the dialog.';
        });
  };

  self.showPrerenderedDialog = function(ev) {
    $mdDialog.show({
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  function DialogController(self, $mdDialog) {
    self.hide = function() {
      $mdDialog.hide();
    };

    self.cancel = function() {
      $mdDialog.cancel();
    };

    self.answer = function(answer) {
      $mdDialog.hide(answer);
    };

  }
});
})();
