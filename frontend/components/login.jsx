var React = require('react'),
    NavBar = require('./navBar');

var Login = React.createClass({
  getInitialState: function () {
    return {
      username: "",
      password: ""
    }
  },

  handleUsernameChange: function (e) {
    e.preventDefault();
    this.setState({ username: e.target.value});
  },

  handlePasswordChange: function (e) {
    e.preventDefault();
    this.setState({ password: e.target.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    $.ajax({
      url: "/session/",
      method: "POST",
      data: {user: {username: this.state.username, password: "this.state.password"}},
      success: function () {
        window.location = '/';
      },
      error: function () {
        debugger;
      }
    })
  },

  guestLogin: function () {
    $.ajax({
      url: "/users/",
      method: "POST",
      data: {user: {username: "Guest", password: "n3k8c0sap19"}},
      success: function () {
        window.location = '/';
      }
    })
  },

  render: function () {
    return (
      <div className="row">
        <NavBar loggedIn={false}/>

        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog modal-sm">
            <div className="heartbeat-loader">Loading…</div>
            <br/><br/>
            <span>Your profile is being setup...</span>
          </div>
        </div>

        <div className="col-xs-4 col-xs-offset-1">
          <h1>Sign In</h1>

          <form className="" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" onChange={this.handleUsernameChange}/>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" onChange={this.handlePasswordChange}/>
            </div>

            <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Sign In</button>
          </form>
          or
          <br/>
          <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal" onClick={this.guestLogin}>Sign in as guest</button>
        </div>
      </div>
    );
  }
});

module.exports = Login;
