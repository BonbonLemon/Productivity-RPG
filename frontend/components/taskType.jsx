var React = require('react'),
    TaskForm = require('./taskForm'),
    Task = require('./task');

var TaskType = React.createClass({
  getInitialState: function () {
    return ({
      activeSelected: true,
      doneSelected: false
    });
  },

  selectActive: function () {
    if (this.state.doneSelected) {
      this.setState({
        activeSelected: true,
        doneSelected: false
      });
    }
  },

  selectDone: function () {
    if (this.state.activeSelected) {
      this.setState({
        activeSelected: false,
        doneSelected: true
      });
    }
  },

  render: function () {
    var typeName = this.props.taskType.type_name;
    var activeDoneButtons;
    if (typeName === "To-dos") {
      var activeStyle, doneStyle;
      if (this.state.activeSelected) {
        activeStyle = "selected"
      }
      if (this.state.doneSelected) {
        doneStyle = "selected"
      }
      activeDoneButtons = (
        <div className="row">
          <ul className="task-filter col-xs-10 col-xs-offset-1">
            <li className={"active filter col-xs-6 " + activeStyle} onClick={this.selectActive}>Active</li>
            <li className={"done filter col-xs-6 " + doneStyle} onClick={this.selectDone}>Done</li>
          </ul>
        </div>
      )
    }
    return (
      <div className={"task-type-container col-xs-3 "+ typeName}>
        <div className="task-type col-xs-12">
          <h2 className="task-type-name">{typeName}</h2>
          <TaskForm taskType={this.props.taskType} />
          {activeDoneButtons}
          <ul className="task-box row">
            {
              this.props.taskType.tasks.map(function (task, idx) {
                if (task.completed === this.state.doneSelected) {
                  return (
                    <Task key={idx} task={task}/>
                  );
                }
              }.bind(this))
            }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = TaskType;
