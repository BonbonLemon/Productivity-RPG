var React = require('react'),
    ReactDOM = require('react-dom');

var Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute;

var App = require('./components/app'),
    Home = require('./components/home'),
    Profile = require('./components/profile');

var routes = (
  <Route path="/" component={App}>
    <Route path="home" component={Home}></Route>
    <Route path="tasks" component={Profile}></Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector('#root');

  if (root) {
    ReactDOM.render(<Router>{routes}</Router>, root);
  }
})
