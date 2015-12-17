var AppDispatcher = require('../dispatcher/Dispatcher.js'),
    Store = require('flux/utils').Store,
    AvatarConstants = require('./../constants/avatarConstants');

var AvatarStore = new Store(AppDispatcher);

var _Avatar;

var resetAvatar = function (avatar) {
  _Avatar = avatar;
}

AvatarStore.get = function () {
  var Avatar = _Avatar;
  return Avatar;
};

AvatarStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AvatarConstants.AVATAR_RECEIVED:
      resetAvatar(payload.avatar);
      AvatarStore.__emitChange();
      break;
  }
}

module.exports = AvatarStore;
