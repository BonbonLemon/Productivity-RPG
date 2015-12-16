var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store,
    TaskTypeConstants = require('./../constants/taskTypeConstants'),
    TaskConstants = require('./../constants/taskConstants');

var TaskTypeStore = new Store(AppDispatcher);

var _taskTypes = {};

var resetTaskTypes = function (taskTypes) {
  _taskTypes = {};
  taskTypes.forEach(function (taskType) {
    _taskTypes[taskType.id] = taskType;
  });
};

var addTask = function (task) {
  _taskTypes[task.type_id].tasks.push(task);
};

TaskTypeStore.all = function () {
  taskTypes = [];
  for (var id in _taskTypes) {
    taskTypes.push(_taskTypes[id]);
  }
  return taskTypes;
};

TaskTypeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TaskTypeConstants.TASKTYPES_RECEIVED:
      resetTaskTypes(payload.taskTypes);
      TaskTypeStore.__emitChange();
      break;
    case TaskConstants.TASK_RECEIVED:
      addTask(payload.task);
      TaskTypeStore.__emitChange();
  }
};

window.TaskTypeStore = TaskTypeStore;

module.exports = TaskTypeStore;
