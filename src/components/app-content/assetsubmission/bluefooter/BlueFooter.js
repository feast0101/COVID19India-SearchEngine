import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './NewFooter.scss'
import Logo from "../../../../assets/images/McK_ScriptMark_RGB_McKWhite.svg";

class BlueFooter extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
    <div className="newfooter">
      <div class="new-footer-banner">
        <div className="row">
          <div className="col-md-10">
            <img className="new-footer-img" src={Logo} alt="Smiley face" height="50" width="250" ></img>
          </div>
          <p className="more-info">Have any questions? <a className="new-footer-contact-link" href="mailto:Asset_Library_Support@mckinsey.com">Contact</a></p>
        </div>
      </div>
    </div>
    )
  }
}



export default BlueFooter;