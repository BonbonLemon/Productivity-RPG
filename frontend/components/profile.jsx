var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./../util/api_util'),
    TaskStore = require('./../stores/task'),
    TaskType = require('./taskType'),
    sjs = require('../util/sprite'),
    Avatar = require('./avatar'),
    NavBar = require('./navBar');

var Shepherd = require("tether-shepherd");

var Profile = React.createClass({
  getInitialState: function () {
    return { TaskTypes: TaskStore.all() };
  },

  _onChange: function () {
    this.setState({ TaskTypes: TaskStore.all() });
    var currentUser = this.state.TaskTypes[0].user;

    if (!currentUser.tutorial) {
      ApiUtil.updateUser(currentUser.id);
      currentUser.tutorial = true;

      var tour = new Shepherd.Tour({
        defaults: {
          classes: 'shepherd-theme-arrows',
          showCancelLink: true
        }
      });

      tour.addStep('introduction-step', {
        text: 'Welcome to Productivity-RPG, the<br/>' +
              'to-do list app that turns your life<br/>' +
              'into a game! Let me give you a tour!',
        attachTo: '.sjs right',
        buttons: [
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep('avatar-step', {
        text: "I'm your personal avatar! Think of<br/>" +
              "me as a representation of how well<br/>" +
              "you're doing in with all your tasks.",
        attachTo: '.sjs right',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep('money-step', {
        text: "This is your current money.<br/>" +
              "It will increase whenever<br/>" +
              "you complete a task.",
        attachTo: '.current-money-text right',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep('task-block-step', {
        text: 'This is your tasks block, where you<br/>' +
              'can create and complete tasks. You<br/>' +
              'can buy rewards here as well. Complete<br/>' +
              'tasks and buy rewards by clicking on<br/>' +
              'them! I split your tasks into 3 categories:',
        attachTo: '.task-block top',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep('habits-step', {
        text: 'Habits reward you everytime you do it.',
        attachTo: '.Habits top',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep('dailies-step', {
        text: 'Dailies can be done once a day.',
        attachTo: '.Dailies top',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep('todos-step', {
        text: 'To-dos are deleted upon completion.',
        attachTo: '.To-dos top',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep('rewards-step', {
        text: 'You can spend your gold to<br/>' +
              'reward yourself or customize<br/>' +
              'me with equipment.',
        attachTo: '.Rewards top',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          },
        ]
      });

      tour.addStep('form-step', {
        text: 'Create custom tasks and<br/>' +
              'rewards using these forms.',
        attachTo: '#newTaskForm right',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          },
        ]
      });

      tour.addStep('completed-step', {
        text: "And that's it! Now go find the free<br/>" +
              "'Party Hat' in the rewards section<br/>" +
              "so we can get this productivity party<br/>" +
              "started!",
        attachTo: '.sjs right',
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Finish',
            action: tour.next
          },
        ]
      });

      tour.start();
    }
  },

  componentDidMount: function () {
    this.listener = TaskStore.addListener(this._onChange);
    ApiUtil.fetchAllTaskTypes();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    if (this.state.TaskTypes.length === 0) {
      return (
        <div>
          <NavBar loggedIn={false}/>
          <div className="row">
            <img className="blah col-xs-8 col-xs-offset-2" src="/assets/logo.png" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile container-fluid">
          <NavBar loggedIn={true}/>
          <Avatar/>
          <div className="task-block row">
            {
              this.state.TaskTypes.map(function (taskType) {
                if (taskType.type_name === "Items") {
                  return;
                } else {
                  return <TaskType key={taskType.id} taskType={taskType} />;
                }
              })
            }
          </div>
        </div>
      );
    }

    return render;
  }
})

module.exports = Profile;
