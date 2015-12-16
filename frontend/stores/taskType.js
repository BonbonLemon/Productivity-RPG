var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store,
    TaskTypeConstants = require('./../constants/taskTypeConstants');

var TaskTypeStore = new Store(AppDispatcher);

var _taskTypes = [];

var resetTaskTypes = function (taskTypes) {
  _taskTypes = taskTypes;
};

TaskTypeStore.all = function () {
  return _taskTypes.slice();
};

TaskTypeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TaskTypeConstants.TASKTYPES_RECEIVED:
      resetTaskTypes(payload.taskTypes);
      TaskTypeStore.__emitChange();
      break;
  }
};

window.TaskTypeStore = TaskTypeStore;

module.exports = TaskTypeStore;
