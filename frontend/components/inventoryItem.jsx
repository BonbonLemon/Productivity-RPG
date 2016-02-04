var React = require('react'),
    AvatarStore = require('./../stores/avatar'),
    ApiUtil = require('./../util/api_util');

var InventoryItem = React.createClass({
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
    var task = this.props.task;
    task.money_reward = 0;
    ApiUtil.updateTask(task);
    ApiUtil.updateAvatar(task);
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
      <li className="task-item col-xs-4">
        <div className="row">
          <button className="task-item-description-button col-xs-12" disabled={this.state.disable} onClick={this.handleClickComplete}>
            <div className="task-item-description container-fluid">
              <div className="task-item-description row">
                <div className="task-description col-xs-6">{task.title}</div>
                <img className="item-image" src={task.equipment.url}/>
              </div>
            </div>
          </button>
        </div>
      </li>
    )
  }
});

module.exports = InventoryItem;
