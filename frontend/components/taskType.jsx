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
      <div className={"task-type col-xs-3 container-fluid "+ this.props.taskType.type_name}>
        <div className="task-type-name row">{this.props.taskType.type_name}</div>
        <TaskForm taskType={this.props.taskType} />
        <div className="task-box row">
          {
            this.props.taskType.tasks.map(function (task, idx) {
              return (
                <Task key={idx} task={task}/>
              );
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = TaskType;
