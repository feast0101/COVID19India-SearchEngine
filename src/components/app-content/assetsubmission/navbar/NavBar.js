import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.scss';
import Mckinsey_Header_Logo from '../../../../assets/images/McK_ScriptMark_RGB_McKDeepBlue.svg';



class NavBar extends Component {

  constructor(props) {
    super(props);



  }

  handleClick = (e) => {
    alert(e.target)
    window.scrollTo({
      top: this.myRef.current.offsetTop,
      behavior: "smooth"
    })
  }

  render() {
    return (
<div className="nav-bar-header">
      <Navbar fixed="top" bg="white" expand="lg" className="nav-bar">
        {/*<Navbar.Brand href="/assetsubmission">Mckinsey & Company</Navbar.Brand>*/}
        <a href ="https://home.intranet.mckinsey.com/intranet/" ><img src={Mckinsey_Header_Logo} alt="Smiley face" height="50" width="250" ></img></a>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
         <Nav className="mr-auto">
           <Nav.Link  onClick={() => { this.handleScrollTo(this.refA) }}>Basic Info</Nav.Link>
           <Nav.Link onClick={() => { this.handleScrollTo(this.refB) }}>Use Cases</Nav.Link>
           <Nav.Link  onClick={() => { this.handleScrollTo(this.refC) }}>Contacts</Nav.Link>
           <Nav.Link  onClick={() => { this.handleScrollTo(this.refD) }}>Materials</Nav.Link>
           <Nav.Link  onClick={() => { this.handleScrollTo(this.refE) }}>Deployment</Nav.Link>
           <Nav.Link  onClick={() => { this.handleScrollTo(this.refF) }}>Technology</Nav.Link>
           <Nav.Link  onClick={() => { this.handleScrollTo(this.refF) }}>Additional Info</Nav.Link>
         </Nav>
       </Navbar.Collapse>*/}

      </Navbar>
</div>
    )
  }
}



export default NavBar;
