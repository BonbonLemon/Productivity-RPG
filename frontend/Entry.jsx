var React = require('react'),
    ReactDOM = require('react-dom');

var Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute;

var Profile = require('./components/profile');

var routes = (
  <Route path="/" component={Profile} />
)

document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector('#root');

  if (root) {
    ReactDOM.render(<Router>{routes}</Router>, root);
  }
})

var http = require("http");
setInterval(function() {
    http.get("http://productivity-rpg.herokuapp.com");
}, 300000); // every 5 minutes (300000)
