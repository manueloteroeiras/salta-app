angular.module('firebase.config', [])
  .constant('FBURL', 'https://uai-registro.firebaseio.com/')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','google'])

  .constant('loginRedirectPath', '/login');
