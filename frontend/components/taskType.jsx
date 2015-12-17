var React = require('react'),
    TaskForm = require('./taskForm'),
    Task = require('./task');

var TaskType = React.createClass({
  // NOTE: Not usefule atm
  getInitialState: function () {
    return ({tasks: 0});
  },

  render: function () {
    return (
      <div className="taskType">
        {this.props.taskType.type_name}
        <TaskForm taskType={this.props.taskType} />
        {
          this.props.taskType.tasks.map(function (task, idx) {
            return (
              <Task key={idx} task={task}/>
            )
          })
        }
      </div>
    );
  }
});

module.exports = TaskType;
