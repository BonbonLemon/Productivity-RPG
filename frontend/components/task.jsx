var React = require('react'),
    ApiUtil = require('./../util/api_util');

var Task = React.createClass({
  handleClick: function () {
    ApiUtil.updateAvatar(this.props.task);
    ApiUtil.deleteTask(this.props.task);
  },

  render: function () {
    var task = this.props.task;
    return (
      <li className="task-item" onClick={this.handleClick}>
        <div className="task-reward">${task.money_reward}</div>
        <div className="task-description">{task.title}</div>
      </li>
    )
  }
});

module.exports = Task;
