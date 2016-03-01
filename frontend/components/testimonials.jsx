var React = require('react');

var Testimonials = React.createClass({
  render: function () {
    return (
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
    );
  }
});

module.exports = Testimonials;
