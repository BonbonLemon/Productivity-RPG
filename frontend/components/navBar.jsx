var React = require('react'),
    ApiUtil = require('./../util/api_util');

var History = require('react-router').History;

var NavBar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { loggedIn: this.props.loggedIn };
  },

  handleClickTasks: function () {
    this.history.pushState(null, '/profile/tasks');
  },

  handleClickInventory: function () {
    this.history.pushState(null, '/profile/inventory');
  },

  handleClickHome: function () {
    this.history.pushState(null, '/home');
  },

  handleSignOut: function (e) {
    e.preventDefault();
    $.ajax({
      url: "/session/",
      method: "DELETE",
      success: function () {
        // window.location = '/session/new';
        this.setState({loggedIn: false});
        this.history.pushState(null, '/home');
      }.bind(this)
    });
  },

  handleSignIn: function () {
    this.history.pushState(null, '/login');
  },

  render: function () {
    // this.setState({ loggedIn: this.props.loggedIn });
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
          <li><a onClick={this.handleSignOut}>Sign Out</a></li>
        </ul>
      );
    } else {
      leftButtons = (
        <ul className="nav navbar-nav pull-left">
          <li><a onClick={this.handleClickHome}>Home</a></li>
        </ul>
      )
      rightButtons = (
        <ul className="nav navbar-nav pull-right">
          <li><a onClick={this.handleSignIn}>Sign In</a></li>
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
