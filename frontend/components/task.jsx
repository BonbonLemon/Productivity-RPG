var React = require('react');

var Task = React.createClass({
        // <div className="task-title">{task.title}</div>
        // <div className="task-reward">{task.money_reward}</div>
  render: function () {
    var task = this.props.task;
    return (
      <div className="task">
        {task.title} ${task.money_reward}
      </div>
    )
  }
});

module.exports = Task;
