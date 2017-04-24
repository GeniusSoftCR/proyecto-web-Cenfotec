(function(){
  'use strict'
  angular
    .module('cshApp')
    .controller('studentController', studentController);
    
    studentController.$inject  = ['$scope','$window','userService','ImageService','filepickerService','Upload','addCareersService'];

    function studentController($scope,$window,userService,ImageService,filepickerService,Upload,addCareersService){
      var vm = this,
          careers = addCareersService.getCareer(); //llama a la funcion que llena el mutiselect
          vm.cloudObj = ImageService.getConfiguration();
          vm.careers = careers; //guarda las carreras
          vm.pickFile = pickFile;
          vm.onSuccess = onSuccess;
          vm.submitted = false;


          //En el input de Avatar muestra al lado de escoger, la imagen que se ha seleccionad
          $(function() {

            // We can attach the `fileselect` event to all file inputs on the page
            $(document).on('change', ':file', function() {
              var input = $(this),
                  numFiles = input.get(0).files ? input.get(0).files.length : 1,
                  label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
              input.trigger('fileselect', [numFiles, label]);
            });

            // We can watch for our custom `fileselect` event like this
            $(document).ready( function() {
                $(':file').on('fileselect', function(event, numFiles, label) {

                    var input = $(this).parents('.input-group').find(':text'),
                        log = numFiles > 1 ? numFiles + ' files selected' : label;

                    if( input.length ) {
                        input.val(log);
                    } else {
                        if( log ) alert(log);
                    }

                });
            });
          });



     //funcion que guarda archivos
      
    function pickFile(){
      filepickerService.pick(
        {extension: '.pdf',
          language: 'es',
          container: 'modal',
          services: ['COMPUTER']
        },
        onSuccess
      );
    };
    function onSuccess(Blob){
      console.log(Blob);
      vm.resumeUrl = Blob.url;
    };


      // cloudinary
      vm.preSave = function(){
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            vm.save(data.url);
          });
      }
      vm.save= function(pimage){
        var newUser ={
          idNum : vm.id,
          name : vm.name,
          surname : vm.surName,
          secondSurname : vm.secondSurname,
          email : vm.email,
          phone : vm.phone,
          avatar : pimage,
          password : vm.password,
          //confirmPassword : vm.confirmPassword,
          state: 'postulate',
          role: 'student',
          birthdate : vm.birthdate,
          careers : vm.careers, //me parece q esto deberia ser un arreglo
          justification: null,
          resumeUrl : vm.resumeUrl,
          githubUrl : vm.githubUrl,
          websiteUrl : vm.websiteUrl    
          };

        console.log(newUser);
        //envia el usuario al user.service
        userService.addUser(newUser).then(function(res){
              console.log(res)
          });
      };
  }
})();