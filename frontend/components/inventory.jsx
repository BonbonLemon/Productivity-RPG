var React = require('react'),
    InventoryItem = require('./inventoryItem'),
    TaskStore = require('./../stores/task');

var Inventory = React.createClass({
  getInitialState: function () {
    return { items: [] }
  },

  _onChange: function () {
    this.getItems();
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
    this.listener = TaskStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    return (
      <div className="task-type row">
        <h2 className="task-type-name row">Inventory</h2>
        <ul className="items-task-box row">
          {
            this.state.items.map(function (item, idx) {
              if (item.inventory_id) {
                return (
                  <InventoryItem key={idx} task={item}/>
                );
              }
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = Inventory;
