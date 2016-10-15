/*
 * Copyright (c) Abhishek 2016. Confidential. All rights reserved.
 * Author: Abihshek Sachdeva.
 */
(function() {
  'use strict';
  angular.module('tooltipDemoApp',[])
        .controller('tooltipDemoController',tooltipDemoController)
        .factory("errorValidateJson",errorValidateJson)
        .directive('errorValidate', errorValidate);

  tooltipDemoController.$inject = ['$scope','errorValidateJson'];

  function tooltipDemoController($scope,errorValidateJson){
    angular.element(document).ready(function(){
        angular.element('[data-toggle="tooltip"]').tooltip();
        angular.element('#anchorTag').focus();
    });

    $scope.errorValidate = errorValidateJson.errorValidate;

    console.log($scope.errorValidate);
    $scope.homemodel = {
      'textfield1':'',
      'textfield2':''
    };
    $scope.homeModelError = {
      'error1':'',
      'error2':''
    };
    $scope.authorName = "Abhishek Sachdeva";

    $scope.checkError1 = function(value){
      if(value === 'admin'){
        $scope.homeModelError.error1 = 'Welcome, Admin';
      } else if (value === 'abhi'){
        $scope.homeModelError.error1 = 'Welcome, Abhishek';
      } else  if (value === 'abhis'){
        $scope.homeModelError.error1 = 'Welcome, Sachdeva';
      } else  if (value === 'ab'){
        $scope.homeModelError.error1 = 'Welcome, DJ @b!';
      } else {
        $scope.homeModelError.error1 = '';
      }
    };

    $scope.checkError2 = function(value){
      // we can check for 10 digit validation in regex also but for demo purpose I am checking here.
      if((value.length > 0) && (value.length !== 10)){
        $scope.homeModelError.error2 = 'Only 10 digit number is allowed.';
      } else {
        $scope.homeModelError.error2 = '';
      }
    };

  }

  function errorValidate(){
    return {
        restrict : "A",
        link : function(scope,element,attr){
          var model = attr.ngModel,
              errorModel = attr.errorMessage,
              errorValue = '',
              fieldValue = '',
              regexObj = {},
              pattern = '';
          // console.log(scope);
          // console.log(element);
          // console.log(attr);
          // Listen for change events to enable binding
          element.on('keyup', function() {
            fieldValue = scope[model.split('.')[0]][model.split('.')[1]];
            // comparing validation rule with some other js and returning error.
            //console.log(attr.validationRule);
            if(attr.validationRule){
              regexObj = scope.errorValidate[attr.validationRule];
              pattern = new RegExp(regexObj.pattern);
            }
            //console.log(pattern.test(fieldValue));
            //returns a boolean if for wrong value it returns true then error message will be true (or be shown).
            if(pattern.test(fieldValue)){
              errorValue = regexObj.message;
            } else {
              errorValue = scope[errorModel.split('.')[0]][errorModel.split('.')[1]];
            }
              console.log(fieldValue +" <==field value__error value==> "+ errorValue);
              $(element[0]).attr('data-original-title', errorValue);
              if(errorValue){
                  console.log("show tooltip");
                  $(element[0]).tooltip('show');
                  $(element[0]).parent().addClass('has-error');
              } else {
                  console.log("hide tooltip");
                  $(element[0]).tooltip('hide');
                  $(element[0]).parent().removeClass('has-error');
              }
          });
        }
    };
  }

  function errorValidateJson(){
    // we can check for 10 digit validation in regex using [^0-9]{10} also but for demo purpose I am checking it under checkError2().
    var errorValidate = {
      "noSpecialChar" : {
          "pattern" :"[^a-zA-Z0-9]",
          "message" : "Special characters are not allowed."
      },
      "onlyNumeric": {
          "pattern" :"[^0-9]",
          "message" : "Only numerics are allowed."
      }
    };

    return{
      errorValidate : errorValidate
    };
  }

})();
