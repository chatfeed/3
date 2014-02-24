define([
  'jquery'
, 'underscore'
, 'backbone'
, 'threes/app'
, 'threes/views/playing'
], function($, _, Backbone, app, PlayingView) {

  var AppRouter = Backbone.Router.extend({

    routes: {
      "": "home"
    , "playing": "playing"
    }

  , initialize: function() {
      app.wrapper = $('#wrapper')

      // init view
      var fixedHeight = 768
      var viewHeight = $(window).height()
      $('html').css('font-size', (viewHeight/fixedHeight)+'px')
      $(window).resize(_.debounce(function() {
        // var cfm = confirm("You have resized the window. would you like to "
        //   + "refresh to make a adaptation?")
        // if(cfm) {
        //   window.location.reload()
        // }
      }, 300))
    }

  , home: function() {
      this.go('playing')
    }

  , playing: function() {
      var playingView = new PlayingView()
      app.wrapper.html(playingView.render().el)
    }

  , go: function(url) {
      this.navigate(url, {trigger: true})
    }

  })

  function initialize() {
    _.extend(app, {
      router: new AppRouter()
    })
    Backbone.history.start({pushState: false})
  }

  return {
    initialize: initialize
  }
})
