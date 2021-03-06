var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./../util/api_util'),
    TaskStore = require('./../stores/task'),
    TaskType = require('./taskType');

var Shepherd = require("tether-shepherd");

var TaskBlock = React.createClass({
  // mixins: [History],

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

  render: function () {
    return (
      <div className="task-block row">
        {
          this.state.TaskTypes.map(function (taskType) {
            if (taskType.type_name !== "Items") {
              return <TaskType key={taskType.id} taskType={taskType} />;
            }
          })
        }
      </div>
    );
  }
})

module.exports = TaskBlock;
