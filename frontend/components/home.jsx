var React = require('react'),
    NavBar = require('./navBar'),
    Testimonials = require('./testimonials');

var Home = React.createClass({
  onClick: function () {
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
          <h1 className="home-text">Motivate yourself to be productive.</h1>
          <img className="col-xs-8 col-xs-offset-2 logo" src="/assets/logo2.png" />
        </div>
        <div className="row">
          <button className="col-xs-2 col-xs-offset-5 col-centered" data-toggle="modal" data-target="#myModal" onClick={this.onClick}>Sign in as guest</button>
        </div>
        <div className="home-description row">
          <p className="col-xs-8 col-xs-offset-2">
            Productivity RPG is a habit building and productivity app that treats your life like a game. It uses in-game rewards to motivate you to achieve your goals to become healthy, hard-working, and happy.
          </p>
        </div>

        <div className="home-testimonials row">
          <img className="col-xs-4 col-xs-offset-1" src="/assets/what_people_say.png" />
          <div className="col-xs-7">
            <ul>
              <li className="testimonial-li">
                <p className="quote">"Thanks to Productivity-RPG, I'm now a daily flosser!"</p>
                <p className="user">-DragonSlayer7</p>
              </li>
              <li className="testimonial-li">
                <p className="quote">"This website is awesome! Someone should give the creator a job!"</p>
                <p className="user">-CoolGuy123</p>
              </li>
              <li className="testimonial-li">
                <p className="quote">"My productivity has definitely gone up since I started using this website!"</p>
                <p className="user">-HiIAmSam</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
