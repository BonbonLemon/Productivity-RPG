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
    this.avatar = ReactDOM.findDOMNode(this.refs.avatarRef);
    var sprite = document.querySelector('.sjs');
    if (this.avatar && !sprite) {
      this.scene = sjs.Scene({parent: this.avatar, w:300, h:380});
      var stick = this.scene.Sprite('assets/stick_man.png');
      stick.position(50, 60);
      //TODO hacky
      setTimeout(stick.update.bind(stick), 500);
    }
  },

  renderEquipments: function () {
    var Avatar = this.state.Avatar;
    if (Avatar) {
      Avatar.equipments.forEach(function (equipment) {
        this.handleEquipmentType(equipment)
      }.bind(this));
    }
  },

  handleEquipmentType: function (equipment) {
    switch (equipment.type_name) {
      case "sword":
        this.renderSword(equipment);
        break;
      case "shield":
        this.renderShield(equipment);
        break;
      case "hat":

        break;
    }
  },

  renderShield: function (equipment) {
    var avatarDiv = this.avatar;
    if (this.shield) {
      currUrl = this.shield.dom['style']['backgroundImage'];
      if ( currUrl.indexOf(equipment.url) > -1 ) {
        return;
      } else {
        this.shield.remove();
        this.shield = this.scene.Sprite(equipment.url);
        this.shield.position(160, 140);
        setTimeout(this.shield.update.bind(this.shield), 500);
      }
    } else {
      this.shield = this.scene.Sprite(equipment.url);
      this.shield.position(160, 140);
      //TODO hacky
      setTimeout(this.shield.update.bind(this.shield), 500);
    }
  },

  renderSword: function (equipment) {
    var avatarDiv = this.avatar;
    if (this.sword) {
      currUrl = this.sword.dom['style']['backgroundImage'];
      if ( currUrl.indexOf(equipment.url) > -1 ) {
        return;
      } else {
        this.sword.remove();
        this.sword = this.scene.Sprite(equipment.url);
        setTimeout(this.sword.update.bind(this.sword), 500);
      }
      // if (this.hackySolution) {
      //   currUrl = this.sword.dom['style']['backgroundImage'];
      //   if ( currUrl.indexOf(equipment.url) > -1 ) {
      //     return;
      //   }
      //   this.sword.remove();
      //   this.sword = this.scene.Sprite(equipment.url);
      //   setTimeout(this.sword.update.bind(this.sword), 500);
      // } else {
      //   currUrl = this.sword.dom['style']['backgroundImage'];
      //   if ( currUrl.indexOf(equipment.url) > -1 ) {
      //     return;
      //   }
      //   this.hackySolution = true;
      //   this.sword.remove();
      //   this.sword = this.scene.Sprite(equipment.url)
      //   this.sword.update();
      //   this.renderSword(equipment);
      // }
    } else {
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
        <div ref="avatarRef"/>
        <div className="current-money">
          <img className="current-gold-bar" src="/assets/gold_bar.png" />  {money}
        </div>
      </div>
    );
  }
});

module.exports = Avatar;
