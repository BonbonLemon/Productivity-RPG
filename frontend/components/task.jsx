var React = require('react'),
    AvatarStore = require('./../stores/avatar'),
    ApiUtil = require('./../util/api_util');

var Task = React.createClass({
  getInitialState: function () {
    return ({
      Avatar: AvatarStore.get(),
      disable: this.props.task.completed
    });
  },

  _onChange: function () {
    this.setState({ Avatar: AvatarStore.get() });
  },

  handleClickComplete: function () {
    this.handleTaskType();
  },

  handleClickDelete: function (e) {
    e.stopPropagation();
    ApiUtil.deleteTask(this.props.task);
    this.setState({disable: false});
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
        this.setState({disable: true});
        ApiUtil.updateAvatar(task);
        setTimeout(function () {
          task.completed = true;
          ApiUtil.updateTask(task);
          this.setState({disable: false});
        }.bind(this), 1000);
        break;
      case "Rewards":
        if (task.money_reward > this.state.Avatar.money) {
          alert("You don't have enough money for that! :(")
        } else {
          ApiUtil.updateAvatar(task, ApiUtil.deleteTask(task));
        }
        break;
      case "Items":
        if (task.money_reward > this.state.Avatar.money) {
          alert("You don't have enough money for that! :(")
        } else {
          task.inventory_id = this.state.Avatar.inventory.id;
          ApiUtil.updateTask(task);
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
            // <div className="delete-task-button col-xs-1" onClick={this.handleClickDelete} />
    if (task.task_type.type_name === "Items") {
      return (
        <li className="task-item container-fluid">
          <div className="row">
            <button className="task-item-description-button col-xs-12" disabled={this.state.disable} onClick={this.handleClickComplete}>
              <div className="task-item-description container-fluid">
                <div className="task-item-description row">
                  <div className="task-reward col-xs-3">
                    <img className="gold-bar" src="/assets/gold_bar.png" /> {task.money_reward}
                  </div>
                  <div className="task-description col-xs-6">{task.title}</div>
                  <img className="item-image" src={task.equipment.url}/>
                </div>
              </div>
            </button>
          </div>
        </li>
      )
    } else {
            // <div className="delete-task-button col-xs-1" onClick={this.handleClickDelete} />
      return (
        <li className="task-item container-fluid">
          <div className="row">
            <button className="task-item-description-button col-xs-12" disabled={this.state.disable} onClick={this.handleClickComplete}>
              <div className="task-item-description container-fluid">
                <div className="task-item-description row">
                  <div className="task-reward col-xs-3">
                    <img className="gold-bar" src="/assets/gold_bar.png" /> {task.money_reward}
                  </div>
                  <div className="task-description col-xs-9">
                    <div className="container-fluid">
                      <div className="row">
                        <p className="col-xs-9">{task.title}</p>
                        <div className="col-xs-1">
                          <i className="fa fa-trash-o" onClick={this.handleClickDelete}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </li>
      );
    }
  }
});

module.exports = Task;
