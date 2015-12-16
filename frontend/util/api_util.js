//util/api_util.js
var ApiActions = require('./../actions/taskTypeActions')

var ApiUtil = {
  fetchAllTaskTypes: function(){
    $.ajax({
      url: "api/task_types/",
      method: "GET",
      success: function (taskTypes) {
        ApiActions.receiveAllTaskTypes(taskTypes);
      }
    })
  }
}

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
