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
        classes: 'shepherd-theme-arrows',
        showCancelLink: true,
        scrollTo: true
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
      text: "This is your current gold.<br/>" +
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

    tour.addStep('item-shop-step', {
      text: 'This is the item shop, where<br/>' +
            'you can spend money to<br/>' +
            'customize the way I look.',
      attachTo: '.Items left',
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
      text: 'Habits reward you everytime you do it.<br/>' +
            'Try clicking on "Eat a fruit" and gain<br/>' +
            '3 gold!',
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
      text: 'Dailies can be done once a day. Click<br/>' +
            '"Floss." Notice how you can\'t click it<br/>' +
            'twice.',
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
      text: 'To-dos are deleted upon completion.<br/>' +
            'Click "Learn to click" and notice how<br/>' +
            'it disappears after you click it.',
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
            'reward yourself. Rewards<br/>' +
            'are also deleted on purchase.<br/>' +
            'Go ahead and reward yourself<br/>' +
            'with a pat on the back for<br/>' +
            'getting this far in the tutorial!',
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
            'rewards using these forms.<br/>' +
            'Try creating a "Clean room"<br/>' +
            'Habits task that awards you 2<br/>' +
            'gold.',
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
            "'Party Hat' in the item shop so we<br/>" +
            "can get this productivity party<br/>" +
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
