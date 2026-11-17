import { useState } from "react";
import { Link } from "react-router-dom";
import { PinIcon, PhoneIcon, MailIcon, LinkedinIcon, XIcon, YoutubeIcon } from "./icons.jsx";
import logo from "../assets/stackly_logo.webp"

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div data-aos="fade-up">
          {/* Same logo file as the header */}
          <a href="#"><img src={logo} alt="Company logo" className="f-logo" /></a>
          <p className="f-text">Discover workshops, summits and meetups in technology, business, design and education, and register in minutes.</p>
          <div className="socials">
            <Link to="/404" aria-label="LinkedIn"><LinkedinIcon /></Link>
            <Link to="/404" aria-label="X"><XIcon /></Link>
            <Link to="/404" aria-label="YouTube"><YoutubeIcon /></Link>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="80">
          <h4>Navigate</h4>
          <ul className="f-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/explore">Explore Events</Link></li>
            <li><Link to="/registrations">My Registrations</Link></li>
            <li><Link to="/explore?category=Technology">Technology Events</Link></li>
            <li><Link to="/explore?category=Design">Design Events</Link></li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-delay="160">
          <h4>Contact</h4>
          <ul className="f-contact">
            <li><span className="ico"><PinIcon /></span><span>Your street address, City, State, PIN code</span></li>
            <li className="hours">Mon–Fri · 9am – 6pm IST</li>
            <li><span className="ico"><PhoneIcon /></span><Link to="/404">+91 9879876541</Link></li>
            <li><span className="ico"><MailIcon /></span><Link to="/404">hello@stackly.com</Link></li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-delay="240">
          <h4>Newsletter</h4>
          <p className="f-text">Monthly updates on new workshops and upcoming events.</p>
          {subscribed ? (
            <p className="subscribed" role="status">You're subscribed. Thank you!</p>
          ) : (
            <button className="btn-sub" onClick={() => setSubscribed(true)}>Subscribe now</button>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 Your Company. All rights reserved.</span>
          <span><a href="#">Privacy Policy</a> <i>·</i> <a href="#">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
