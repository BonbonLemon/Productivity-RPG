var Dispatcher = require('./../dispatcher/Dispatcher'),
    TaskConstants = require('./../constants/taskConstants');

module.exports = {
  receiveSingleTask: function (task) {
    Dispatcher.dispatch({
      actionType: TaskConstants.TASK_RECEIVED,
      task: task
    });
  }
}
