var React = require('react'),
    NavBar = require('./navBar'),
    Avatar = require('./avatar');

var History = require('react-router').History;

var Profile = React.createClass({
  mixins: [History],

  componentDidMount: function () {
    var path = this.props.location.pathname;
    if (path === "/profile") {
      this.history.pushState(null, '/profile/tasks');
    }
  },

  render: function () {
    return (
      <div className="profile container-fluid">
        <NavBar loggedIn={true}/>
        <Avatar/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Profile;
