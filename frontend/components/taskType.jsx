var React = require('react'),
    TaskForm = require('./taskForm'),
    Task = require('./task');

var TaskType = React.createClass({
  getInitialState: function () {
    return ({tasks: 0});
  },

  handleSubmit: function () {
    console.log("hello");
    this.setState({tasks: 0});
  },

  render: function () {
    return (
      <div>
        <ul className="taskType">
          {this.props.taskType.type_name}
          <TaskForm taskType={this.props.taskType} onSubmit={this.handleSubmit} />
          {
            this.props.taskType.tasks.map(function (task, idx) {
              return (
                <Task key={idx} task={task}/>
              )
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = TaskType;
