'use strict';

angular.module('angularFireApp')
  .filter('reverse', function() {
    return function(items) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  })

  .factory('user', function($location) {
  		var auth = firebase.auth();
  		console.log(auth)
  		var	user = {};
  		var	userDB = {};
  		var	serviceUser = {};
	    var	valid = false;

	    auth.onAuthStateChanged(function(u) {
	      if (u) {
	        user.mail = u.mail;
	        user.id = u.uid;
	        userDB = u;
	      } else {
	        $location.path('/')
	      }
	    });

	    serviceUser.add = function(user) {
	        user.mail = user.mail;
	        user.id = user.uid;
	        valid = true;
	        return user;
	    };
	    serviceUser.getUser = function() {
	        return user;
	    };
	    serviceUser.userDB = function() {
	        return userDB;
	    };

	    serviceUser.isLogin = function () {
	    	return valid
	    }

	    return serviceUser;
	});
