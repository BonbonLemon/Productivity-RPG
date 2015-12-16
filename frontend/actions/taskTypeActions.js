var Dispatcher = require('./../dispatcher/Dispatcher'),
    TaskTypeConstants = require('./../constants/taskTypeConstants');
    TaskConstants = require('./../constants/taskConstants');

module.exports = {
  receiveAllTaskTypes: function (taskTypes) {
    Dispatcher.dispatch({
      actionType: TaskTypeConstants.TASKTYPES_RECEIVED,
      taskTypes: taskTypes
    });
  },

  // Task Actions
  receiveSingleTask: function (task) {
    Dispatcher.dispatch({
      actionType: TaskConstants.TASK_RECEIVED,
      task: task
    });
  }
}
