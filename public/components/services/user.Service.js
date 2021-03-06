(function(){
  'use strict'
  angular
  .module('cshApp')
  .service('userService', userService);
  
  userService.$inject = ['$log','$http','HOST_CONFIG','SessionService'];

  /*Servicio para profesores y asistentes*/
  function userService($log,$http,HOST_CONFIG,SessionService){
    // $http.defaults.headers.common['Authorization'] = 'Bearer ' + SessionService.session.token;
    
    var host = HOST_CONFIG.address;

    /*Servicio para profesores*/
    var users = [];

    //API
    var publicAPI = {
        addUser : _addUser,
        getUsers: _getUsers,
        trackTime:_trackTime,
        changeRequestState : _changeStudentsState
    };
    return publicAPI;

    //recibe el user enviado por el controlador y lo pasa al back-end
    function _addUser(newUser){
      return $http.post('http://'+host+':3000/api/user/add', newUser);
    }

    //ALGUIEN ESTá USANDO ESTA???
    // function _getUsers(){
    //   return $http.get('http://'+host+':3000/api/users');
    // }
    //*****************************************************

    //con PUT traemos los usuarios bajo CUALQUIER CRITERIO
    function _getUsers(filter){
      return $http.put('http://'+host+':3000/api/users/search', filter);
    }

    function _trackTime(obj) {
      return $http.post('http://localhost:3000/api/user/track-time',obj);
    } 

    //procesa solicitudes de estudiantes
    function _changeStudentsState(request,newState){
      request.state=newState;
      return $http.put('http://'+host+':3000/api/user/students/update',request);      
    }

  }
})();