/*Este servicio solo DEBE HACER GETS*/
(function(){
  angular
  .module('cshApp')
  .service('clientsService', clientsService);

  clientsService.$inject = ['$http', 'localStorageService'];

  function clientsService($http,localStorageService){

    var publicAPI = {
      getProjects : _getProjects
      //getClients : _getClients
    };
    return publicAPI;

    //devuelve la lista de proyectos
    function _getProjects(){
      var storedList = localStorageService.get('localProjectsList');
      if(storedList == null){
        projectsList = [];
      }else{
        projectsList = storedList;
      }
      return projectsList;
    }

    /*function _getClients(){
      var storedList = localStorageService.get('localClientList');
      if(storedList == null){
        clientList = [];
      }else{
        clientList = storedList;
      }
      return clientList;
    }*/

  }

})();
