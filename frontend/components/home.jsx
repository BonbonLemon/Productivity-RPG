var React = require('react'),
    NavBar = require('./navBar');

var Home = React.createClass({
  render: function () {
    return (
      <div>
        <NavBar loggedIn={false}/>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog modal-sm">
            <div className="heartbeat-loader">Loading…</div>
            <br/><br/>
            <span>Your profile is being setup...</span>
          </div>
        </div>
        <div className="row">
          <img className="col-xs-8 col-xs-offset-2" src="/assets/logo.png" />
        </div>
        <div className="row">
          <button className="col-xs-2 col-xs-offset-5 col-centered" data-toggle="modal" data-target="#myModal" onClick={this.onClick}>Sign in as guest</button>
        </div>
      </div>
    );
  }
});

module.exports = Home;
