var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./../util/api_util'),
    TaskStore = require('./../stores/task'),
    TaskType = require('./taskType'),
    sjs = require('../util/sprite'),
    Avatar = require('./avatar'),
    NavBar = require('./navBar'),
    Footer = require('./footer');

var History = require('react-router').History;

var Shepherd = require("tether-shepherd");

var Profile = React.createClass({
  getInitialState: function () {
    return { TaskTypes: TaskStore.all() };
  },

  _onChange: function () {
    this.setState({ TaskTypes: TaskStore.all() });
    if (this.state.TaskTypes[0]) {
      var currentUser = this.state.TaskTypes[0].user;

      if (!currentUser.tutorial) {
        ApiUtil.updateUser(currentUser.id);
        currentUser.tutorial = true;
        this.giveTour();
      }
    }
  },

  giveTour: function () {
    var tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-default',
        showCancelLink: true
      }
    });

    tour.addStep('introduction-step', {
      title: 'Welcome!',
      text: 'Welcome to Productivity-RPG!<br/>' +
            'Let me give you a tour!',
      attachTo: '.sjs right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('avatar-step', {
      title: 'Customize Your Avatar',
      text: "I'm your personal avatar! I will " +
            "represent you as you progress.",
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

    tour.addStep('todos-step', {
      title: 'To-Do List',
      text: 'Check off To-Dos by clicking them ' +
            'to earn gold!',
      attachTo: '.To-dos top',
      when: {
        show: function () {
          window.scrollTo(0, 150);
        }
      },
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
      title: 'Daily Tasks',
      text: 'Dailies repeat every day.',
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

    tour.addStep('habits-step', {
      title: 'Good & Bad Habits',
      text: 'Habits reward you everytime you do it. ' +
            'Bad habits will punish you.',
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

    tour.addStep('item-shop-step', {
      title: 'Item Shop',
      text: 'Spend your hard-earned gold here! ' +
            'Purchase equipment for your avatar!',
      attachTo: '.Items left',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
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
      title: 'Reward List',
      text: 'Or set custom rewards for yourself.',
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
      title: 'Create Custom Tasks',
      text: 'create tasks and rewards with ' +
            'these forms. Set custom names and gold rewards.',
      attachTo: '#newTaskForm right',
      when: {
        show: function () {
          window.scrollTo(0, 200);
        }
      },
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
      title: 'The End!',
      text: "And that's it! Now go find the free " +
            "'Party Hat' in the item shop so we " +
            "can get this productivity party " +
            "started!",
      attachTo: '.sjs right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
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
  },

  componentDidMount: function () {
    this.listener = TaskStore.addListener(this._onChange);
    ApiUtil.fetchAllTaskTypes();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onClick: function () {
    $.ajax({
      url: "/users/",
      method: "POST",
      data: {user: {username: "Guest", password: "n3k8c0sap19"}},
      success: function () {
        window.location = '/';
      }
    })
  },

  render: function () {
    if (this.state.TaskTypes.length === 0) {
      return (
        <div>
          <NavBar loggedIn={false}/>
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog modal-sm">
              <div className="heartbeat-loader">Loading…</div>
              <br/><br/>
              <span>Your profile is being setup...</span>
            </div>
          </div>
          <div className="row">
            <img className="col-xs-8 col-xs-offset-2" src="/assets/logo.png" />
          </div>
          <div className="row">
            <button className="col-xs-2 col-xs-offset-5 col-centered" data-toggle="modal" data-target="#myModal" onClick={this.onClick}>Sign in as guest</button>
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
