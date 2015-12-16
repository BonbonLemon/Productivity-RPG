//util/api_util.js
var ApiActions = require('./../actions/taskTypeActions')

var ApiUtil = {
  fetchAllTaskTypes: function() {
    $.ajax({
      url: "api/task_types/",
      method: "GET",
      success: function (taskTypes) {
        ApiActions.receiveAllTaskTypes(taskTypes);
      }
    })
  },

  createTask: function (task, callback) {
    $.ajax({
      url: "api/tasks/",
      method: "POST",
      data: {task: task},
      success: function (task) {
        ApiActions.receiveSingleTask(task);
      }
    })
  }
}

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
