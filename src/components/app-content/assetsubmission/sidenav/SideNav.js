import React, { Component } from 'react';
import './../AssetSubmission.scss';


class SideNav extends Component {

  constructor(props) {
    super(props);
  }

  handleScrollTo = (nav) => {
    console.log(nav);
    this.props.callback(nav);

  }


  render() {
    return (

      <div className="sidenav">
        <a tabindex="1" onClick={() => { this.handleScrollTo('basic') }}>| Basic Info</a>
        <a tabindex="2" onClick={() => { this.handleScrollTo('cases') }}>| Use Cases</a>
        <a tabindex="2" onClick={() => { this.handleScrollTo('contacts') }}>| Contacts</a>
        <a tabindex="3" onClick={() => { this.handleScrollTo('Materials') }}>| Materials</a>
        <a tabindex="4" onClick={() => { this.handleScrollTo('Deployment') }}>| Deployment</a>
        <a tabindex="5" onClick={() => { this.handleScrollTo('Technology') }}>| Technology</a>
        <a tabindex="6" onClick={() => { this.handleScrollTo('Additional') }}>| Additional Info</a>
      </div>

    )
  }
}



export default SideNav;
