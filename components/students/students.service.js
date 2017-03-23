(function(){
  angular
  .module('cshApp')
  .service('studentService', studentService);

  studentService.$inject = ['$http','localStorageService'];

  function studentService($http,localStorageService){



     var studentStates = [
          {
            "id":1,
            "state": "postulate",
            "name":"Postulado"
          },
          {
            "id":2,
            "state": "elegible",
            "name":"Elegible"
          },
          {
            "id":3,
            "state": "active",
            "name":"Active"
          },
          {
            "id":4,
            "state": "inactive",
            "name":"Inactivo"
          },
          {
            "id":5,
            "state": "rejected",
            "name":"Rechazado"
          },
          {
            "id":6,
            "state": "vetoed",
            "name":"Vetado"
          }                             
        ];
    var student = [];


    var publicAPI = {
        addStudent : _addStudent,
        getStudent : _getStudent
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que ciuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones



    function _addStudent(pStudent){
      //users.push(pUser);
      student.push(pStudent);
      localStorageService.set('localStudents',student);
    }

    function _getStudent(){
        var listaStored = localStorageService.get('localStudents');
      if (listaStored == null ) {
        student = [];
      }else {
        student = listaStored;
      };
      return listaStored;
    }
  
  }
})();