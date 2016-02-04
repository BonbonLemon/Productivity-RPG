var React = require('react'),
    ApiUtil = require('./../util/api_util');

var History = require('react-router').History;

var NavBar = React.createClass({
  mixins: [History],

  handleClickTasks: function () {
    this.history.pushState(null, '/profile/tasks');
  },

  handleClickInventory: function () {
    this.history.pushState(null, '/profile/inventory');
  },

  handleSignOut: function (e) {
    e.preventDefault();
    $.ajax({
      url: "/session/",
      method: "DELETE",
      success: function () {
        window.location = '/session/new';
      }
    });
  },

  render: function () {
    var rightButtons, leftButtons;
    if (this.props.loggedIn) {
      leftButtons = (
        <ul className="nav navbar-nav pull-left">
          <li><a onClick={this.handleClickTasks}>Tasks</a></li>
          <li><a onClick={this.handleClickInventory}>Inventory</a></li>
        </ul>
      );
      rightButtons = (
        <ul className="nav navbar-nav pull-right">
          <li><a onClick={this.handleSignOut} href="/#">Sign Out</a></li>
        </ul>
      );
    } else {
      leftButtons = (
        <ul className="nav navbar-nav pull-left">
          <li><a href="/#">Home</a></li>
        </ul>
      )
      rightButtons = (
        <ul className="nav navbar-nav pull-right">
          <li><a href="/session/new">Sign In</a></li>
          <li><a href="/users/new">Sign Up</a></li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#collapse-menu"
                    aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="collapse-menu">
            {leftButtons}
            {rightButtons}
          </div>

        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
