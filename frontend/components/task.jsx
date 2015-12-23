var React = require('react'),
    AvatarStore = require('./../stores/avatar'),
    ApiUtil = require('./../util/api_util');

var Task = React.createClass({
  getInitialState: function () {
    return ({
      Avatar: AvatarStore.get(),
      disable: false
    });
  },

  _onChange: function () {
    this.setState({ Avatar: AvatarStore.get() });
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
        this.setState({disable: true});
        ApiUtil.updateAvatar(task);
        break;
      case "To-dos":
        ApiUtil.updateAvatar(task, ApiUtil.deleteTask(task));
        break;
      case "Rewards":
        if (task.money_reward > this.state.Avatar.money) {
          alert("You don't have enough money for that! :(")
        } else {
          ApiUtil.updateAvatar(task);
        }
        break;
    }
  },

  componentDidMount: function () {
    this.listener = AvatarStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    var task = this.props.task;
    return (
      <div className="task-item container-fluid">
        <div className="row">
          <div className="delete-task-button col-xs-1" onClick={this.handleClickDelete} />
          <button className="task-item-description-button col-xs-11" disabled={this.state.disable} onClick={this.handleClickComplete}>
            <div className="task-item-description container-fluid">
              <div className="task-item-description row">
                <div className="task-reward col-xs-3">
                  <img className="gold-bar" src="/assets/gold_bar.png" /> {task.money_reward}
                </div>
                <div className="task-description col-xs-9">{task.title}</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }
});

module.exports = Task;
