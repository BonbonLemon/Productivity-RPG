var React = require('react');

var Login = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-4 col-xs-offset-1">
          <h1>Sign In</h1>

          <form className="" action="<%= session_url %>" method="post">
            <button type="button" className="btn btn-primary">Sign In</button>
          </form>
          or
        </div>
      </div>
    );
  }
});

module.exports = Login;
