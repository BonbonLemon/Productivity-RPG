var React = require('react'),
    ApiUtil = require('./../util/api_util'),
    TaskStore = require('./../stores/task'),
    TaskType = require('./taskType'),
    Avatar = require('./avatar');

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
        <div>Welcome!</div>
      );
    } else {
      return (
        <div>
          <Avatar />
          {
            this.state.TaskTypes.map(function (taskType) {
              return <TaskType key={taskType.id} taskType={taskType} />;
            })
          }
        </div>
      );
    }

    return render;
  }
})

module.exports = Profile;
