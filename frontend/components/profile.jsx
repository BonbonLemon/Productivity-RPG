var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./../util/api_util'),
    TaskStore = require('./../stores/task'),
    TaskType = require('./taskType'),
    sjs = require('../util/sprite'),
    Avatar = require('./avatar'),
    NavBar = require('./navBar');

var Profile = React.createClass({
  getInitialState: function () {
    return { TaskTypes: TaskStore.all() };
  },

  _onChange: function () {
    this.setState({ TaskTypes: TaskStore.all() })
  },

  componentDidMount: function () {
    TaskStore.addListener(this._onChange);
    ApiUtil.fetchAllTaskTypes();
  },

  componentWillUnmount: function () {
    TaskStore.removeListener(this._onChange);
  },

  render: function () {
    if (this.state.TaskTypes.length === 0) {
      return (
        <div>
          <NavBar loggedIn={false}/>
          <div className="heartbeat-loader">
            Loading…
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile container">
          <NavBar loggedIn={true}/>
          <Avatar className="row"/>
          <div className="task-block">

          {
            this.state.TaskTypes.map(function (taskType) {
              return <TaskType key={taskType.id} taskType={taskType} />;
            })
          }
          </div>
        </div>
      );
    }

    return render;
  }
})

module.exports = Profile;
