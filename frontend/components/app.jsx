var React = require('react'),
    TaskStore = require('./../stores/task'),
    ApiUtil = require('./../util/api_util');

var History = require('react-router').History;

var App = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { TaskTypes: TaskStore.all() };
  },

  _onChange: function () {
    this.setState({ TaskTypes: TaskStore.all() });
    var currUrl = window.location.hash;
    var location = currUrl.substr(2, currUrl.indexOf("?") - 2);
    if (!location) {
      if (this.state.TaskTypes[0]) {
        this.history.pushState(null, '/profile', {});
      } else {
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
