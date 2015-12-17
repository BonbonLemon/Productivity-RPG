var Dispatcher = require('./../dispatcher/Dispatcher'),
    AvatarConstants = require('./../constants/avatarConstants');

module.exports = {
  receiveAvatar: function (avatar) {
    Dispatcher.dispatch({
      actionType: AvatarConstants.AVATAR_RECEIVED,
      avatar: avatar
    });
  }
};
