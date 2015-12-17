var React = require('react'),
    AvatarStore = require('./../stores/avatar'),
    ApiUtil = require('./../util/api_util');

var Avatar = React.createClass({
  getInitialState: function () {
    return ({ Avatar: AvatarStore.get() });
  },

  _onChange: function () {
    this.setState({ Avatar: AvatarStore.get() })
  },

  componentDidMount: function () {
    AvatarStore.addListener(this._onChange);
    ApiUtil.fetchAvatar();
  },

  componentWillUnmount: function () {
    AvatarStore.removeListener(this._onChange);
  },

  render: function () {
    var money;
    var Avatar = this.state.Avatar;
    if (Avatar) {
      money = Avatar.money;
    } else {
      money = 0;
    }
    return (
      <div>
        Money: ${money}
      </div>
    );
  }
});

module.exports = Avatar;
