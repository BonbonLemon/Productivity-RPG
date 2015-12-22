var React = require('react'),
    ApiUtil = require('./../util/api_util');

var NavBar = React.createClass({
  handleSignOut: function (e) {
    e.preventDefault();
    ApiUtil.deleteSession();
  },

  render: function () {
    var rightButtons;
    if (this.props.loggedIn) {
      rightButtons = (
        <ul className="nav navbar-nav pull-right">
          <li><a onClick={this.handleSignOut} href="#">Sign Out</a></li>
        </ul>
      );
    } else {
      rightButtons = (
        <ul className="nav navbar-nav pull-right">
          <li><a href="session/new">Sign In</a></li>
          <li><a href="users/new">Sign Up</a></li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-default">
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
            <ul className="nav navbar-nav pull-left">
              <li><a href="#">Home</a></li>
            </ul>
            {rightButtons}
          </div>

        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
