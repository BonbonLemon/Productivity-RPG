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

  completeTask: function (task) {
    $.ajax({
      url: "api/tasks/" + task.id,
      method: "PATCH",
      data: {task: task},
      success: function (task) {
        TaskActions.receiveSingleTask(task);
      }
    })
  },

  updateUser: function (id) {
    $.ajax({
      url: "/users/" + id,
      method: "PATCH"
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

  updateAvatar: function (task, callback) {
    $.ajax({
      url: "api/avatar/" + task.avatar.id,
      method: "PATCH",
      data: {task: task},
      success: function (avatar) {
        // debugger;
        AvatarActions.receiveAvatar(avatar);
        callback;
      }
    })
  }
}

module.exports = ApiUtil;
