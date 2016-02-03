var React = require('react'),
    TaskForm = require('./taskForm'),
    Task = require('./task');

var TaskType = React.createClass({
  render: function () {
    return (
      <div className={"task-type-container col-xs-3 "+ this.props.taskType.type_name}>
        <div className="task-type col-xs-12">
          <h2 className="task-type-name">{this.props.taskType.type_name}</h2>
          <TaskForm taskType={this.props.taskType} />
          <ul className="task-box row">
            {
              this.props.taskType.tasks.map(function (task, idx) {
                if (!task.completed) {
                  return (
                    <Task key={idx} task={task}/>
                  );
                }
              })
            }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = TaskType;
