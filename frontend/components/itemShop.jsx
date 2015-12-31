var React = require('react'),
    ApiUtil = require('./../util/api_util'),
    Task = require('./task');

var ItemShop = React.createClass({
  getInitialState: function () {
    return { items: [] }
  },

  getItems: function () {
    $.ajax({
      url: "api/task_types/",
      method: "GET",
      success: function (taskTypes) {
        this.setState({ items: taskTypes[4].tasks });
      }.bind(this)
    })
  },

  componentDidMount: function () {
    this.getItems();
  },

  render: function () {
    return (
      <div className="task-type Items col-xs-3 col-xs-offset-2 container-fluid">
        <div className="task-type-name row">Item Shop</div>
        <div className="task-box row">
          {
            this.state.items.map(function (item, idx) {
              return (
                <Task key={idx} task={item}/>
              );
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = ItemShop;
