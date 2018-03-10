import React from 'react';

const signUp = {
    width: 'auto'
}

const rememberMe = {
    "margin-bottom": '15px'
}

const tp = {
    color: 'dodgerblue'
}

const containerBox = {
    "background-color": '#f1f1f1'
}




class Navbar extends React.Component {

  render() {
    return (
      <div>
        <div className="navBar1">

<nav className="navbar navBar1 navbar-default">
  <div className="container-fluid">

    <ul className="nav navbar-nav navbar-right">
      {/* <!-- sign up =============== --> */}

      <button className="glyphicon glyphicon-user" onclick="document.getElementById('id02').style.display='block'" style={signUp}> SignUp</button>

      <div id="id02" className="modal">
        <span onclick="document.getElementById('id02').style.display='none'" className="close" title="Close Modal">&times;</span>
        <form className="modal-content" action="/singup">
          <div className="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            {/* <hr> */}
            <label for="email">
              <b>Email</b>
            </label>
            <input type="text" placeholder="Enter Email" name="email" required/>

            <label for="psw">
              <b>Password</b>
            </label>
            <input type="password" placeholder="Enter Password" name="psw" required/>

            <label for="psw-repeat">
              <b>Repeat Password</b>
            </label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>

            <label>
              <input type="checkbox" checked="checked" name="remember" style={rememberMe} value="Remember me" />
            </label>

            <p>By creating an account you agree to our
              <a href="#" style={tp}>Terms & Privacy</a>.</p>

            <div className="clearfix">
              <button type="button" onclick="document.getElementById('id02').style.display='none'" className="cancelbtn">Cancel</button>
              <button type="submit" className="signupbtn">Sign Up</button>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- log in================= --> */}
      <button className="glyphicon glyphicon-log-in" onclick="document.getElementById('id01').style.display='block'" style={signUp}> Login</button>

      <div id="id01" className="modal">

        <form className="modal-content animate" action="/login">
          <div className="imgcontainer">
            <span onclick="document.getElementById('id01').style.display='none'" className="close" title="Close Modal">&times;</span>
          </div>

          <div className="container">
            <label for="uname">
              <b>Username</b>
            </label>
            <input type="text" placeholder="Enter Username" name="uname" required/>

            <label for="psw">
              <b>Password</b>
            </label>
            <input type="password" placeholder="Enter Password" name="psw" required/>

            <button type="submit">Login</button>
            <label>
              <input type="checkbox" checked="checked" name="remember" value="Remember me" />
            </label>
          </div>

          <div className="container" style={containerBox}>
            <button type="button" onclick="document.getElementById('id01').style.display='none'" className="cancelbtn">Cancel</button>
            <span className="psw">Forgot
              <a href="#">password?</a>
            </span>
          </div>
        </form>
      </div>

    </ul>
  </div>
</nav>
</div>
      </div>
    );
  }
}

export default Navbar;