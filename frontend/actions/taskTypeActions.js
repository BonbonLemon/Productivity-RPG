var Dispatcher = require('./../dispatcher/Dispatcher'),
    TaskTypeConstants = require('./../constants/taskTypeConstants');

module.exports = {
  receiveAllTaskTypes: function (taskTypes) {
    Dispatcher.dispatch({
      actionType: TaskTypeConstants.TASKTYPES_RECEIVED,
      taskTypes: taskTypes
    });
  }
}
