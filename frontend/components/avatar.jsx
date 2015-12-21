var React = require('react'),
    ReactDOM = require('react-dom'),
    AvatarStore = require('./../stores/avatar'),
    sjs = require('../util/sprite'),
    ApiUtil = require('./../util/api_util');

var Avatar = React.createClass({
  getInitialState: function () {
    return ({ Avatar: AvatarStore.get() });
  },

  _onChange: function () {
    this.setState({ Avatar: AvatarStore.get() })
    this.renderEquipments();
    // debugger;
  },

  renderStickMan: function () {
    var profile = ReactDOM.findDOMNode(this.refs.profileRef);
    var sprite = document.querySelector('.sjs');
    if (profile && !sprite) {
      var scene = sjs.Scene({parent: profile, w:300, h:380});
      var stick = scene.Sprite('assets/stick_man.png');
      stick.position(50, 60);
      //TODO hacky
      setTimeout(stick.update.bind(stick), 500);
    }
  },

  renderEquipments: function () {
    var Avatar = this.state.Avatar;
    if (Avatar) {
      Avatar.equipments.forEach(function (equipment) {
        this.renderEquipment(equipment)
      }.bind(this));
    }
  },

  renderEquipment: function (equipment) {
    var avatarDiv = document.querySelector('#sjs0');
    if (this.sword) {
      if (this.hackySolution) {
        this.sword.remove();
        this.sword = this.scene.Sprite(equipment.url);
        setTimeout(this.sword.update.bind(this.sword), 500);
      } else {
        this.hackySolution = true;
        this.sword.remove();
        this.sword = this.scene.Sprite(equipment.url)
        this.sword.update();
        this.renderEquipment(equipment);
      }
    } else {
      this.scene = sjs.Scene({parent: avatarDiv, w:300, h:380});
      this.sword = this.scene.Sprite(equipment.url);
      //TODO hacky
      setTimeout(this.sword.update.bind(this.sword), 500);
    }
  },

  componentDidMount: function () {
    AvatarStore.addListener(this._onChange);
    this.renderStickMan();
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
        <div ref="profileRef"/>
        <div className="current-money">
          <img className="current-gold-bar" src="/assets/gold_bar.png" />  {money}
        </div>
      </div>
    );
  }
});

module.exports = Avatar;
