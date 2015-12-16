var React = require('react');

var TaskForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      moneyReward: 0
    }
  },

  handleRewardChange: function (e) {
    this.setState({ moneyReward: e.target.value });
  },

  handleTitleChange: function (e) {
    this.setState({title: e.target.value});
  },

  checkSubmit: function (e) {
    if (e.which === 13) {
      e.preventDefault();
      this.setState({
        title: "",
        moneyReward: 0
      });
    }
  },

  handleMinus: function () {
    this.setState({moneyReward: parseInt(this.state.moneyReward) - 10})
    this.checkNaN();
  },

  handlePlus: function () {
    this.setState({moneyReward: parseInt(this.state.moneyReward) + 10})
    this.checkNaN();
  },

  checkNaN: function () {
    if (isNaN(this.state.moneyReward)) {
      this.setState({ moneyReward: 0 })
    }
  },

  render: function () {
    return (
      <form id="newTaskForm">
        Create new {this.props.taskTypeName}
        <input type="text"
               value={this.state.title}
               onChange={this.handleTitleChange}
               onKeyPress={this.checkSubmit}
        />
        <br/>
        <label id="moneyRewardForm">$
          <input type="text"
                 name="quantity"
                 value={this.state.moneyReward}
                 className="qty"
                 onChange={this.handleRewardChange}
          />
          <input type="button"
                 value="-"
                 className="qtyminus"
                 field="quantity"
                 onClick={this.handleMinus}
          />
          <input type="button"
                 value="+"
                 className="qtyplus"
                 field="quantity"
                 onClick={this.handlePlus}
          />
        </label>
      </form>
    );
  }
});

module.exports = TaskForm;
