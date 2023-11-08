import React from "react";
import quizLogo from "../img/quiz-logo-01.png"
const Footer = () => {
  return (
    <footer>
    <img className="quiz-logo" src={quizLogo} alt="quizzical-logo" /> 
      <div className="social-links">
        <a href="https://www.facebook.com/n.boudellal">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a href="https://github.com/nasreddine19">
          <i class="fa-brands fa-github"></i>
        </a>
        <a href="https://www.instagram.com/ns.boudellal/">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://wa.me/+213655759596">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
