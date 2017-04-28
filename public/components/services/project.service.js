(function(){
	'use strict'
	angular
	.module('cshApp')
	.service('projectService', projectService);

	projectService.$inject = ['$log','$http'];
	/*Servicio para profesores y asistentes*/
	function projectService($log,$http){

		var publicApi = {
			addProject: _addProject,
			getProjects: _getProjects,
			getProjectsByTeacher: _getProjectsByTeacher,
        	changeRequestState : _changeProjectsState
		}
		return publicApi;
		//guarda las solicitudes de proyectos
		function _addProject(newProject){
			return $http.post('http://localhost:3000/api/projects/add', newProject);
		}
		//trae la lista de proyectos
	    // function _getProjects(){
	    //   return $http.get('http://localhost:3000/api/projects/load');
	    // }
	    function _getProjects(filter){
	      return $http.put('http://localhost:3000/api/projects/load',filter);
	    }
	    function _getProjectsByTeacher(filter){
	      return $http.put('http://localhost:3000/api/projects/byTeacher',filter);
	    }

	    //actualiza el estado de los proyectos
	    //cambia el estado a aprobado o rechazado según el parámetro
	    function _changeProjectsState(request,newState){
	      request.state=newState;
	      return $http.put('http://localhost:3000/api/projects/update',request);      
	    }
	}
})()