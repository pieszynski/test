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

    self.registerController = function(name, ctrlDef){
      app.controller(name, ctrlDef);
    }

    self.invokeAll = function(){
      for(var f = 0; f < actions.length; f++) {
        actions[f]();
      }
    };
  }();

})(window,angular);

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
