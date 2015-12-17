var React = require('react'),
    ApiUtil = require('./../util/api_util'),
    TaskTypeStore = require('./../stores/taskType'),
    TaskType = require('./taskType'),
    Avatar = require('./avatar');

var Profile = React.createClass({
  getInitialState: function () {
    return { TaskTypes: TaskTypeStore.all() };
  },

  _onChange: function () {
    this.setState({ TaskTypes: TaskTypeStore.all() })
  },

  componentDidMount: function () {
    TaskTypeStore.addListener(this._onChange);
    ApiUtil.fetchAllTaskTypes();
  },

  componentWillUnmount: function () {
    TaskTypeStore.removeListener(this._onChange);
  },

  render: function () {
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
})

module.exports = Profile;
