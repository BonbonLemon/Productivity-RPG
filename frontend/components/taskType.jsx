var React = require('react');

var TaskType = React.createClass({
  render: function () {
    return (
      <div>
        <ul className="taskType">{this.props.taskType.type_name}
          {
            this.props.taskType.tasks.map(function (task, idx) {
              return (
                <li className="task" key={idx}>{task.title} ${task.money_reward}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = TaskType;
