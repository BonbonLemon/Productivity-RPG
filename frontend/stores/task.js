var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store,
    TaskTypeConstants = require('./../constants/taskTypeConstants'),
    TaskConstants = require('./../constants/taskConstants');

var TaskStore = new Store(AppDispatcher);

var _taskTypes = {};

var resetTaskTypes = function (taskTypes) {
  _taskTypes = {};
  taskTypes.forEach(function (taskType) {
    _taskTypes[taskType.id] = taskType;
  });
};

var addTask = function (task) {
  var oldTask = TaskStore.find(task);
  if (oldTask) {
    oldTask.completed = true;
  } else {
    _taskTypes[task.type_id].tasks.push(task);
  }
};

var findTaskIdx = function (tasksArr, task) {
  var idx;
  tasksArr.forEach(function (taskEl, i) {
    if (taskEl.id === task.id) {
      idx = i;
      return;
    }
  });
  return idx;
};

var removeTask = function (task) {
  var tasksArr = _taskTypes[task.type_id].tasks;
  var taskIdx = findTaskIdx(tasksArr, task);

  tasksArr.splice(taskIdx, 1);
};

TaskStore.all = function () {
  taskTypes = [];
  for (var id in _taskTypes) {
    taskTypes.push(_taskTypes[id]);
  }
  return taskTypes;
};

TaskStore.find = function (task) {
  var tasksArr = _taskTypes[task.type_id].tasks;
  var taskIdx = findTaskIdx(tasksArr, task);

  return tasksArr[taskIdx];
};

TaskStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TaskTypeConstants.TASKTYPES_RECEIVED:
      resetTaskTypes(payload.taskTypes);
      TaskStore.__emitChange();
      break;
    case TaskConstants.TASK_RECEIVED:
      addTask(payload.task);
      TaskStore.__emitChange();
      break;
    case TaskConstants.TASK_REMOVED:
      removeTask(payload.task);
      TaskStore.__emitChange();
      break;
  }
};

module.exports = TaskStore;
