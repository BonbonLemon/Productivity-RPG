var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./../util/api_util'),
    TaskStore = require('./../stores/task'),
    TaskType = require('./taskType'),
    Avatar = require('./avatar');

var Profile = React.createClass({
  getInitialState: function () {
    return { TaskTypes: TaskStore.all() };
  },

  _onChange: function () {
    this.setState({ TaskTypes: TaskStore.all() })
  },

  componentDidUpdate: function () {
    try{
      var profile = ReactDOM.findDOMNode(this.refs.profileRef);
      var sprite = document.querySelector('.sjs');
      if (profile && !sprite) {
        var scene = sjs.Scene({parent: profile, w:300, h:380});
        var stick = scene.Sprite('assets/stick_man.png');
        stick.position(50, 60);
        //TODO hacky
        setTimeout(stick.update.bind(stick), 500);
      }
    }
    catch(e) {

    }
  },

  componentDidMount: function () {
    TaskStore.addListener(this._onChange);
    ApiUtil.fetchAllTaskTypes();
  },

  componentWillUnmount: function () {
    TaskStore.removeListener(this._onChange);
  },

  render: function () {
    if (this.state.TaskTypes.length === 0) {
      return (
        <div>Welcome!</div>
      );
    } else {

      return (
        <div>
          <div ref="profileRef"/>
          <Avatar />
          {
            this.state.TaskTypes.map(function (taskType) {
              return <TaskType key={taskType.id} taskType={taskType} />;
            })
          }
        </div>
      );
    }

    return render;
  }
})

module.exports = Profile;
