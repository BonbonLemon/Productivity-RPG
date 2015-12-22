var React = require('react'),
    ApiUtil = require('./../util/api_util');

var Task = React.createClass({
  getInitialState: function () {
    return ({disable: false});
  },

  handleClickComplete: function () {
    this.handleTaskType();
  },

  handleClickDelete: function () {
    ApiUtil.deleteTask(this.props.task);
  },

  handleTaskType: function () {
    var task = this.props.task;
    switch (task.task_type.type_name) {
      case "Habits":
        ApiUtil.updateAvatar(task);
        break;
      case "Dailies":
        // NOTE: Enables on page reload. JavaScript is not the language to for
        // this job of reseting disabled at 12am every night. If I had to, the
        // code would look something like this:
        // window.setInterval(function () {
        //   var date = new Date();
        //   if (date.getHours() === 0 && date.getMinutes() === 0) {
        //     e.currentTarget.disabled = false;
        //   }
        // }, 60000)
        ApiUtil.updateAvatar(task);
        this.setState({disable: true});
        break;
      case "To-dos":
        ApiUtil.updateAvatar(task, ApiUtil.deleteTask(task));
        break;
      case "Rewards":
        ApiUtil.updateAvatar(task);
        // ApiUtil.updateAvatar(task, ApiUtil.deleteTask(task));
        break;
    }
  },

  render: function () {
    var task = this.props.task;
    return (
      <div className="task-item">
        <button className="task-item-descriptions" disabled={this.state.disable} onClick={this.handleClickComplete}>
          <div className="task-reward">
            <img className="gold-bar" src="/assets/gold_bar.png" /> {task.money_reward}
          </div>
          <div className="task-description">{task.title}</div>
        </button>
        <div className="delete-task-button" onClick={this.handleClickDelete}/>
      </div>
    );
  }
});

module.exports = Task;
