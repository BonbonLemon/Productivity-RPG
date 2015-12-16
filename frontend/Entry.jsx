var React = require('react'),
    ReactDOM = require('react-dom');

var Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute;

var Profile = require('./components/profile');

var routes = (
  <Route path="/" component={Profile}>

  </Route>
)

document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector('#root');

  ReactDOM.render(<Router>{routes}</Router>, root);
})
