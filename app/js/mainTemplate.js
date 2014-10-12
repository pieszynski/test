// Moduł DI
(function(window, angular){

  window.DI = new function(){
    var self = this;
    var actions = [];
    var app = angular.module('appRoot',[]);

    app.filter('_.str', function() {
      return function(str, fn, params){
        str = str || '';
        params = params || [];
        params.unshift(str);
        return fn ? _.str[fn].apply(this, params) : str;
      }
    })

    self.registerAction = function(action) {
      if ('function' !== typeof(action))
        return;

      actions.push(action);
    };

    self.registerController = function(name, ctrlDef) {
      app.controller(name, ctrlDef);
    }

    self.registerDirective = function(name, dirDef) {
      app.directive(name, dirDef);
    }

    self.invokeAll = function(){
      for(var f = 0; f < actions.length; f++) {
        actions[f]();
      }
    };
  }();

})(window,angular);

// Główny kontroler strony
(function(window, $, angular){
  DI.registerController('rootCtrl', function(){
    var self = this,
        blockTitleUpdate = false;

    self.pageTitle = undefined;

    self.setPageTitleOnce = function (title) {
      if (blockTitleUpdate)
        return;

      self.pageTitle = title;
      blockTitleUpdate = true;
    }

    DI.root = function() {
      return {
        setPageTitleOnce : self.setPageTitleOnce
      }
    }();
  });

})(window,jQuery,angular);

// dyrektywa daty powstania/edycji artykułu
(function(){
  DI.registerDirective('topDate', function(){
    return {
      restrict : 'E',
      transclude : true,
      template : '<div class="top-date" ng-transclude></div>'
    }
  });
})();

// dyrektywa pokazywania zapytania po kliknięciu
(function($) {
  DI.registerDirective('quizRemember', function(){
    return {
      restrict : 'E',
      scope : {},
      transclude : true,
      controller : ['$scope', function($scope){
        $scope.remember = '';
        $scope.help = '[Nie pamiętam]';
        $scope.doShow = false;
        $scope.showResponse = function(){
          $scope.doShow = true;
        }
      }],
      link: function(scope, element, attrs) {
        scope.remember = attrs.remember;
        if (attrs.help)
          scope.help = attrs.help;
      },
      template : '<span><span ng-transclude></span> <a ng-hide="doShow" ng-click="showResponse()">{{help}}</a><span ng-show="doShow">{{remember}}</span></span>'
    }
  });
})(jQuery);
