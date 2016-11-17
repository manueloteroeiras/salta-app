'use strict';

angular.module('angularFireApp')
  .controller('BlogController', function ($scope, Ref, $firebaseObject,$firebaseArray, user, $location) {
      $scope.postsdb = $firebaseArray(Ref.child('posts'));
      $scope.answerdb = $firebaseArray(Ref.child('respuestas'));



    $scope.createPost = function (post) {
    	$scope.postsdb.$add({
            user : post.user,
	        text : post.text,
	        active : false, 
            ranking : 0
    	})
    }

    $scope.initial = function () {
      // for (var i = 0; i < $scope.answerdb.length; i++) {
        
      // }
      console.log('hello')
    }

    $scope.createComment = function (id, comment) {
        $scope.currentPost = $firebaseArray(Ref.child('posts').child(id).child('comments'));
        console.log($scope.currentPost);
        $scope.currentPost.$add({ text: comment })

    }

    $scope.addRanking = function (id) {
      $scope.currentPost = $firebaseObject(Ref.child('posts').child(id));
      $scope.currentPost.$bindTo($scope, 'changed').then(function () {
          $scope.changed.ranking = $scope.changed.ranking + 1;
      });
    }

    $scope.downRanking = function (id) {
        $scope.currentPost = $firebaseObject(Ref.child('posts').child(id));
        $scope.currentPost.$bindTo($scope, 'changed').then(function () {
            $scope.changed.ranking = $scope.changed.ranking - 1;
        });
    }

    $scope.postsdb.$watch(function() {
      $scope.initial();
    });

    $scope.postsdb.$loaded(function () {
      $scope.initial();

    }).catch(alert);

    // $scope.postsRef.$loaded(function () {
    //   $scope.initial();
    // }).catch(alert);







  });
