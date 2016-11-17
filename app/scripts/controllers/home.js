'use strict';

angular.module('angularFireApp')
  .controller('HomeCtrl', function ($scope, Ref, $firebaseObject,$firebaseArray, user, $location, $interval,$http) {
    $scope.usersdb = $firebaseArray(Ref.child('users'));
    $scope.preguntasdb = $firebaseArray(Ref.child('preguntas'));
    $scope.answerdb = $firebaseArray(Ref.child('respuestas'));

    $scope.loading = true;

    $scope.sendData = {
      mail : ''
    }

    $scope.answer = {
      contenido : '',
      desarrollo : '',
      satisfaccion : '',
      observaciones : ''
    }

    $scope.bloqued = true;

    $scope.chekBloqued = function () {
        ($scope.sendData.mail.length > 6) ? $scope.bloqued = false : $scope.bloqued = true;  
    }

    $scope.respond = function (category, option) {
      $scope.answer[category] = option;

    }


    $scope.myLoadingImage = {
      height: 100
    }

    $scope.callAtInterval = function() {
      if ($scope.myLoadingImage.height < 200) {
          $scope.myLoadingImage.height = $scope.myLoadingImage.height + 2;
      }else {
        $scope.loading = false;
      }

    }

    $interval( function(){ $scope.callAtInterval(); }, 50);


    $scope.confirmation = function () {
        if ($scope.answer.contenido.length > 2 && $scope.answer.desarrollo.length > 2 && $scope.answer.satisfaccion.length > 2) {
            $scope.uploadToDb($scope.answer);
            $location.path('/blog');
        }
    }

    $scope.uploadToDb = function (answer) {
      $scope.answerdb.$add(answer)
    }

    $scope.sendEmail = function(){

      $http.post('/send', { mail : "manuel.otero@line64.com" } ).then(function (respond) {
        $scope.sendSuccess = true;
      });

    }

    $scope.goToStart = function () {
        if (!$scope.bloqued) {
            $scope.sendEmail();
            $location.path('/start')
        }
    }


    // $scope.preguntasdb.$add({
    //     titulo : 'nueva pregunta',
    //     active: true,
    //     questions : [
    //         {
    //             pregunta : '¿Cómo evalúa el contenido del curso?',
    //             multiple : true,
    //             options : [
    //                 { name : 'Sin Importancia'},
    //                 { name : 'Poco Importante'},
    //                 { name : 'Importante'},
    //                 { name : 'Muy Importante'},
    //                 { name : 'Fundamental'}
    //             ]
    //         },
    //         {
    //             pregunta : '¿Qué opinión tiene respecto del desarrollo de la presentación?',
    //             multiple : true,
    //             options : [
    //                 { name : 'Muy Insatisfecho'},
    //                 { name : 'Insatisfecho'},
    //                 { name : 'Poco Satisfecho'},
    //                 { name : 'Satisfecho'},
    //                 { name : 'Muy Satisfecho'}
    //             ]
    //         },
    //         {
    //             pregunta : '¿Cuál es su nivel de satisfacción respecto la utilidad del curso?',
    //             multiple : true,
    //             options : [
    //                 { name : 'Muy Insatisfecho'},
    //                 { name : 'Insatisfecho'},
    //                 { name : 'Poco Satisfecho'},
    //                 { name : 'Satisfecho'},
    //                 { name : 'Muy Satisfecho'}
    //             ]
    //         },
    //         {
    //             pregunta : 'Observaciones',
    //             multiple : false
    //         }
    //     ]
    // })
    //

    $scope.getSlug = function (elem) {
      return elem.replace(/ /gi, "_")
    }

    $scope.preguntasdb.$loaded(function () {
      $scope.initial();
    }).catch(alert);

    $scope.initial = function () {
        for (var i = $scope.preguntasdb.length - 1; i >= 0; i--) {
            if ($scope.preguntasdb[i].active) {
                $scope.current = $scope.preguntasdb[i]
            }
        }
    }


   $http({
      method: 'GET',
      url: 'slides.json'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.slides = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });

    $scope.currentIndex = 0;

    $scope.isCurrent = function (key) {
        if (key === $scope.currentIndex) {
            return true
        }
    }

    $scope.btn = {
      text : "Siguiente",
      state : false
    }


    $scope.next = function () {
        if ($scope.btn.state) $location.path('/home')
        if ($scope.currentIndex < $scope.slides.length - 1) {
            $scope.currentIndex = $scope.currentIndex + 1
        }else  {
            $scope.btn.text = "Continuar"
            $scope.btn.state = true;
        }
    }

    $scope.prev = function () {
        console.log($scope.currentIndex)
        if ($scope.currentIndex >= 0) {
            $scope.currentIndex = $scope.currentIndex - 1;

        }
    }



  });
