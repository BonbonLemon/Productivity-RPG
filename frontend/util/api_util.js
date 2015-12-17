//util/api_util.js
var TaskActions = require('./../actions/taskActions'),
    AvatarActions = require('./../actions/avatarActions');

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
  },

  fetchAvatar: function () {
    $.ajax({
      url: "api/avatar/",
      method: "GET",
      success: function (avatar) {
        AvatarActions.receiveAvatar(avatar);
      }
    })
  },

  updateAvatar: function (deletedTask) {
    $.ajax({
      url: "api/avatar/" + deletedTask.avatar.id,
      method: "PATCH",
      data: {task: deletedTask},
      success: function (avatar) {
        AvatarActions.receiveAvatar(avatar);
      }
    })
  }
}

module.exports = ApiUtil;
