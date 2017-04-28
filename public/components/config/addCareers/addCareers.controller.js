(function(){
  'use strict'
  angular
  .module('cshApp')
  .controller('configController', configController);

  configController.$inject = ['$scope', 'Upload', 'configService', 'SessionService'];

  function configController($scope, Upload, configService, SessionService){
    var vm = this;
    vm.carrer = {};
    vm.modal = {};
    vm.careers = {};

    configService.getCareers().then(function(res){
      vm.careers = res.data;
    });

    vm.save = function(newCareer){
      console.log(newCareer);
      configService.addCareer(newCareer).then(function(res){
        console.log(res);
        vm.carrer = {};
        vm.modal.title = 'Agregar nueva carreras';
        vm.modal.body = res.data.massage;
      });

          configService.getCareers().then(function(res){
          vm.careers = res.data;
        });
    };

    vm.deleteCareer = function(career){
      configService.deleteCareer({_id:career._id}).then(function(res){
        console.log(res);
      });
      configService.getCareers().then(function(res){
      vm.careers = res.data;
    });
    }
  }
})();