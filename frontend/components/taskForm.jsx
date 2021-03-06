var React = require('react'),
    ApiUtil = require('./../util/api_util'),
    History = require('react-router').History,
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var TaskForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {
      title: "",
      moneyReward: 0
    }
  },

  handleRewardChange: function (e) {
    e.preventDefault();
    this.setState({ moneyReward: e.target.value });
  },

  handleTitleChange: function (e) {
    e.preventDefault();
    this.setState({title: e.target.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var newTask = {};
    newTask.type_id = this.props.taskType.id;
    newTask.title = this.state.title;
    newTask.money_reward = this.state.moneyReward;
    ApiUtil.createTask(newTask);
    this.setState({
      title: "",
      moneyReward: 0
    });
  },

  handleMinus: function (e) {
    e.preventDefault();
    this.setState({moneyReward: parseInt(this.state.moneyReward) - 1})
    this.checkNaN();
  },

  handlePlus: function (e) {
    e.preventDefault();
    this.setState({moneyReward: parseInt(this.state.moneyReward) + 1})
    this.checkNaN();
  },

  checkNaN: function () {
    if (isNaN(this.state.moneyReward)) {
      this.setState({ moneyReward: 0 })
    }
  },

  render: function () {
    return (
      <form className="row" id="newTaskForm" onSubmit={this.handleSubmit}>
        <br/>
        <input type="text"
               id="task-text-box"
               className="task-form-text"
               value={this.state.title}
               onChange={this.handleTitleChange}
               placeholder={"Create " + this.props.taskType.type_name}
        />
        <input type="submit"
               className="task-form-text plus-minus-sign"
               value="+"
        />
        <br/>
        <br/>
        <label id="moneyRewardForm">
          <img className="gold-bar" src="/assets/gold_bar.png" /><span> </span>
          <input type="text"
                 name="quantity"
                 value={this.state.moneyReward}
                 className="qty"
                 onChange={this.handleRewardChange}
          />
          <input type="button"
                 value="-"
                 className="qtyminus plus-minus-sign"
                 field="quantity"
                 onClick={this.handleMinus}
          />
          <input type="button"
                 value="+"
                 className="qtyplus plus-minus-sign"
                 field="quantity"
                 onClick={this.handlePlus}
          />
        </label>
      </form>
    );
  }
});

module.exports = TaskForm;
