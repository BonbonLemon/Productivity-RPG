var React = require('react'),
    InventoryItem = require('./inventoryItem');

var Inventory = React.createClass({
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
