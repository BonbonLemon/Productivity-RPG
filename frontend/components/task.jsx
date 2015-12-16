var React = require('react');

var Task = React.createClass({
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
