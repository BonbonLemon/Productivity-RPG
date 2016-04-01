var React = require('react'),
    ReactDOM = require('react-dom');

var Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute;

var App = require('./components/app'),
    Home = require('./components/home'),
    Login = require('./components/login'),
    SignUp = require('./components/signUp'),
    Profile = require('./components/profile'),
    TaskBlock = require('./components/taskBlock'),
    Inventory = require('./components/inventory');

var routes = (
  <Route path="/" component={App}>
    <Route path="home" component={Home}></Route>
    <Route path="login" component={Login}></Route>
    <Route path="signup" component={SignUp}></Route>
    <Route path="profile" component={Profile}>
      <Route path="tasks" component={TaskBlock}></Route>
      <Route path="inventory" component={Inventory}></Route>
    </Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector('#root');

  if (root) {
    ReactDOM.render(<Router>{routes}</Router>, root);
  }
})
