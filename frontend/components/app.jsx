var React = require('react'),
    TaskStore = require('./../stores/task'),
    ApiUtil = require('./../util/api_util'),
    NavBar = require('./navBar');

var History = require('react-router').History;

var App = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      TaskTypes: TaskStore.all()
    };
  },

  _onChange: function () {
    this.setState({ TaskTypes: TaskStore.all() });
    var path = this.props.location.pathname;
    if (this.state.TaskTypes[0]) { // NOTE: Logged In
      if (path.indexOf("profile") === -1) {
        this.history.pushState(null, '/profile', {});
      }
    } else { // NOTE: Not logged in
      if (path === "/") {
        this.history.pushState(null, '/home', {});
      }
    }
  },

  componentDidMount: function () {
    this.listener = TaskStore.addListener(this._onChange);
    ApiUtil.fetchAllTaskTypes();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
