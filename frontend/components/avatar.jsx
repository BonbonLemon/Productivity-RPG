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
    this.setState({ Avatar: AvatarStore.get() });
    this.renderEquipments();
  },

  renderStickMan: function () {
    this.avatar = ReactDOM.findDOMNode(this.refs.avatarRef);
    var sprite = document.querySelector('.sjs');
    if (this.avatar && !sprite) {
      this.scene = sjs.Scene({parent: this.avatar, w:300, h:425});
      var stick = this.scene.Sprite('assets/stick_man.png');
      stick.position(50, 100);
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
        this.renderHat(equipment);
        break;
    }
  },

  renderHat: function (equipment) {
    var avatarDiv = this.avatar;
    if (this.hat) {
      currUrl = this.hat.dom['style']['backgroundImage'];
      if ( currUrl.indexOf(equipment.url) > -1 ) {
        return;
      } else {
        this.hat.remove();
        this.hat = this.scene.Sprite(equipment.url);
        this.hat.position(45, -10);
        setTimeout(this.hat.update.bind(this.hat), 500);
      }
    } else {
      this.hat = this.scene.Sprite(equipment.url);
      this.hat.position(45, -10);
      //TODO hacky
      setTimeout(this.hat.update.bind(this.hat), 500);
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
        this.shield.position(160, 180);
        setTimeout(this.shield.update.bind(this.shield), 500);
      }
    } else {
      this.shield = this.scene.Sprite(equipment.url);
      this.shield.position(160, 180);
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
        this.sword.position(0, 40);
        setTimeout(this.sword.update.bind(this.sword), 500);
      }
    } else {
      this.sword = this.scene.Sprite(equipment.url);
      this.sword.position(0, 40);
      //TODO hacky
      setTimeout(this.sword.update.bind(this.sword), 500);
    }
  },

  componentDidMount: function () {
    this.listener = AvatarStore.addListener(this._onChange);
    this.renderStickMan();
    ApiUtil.fetchAvatar();
  },

  componentWillUnmount: function () {
    this.listener.remove();
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
      <div className="container-fluid">
        <div className="row">
          <div ref="avatarRef" className="col-xs-4"/>
          <div className="col-xs-8"></div>
        </div>
        <div className="current-money row">
          <img className="current-gold-bar" src="/assets/gold_bar.png" /> {money}
        </div>
      </div>
    );
  }
});

module.exports = Avatar;
