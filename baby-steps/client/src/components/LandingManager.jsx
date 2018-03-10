import React from 'react';
import { Link } from 'react-router-dom';
import BAppBar from './BAppBar';
import './styles/landingManager.css'


class LandingManager extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <BAppBar />

        <div>
          <Link to="/login">Login Here</Link>
        </div>
        <div>
          <Link to="/signup">Signup Here</Link>
        </div>

<div className="container">
    <video autoPlay muted loop id="myVideo">
      <source src={require("./img/Judd_Family_Lifestyle.mp4")} type="video/mp4"/> Your browser does not support HTML5 video.
    </video>
  </div>

  <div className="babyStepsText">
    <h2 className="largBaby">Welcome to</h2>
    <p className="babyStepsWords">Baby Steps</p>
    {/* <!-- <p>saving the moments that mean the most to you!</p> --> */}
  </div>


  <div id="intro">
    <div className="story">
      <div>
        {/* <!-- first block --> */}
        <div className="">
          <span>
            <div className="bigDealText col-md-4">
                <h2>Scrapbooking, meet the internet….</h2>
                <p className="overFlow">...Remember your old scrapbooks of yesteryear? The printing, the cutting, and the displaying of precious moments
                   presented in an organized order with some flair? We thought it was time to bring it into the digital age…</p>
            </div>

              <img className="bigDeal col-md-9" src={require("./img/simple_browser.png")} alt=""/>
              <video autoplay muted loop id="myVideo">
                  <source src="./img/textDummy.mov" type="video/mov"/> Your browser does not support HTML5 video.
                </video>
              
          </span>
        </div>
      </div>

    </div>
    {/* <!--.story--> */}
  </div>
  {/* <!--#intro--> */}
  <div id="second">
    <div className="story">
      <div className="bg"></div>
      {/* <!-- <img className="bigDeal col-md-6" src="../img/mac.png" alt=""> --> */}
      <div className="float-left">

        <h2>How many pictures do you have?!</h2>
        <p>...Per an Info Trends study, more than 3.9 TRILLION photos were captured and stored on hard drives in 2017, and that
          number is only compounding and going up each year! For a parent, you want to showcase the specific moments that
          matter MOST!</p>

        <h2>Let us help you remember the milestones!</h2>
        <p>...While perhaps 90% of your stored photos are of your kids, you want to easily remember the milestones! With Baby
          Steps, now you can! We give you an aesthetically pleasing template to help you fill in your child’s ‘Timeline’
          with the moments that matter the most! From their first steps to their first day of school and beyond, you know
          have the ultimate tool to journal, scrapbook, and look back on the moments that matter most!</p>
      </div>
    </div>
    {/* <!--.story--> */}
  </div>
  <div id="intro1">
    <div className="story">
      <div>
        {/* <!-- first block --> */}
        <div className="giveMeSpace">
          <div>

              <img className="bigDeal col-md-9" src={require("./img/simple_browser.png")} alt=""/>


            <div className="bigDealText col-md-4">

              <h2>What should I do with the kids today…</h2>
              <p className="overFlow">...Need some inspiration to create and capture some new memories? We’ve got you covered! With our own Memory
                MakerⓇ feature, we now can pull information from your location and make suggestions to you that are family
                friendly. So you can spend less time looking, and more time enjoying moments… just remember to snap a few
                photos :)
              </p>
              
            </div>


          </div>
        </div>
      </div>

    </div>
    {/* <!--.story--> */}
  </div>

  <div id="second2">
    <div className="story">
      <div className="bg"></div>
      {/* <!-- <img className="bigDeal col-md-6" src="../img/mac.png" alt=""> --> */}
      <div className="float-left">

        <h2>How many pictures do you have?!</h2>
        <p>...Per an Info Trends study, more than 3.9 TRILLION photos were captured and stored on hard drives in 2017, and that
          number is only compounding and going up each year! For a parent, you want to showcase the specific moments that
          matter MOST!</p>

        <h2>Let us help you remember the milestones!</h2>
        <p>...While perhaps 90% of your stored photos are of your kids, you want to easily remember the milestones! With Baby
          Steps, now you can! We give you an aesthetically pleasing template to help you fill in your child’s ‘Timeline’
          with the moments that matter the most! From their first steps to their first day of school and beyond, you know
          have the ultimate tool to journal, scrapbook, and look back on the moments that matter most!</p>
      </div>
    </div>
    {/* <!--.story--> */}
  </div>

  <footer className="footer">
    <p>Posted by: The good people who brought you Writer's Block</p>
    <p>Contact information:
      <a href="mailto:someone@example.com">
        someone@example.com</a>.</p>
  </footer>
</div>



    );
  }
}

export default LandingManager;