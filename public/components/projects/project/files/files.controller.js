(function(){
  angular
    .module('cshApp')
    .controller('filesController', filesController);
    
    filesController.$inject = ['$q','$stateParams','projectService', 'userService','AuthService','filepickerService'];

    function filesController($q, $stateParams, projectService, userService,AuthService, filepickerService){
      
      var vm = this;
      vm.user = AuthService.getAuthUser();
      vm.project = {};        //proyecto actual
      vm.projectFiles = [];   //lista temporal de archivos
      vm.file = {};           //archivo específico a borrar

      //trae el proyecto actual
      projectService.getProjects({_id:$stateParams.id}).then(function (res) {
          vm.project=res.data[0];
          init();
      });

      function init() {
        vm.projectFiles=vm.project.files;
      }

      /*ACTUALIZAR LISTA DE ARCHIVOS*/
      vm.loadProjectFiles= function(){
        //copia la lista de archivos del proyecto actual
        vm.projectFiles=vm.project.files;
      }
      vm.loadProjectFiles();

      //Inicio: Manejo de archivos
      vm.pickFile = pickFile;
      vm.onSuccess = onSuccess;
      function pickFile(){
        filepickerService.pick(
          {extension:'.pdf',
          language: 'es',
          container: 'modal',
          services: ['COMPUTER']},onSuccess
        );
      };
      function onSuccess(Blob){
        vm.fileName = Blob.filename;
        vm.fileUrl = Blob.url;
        vm.addNewFile();
      };
      //Fin: Manejo de archivos

      /*AGREGAR ARCHIVO*/
      vm.addNewFile= function(){
        //pickFile();
        //1)crea un objeto para el nuevo archivo
        var newFile = {name:vm.fileName,url:vm.fileUrl};
        //2)agrega el objeto a la lista de archivos(temporal)
        vm.projectFiles.push(newFile);
        //3)actualiza la lista de archivos en el proyecto actual
        vm.project.files=vm.projectFiles;
        //4)persiste los cambios en el back end
        projectService.updateProject(vm.project).then(function(res){
          //console.log("Archivo agregado");
        });
        $('#filesRetro-Modal').modal('show');
        vm.msg="Archivo agregado al proyecto";
        //refresca la lista de archivos
        vm.loadProjectFiles();
      }

      vm.pre= function(file){
        $('#filesConfirm-Modal').modal('show');
        vm.yesFile=file;
        // if(vm.flag==true){
        //   $('#filesConfirm-Modal').modal('hide');
        //   vm.removeFile(file);
        // }
      }
      /*ELIMINAR ARCHIVO*/
      vm.removeFile= function(file){
        $('#filesConfirm-Modal').modal('hide');
        vm.file = file;
        var position = null;
        //busca el index del archivo
        angular.forEach(vm.projectFiles, function(pfile,index) {
          if (pfile.url === vm.file.url) {
            position = index;
          }
        });
        //2)borra el archivo de la lista de archivos
        vm.projectFiles.splice(position,1);
        //3)actualiza la lista de archivos en el proyecto actual
        vm.project.files=vm.projectFiles;
        //4)persiste los cambios en el back end
        projectService.updateProject(vm.project).then(function(res){
          //console.log("Archivo eliminado");
        });
        $('#filesRetro-Modal').modal('show');
        vm.msg="Archivo eliminado del proyecto";
        //refresca la lista de archivos
        vm.loadProjectFiles();
      }

    }//fin del objeto de angular

})();
