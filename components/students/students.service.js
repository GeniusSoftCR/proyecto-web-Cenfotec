(function(){
  angular
  .module('cshApp')
  .service('studentService', studentService);

  function studentService(){
    var student = [{}];

    var publicAPI = {
        addStudent : _addStudent,
        getStudent : _getStudent,
        setLocal : localStorageStudent
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que ciuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones



    function _addStudent(pStudent){
      //users.push(pUser);
      student.push(pStudent);
      console.log(pStudent);
      localStorageStudent(student);
    }

    function _getStudent(){
      var listaStored = localStorage.getItem('localStudent');
      if (listaStored == null ) {
        student = [];
      }else {
        student = JSON.parse(listaStored);
      }
      return student;
    }
    
    function localStorageStudent(pStudent){
      localStorage.setItem(['localStudent'], JSON.stringify(pStudent));
    }
  }
})();