var React = require('react'),
    ApiUtil = require('./../util/api_util'),
    TaskTypeStore = require('./../stores/taskType'),
    TaskType = require('./taskType');

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

  render: function () {
    return (
      <div>
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
