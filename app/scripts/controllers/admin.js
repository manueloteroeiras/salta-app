'use strict';

angular.module('angularFireApp')
  .controller('AdminController', function ($scope, Ref, $firebaseObject,$firebaseArray, user, $location) {
    $scope.preguntasdb = $firebaseArray(Ref.child('preguntas'));
    $scope.answerdb = $firebaseArray(Ref.child('respuestas'));

    $scope.contenido = {
        labels : ["Sin Importancia", "Poco Importante","Importante","Muy Importante", "Fundamental"],
        colors : ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C'],
        data : [0, 0, 0, 0, 0]
    }

    $scope.desarrollo = {
        labels : ["Sin Importancia", "Poco Importante","Importante","Muy Importante", "Fundamental"],
        colors : ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C'],
        data : [0, 0, 0, 0, 0]
    }

    $scope.satisfaccion = {
        labels : ["Sin Importancia", "Poco Importante","Importante","Muy Importante", "Fundamental"],
        colors : ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C'],
        data : [0, 0, 0, 0, 0]
    }


    $scope.editing = false;

    $scope.edit = function (form) {
        $scope.newQuestion = form;
        $scope.editing = true;
    }

    $scope.questions = [
    	{
    		pregunta : '',
    		multiple : false
    	}
    ]

    $scope.newQue = function () {
    	$scope.preguntasdb.$add({
    		titulo : $scope.newQuestion.titulo,
	        questions : $scope.questions,
	        active : false
    	})
    }

    $scope.initial = function () {
      for (var i = 0; i < $scope.answerdb.length; i++) {
        console.log($scope.answerdb[i].contenido);
        $scope.getContenido(i);
        $scope.getDesarrollo(i);
        $scope.getSatisfaccion(i);
      }
    }

    $scope.answerdb.$loaded(function () {
      $scope.initial();
    }).catch(alert);

    $scope.getContenido = function (i) {
      switch ($scope.answerdb[i].contenido) {
        case "Sin Importancia":
          $scope.contenido.data[0] = $scope.contenido.data[0] + 1;
          break;
        case "Poco Importante":
          $scope.contenido.data[1] = $scope.contenido.data[1] + 1;
          break;
        case "Importante":
          $scope.contenido.data[2] = $scope.contenido.data[2] + 1;
          break;
        case "Muy Importante":
          $scope.contenido.data[3] = $scope.contenido.data[3] + 1;
          break;
        case "Fundamental":
          $scope.contenido.data[4] = $scope.contenido.data[4] + 1;
          break;
        default:
      }
    }

    $scope.getDesarrollo = function (i) {
      switch ($scope.answerdb[i].desarrollo) {
        case "Muy Insatisfecho":
          $scope.desarrollo.data[0] = $scope.desarrollo.data[0] + 1;
          break;
        case "Insatisfecho":
          $scope.desarrollo.data[1] = $scope.desarrollo.data[1] + 1;
          break;
        case "Poco Satisfecho":
          $scope.desarrollo.data[2] = $scope.desarrollo.data[2] + 1;
          break;
        case "Satisfecho":
          $scope.desarrollo.data[3] = $scope.desarrollo.data[3] + 1;
          break;
        case "Muy Satisfecho":
          $scope.desarrollo.data[4] = $scope.desarrollo.data[4] + 1;
          break;
        default:
      }
    }

    $scope.getSatisfaccion = function (i) {
      switch ($scope.answerdb[i].satisfaccion) {
        case "Muy Insatisfecho":
          $scope.satisfaccion.data[0] = $scope.satisfaccion.data[0] + 1;
          break;
        case "Insatisfecho":
          $scope.satisfaccion.data[1] = $scope.satisfaccion.data[1] + 1;
          break;
        case "Poco Satisfecho":
          $scope.satisfaccion.data[2] = $scope.satisfaccion.data[2] + 1;
          break;
        case "Satisfecho":
          $scope.satisfaccion.data[3] = $scope.satisfaccion.data[3] + 1;
          break;
        case "Muy Satisfecho":
          $scope.satisfaccion.data[4] = $scope.satisfaccion.data[4] + 1;
          break;
        default:
      }
    }






  });
