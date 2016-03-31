var React = require('react'),
    NavBar = require('./navBar');

var Login = React.createClass({
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

          <form className="" action="<%= session_url %>" method="post">
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="text" className="form-control" />
            </div>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Sign In</button>
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
