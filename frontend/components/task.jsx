var React = require('react'),
    ApiUtil = require('./../util/api_util');

var Task = React.createClass({
  handleClick: function () {
    ApiUtil.updateAvatar(this.props.task);
    ApiUtil.deleteTask(this.props.task);
  },

  render: function () {
        // <div className="task-title">{task.title}</div>
        // <div className="task-reward">{task.money_reward}</div>
    var task = this.props.task;
    return (
      <li className="task-item" onClick={this.handleClick}>
        {task.title} ${task.money_reward}
      </li>
    )
  }
});

module.exports = Task;
