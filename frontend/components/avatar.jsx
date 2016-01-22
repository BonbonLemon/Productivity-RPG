var React = require('react'),
    ReactDOM = require('react-dom'),
    AvatarStore = require('./../stores/avatar'),
    ItemShop = require('./itemShop'),
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
      // NOTE: Hacky solution
      // setTimeout(stick.update.bind(stick), 500);

      // NOTE: Doesn't work...
      // var p2 = new Promise(function(resolve, reject) {
      //   // this.scene = sjs.Scene({parent: this.avatar, w:300, h:425});
      //   resolve(this.scene = sjs.Scene({parent: this.avatar, w:300, h:425}));
      // }.bind(this));

      // p2.then(function() {
      //   debugger;
      //   this.stick = this.scene.Sprite('assets/stick_man.png');
      // }.bind(this)).then(function() {
      //   this.stick.position(50, 100);
      // }.bind(this)).then(function () {
      //   debugger;
      //   this.stick.update()
      // }.bind(this));

      var that = this;
      $.when($.ajax(function () {
        that.scene = sjs.Scene({parent: that.avatar, w:300, h:425});
        that.stick = that.scene.Sprite('assets/stick_man.png');
        that.stick.position(50, 100);
      }())).then(function () {
        // NOTE: Hacky
        setTimeout(that.stick.update.bind(that.stick), 500);
      });
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
      }
    }
    var that = this;
    $.when($.ajax(function () {
      that.hat = that.scene.Sprite(equipment.url);
      that.hat.position(45, -10);
    }())).then(function () {
      setTimeout(that.hat.update.bind(that.hat), 500);
    });
  },

  renderShield: function (equipment) {
    var avatarDiv = this.avatar;
    if (this.shield) {
      currUrl = this.shield.dom['style']['backgroundImage'];
      if ( currUrl.indexOf(equipment.url) > -1 ) {
        return;
      } else {
        this.shield.remove();
      }
    }
    var that = this;
    $.when($.ajax(function () {
      that.shield = that.scene.Sprite(equipment.url);
      that.shield.position(160, 180);
    }())).then(function () {
      setTimeout(that.shield.update.bind(that.shield), 500);
    });
  },

  renderSword: function (equipment) {
    var avatarDiv = this.avatar;
    if (this.sword) {
      currUrl = this.sword.dom['style']['backgroundImage'];
      if ( currUrl.indexOf(equipment.url) > -1 ) {
        return;
      } else {
        this.sword.remove();
      }
    }
    var that = this;
    $.when($.ajax(function () {
      that.sword = that.scene.Sprite(equipment.url);
      that.sword.position(0, 40);
    }())).then(function () {
      setTimeout(that.sword.update.bind(that.sword), 500);
    });
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
          <ItemShop/>
        </div>
        <div className="current-money row">
          <img className="current-gold-bar col" src="/assets/gold_bar.png" />
          <span className="current-money-text col"> {money} </span>
        </div>
      </div>
    );
  }
});

module.exports = Avatar;
