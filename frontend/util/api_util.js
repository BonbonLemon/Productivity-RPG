//util/api_util.js
var TaskActions = require('./../actions/taskActions')

var ApiUtil = {
  fetchAllTaskTypes: function() {
    $.ajax({
      url: "api/task_types/",
      method: "GET",
      success: function (taskTypes) {
        TaskActions.receiveAllTaskTypes(taskTypes);
      }
    })
  },

  createTask: function (task) {
    $.ajax({
      url: "api/tasks/",
      method: "POST",
      data: {task: task},
      success: function (task) {
        TaskActions.receiveSingleTask(task);
      }
    })
  },

  deleteTask: function (task) {
    $.ajax({
      url: "api/tasks/" + task.id,
      method: "DELETE",
      data: {task: task},
      success: function (task) {
        TaskActions.removeSingleTask(task);
      }
    })
  }
}

module.exports = ApiUtil;
