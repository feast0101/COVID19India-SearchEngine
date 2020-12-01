import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import './PreviewFooter.scss';



class PreviewFooter extends Component {

  constructor(props) {
    super(props);



  }

  handleFooterSubmit = (nav, event) => {

    console.log(event);
    this.props.callback(nav, event);

  }

  render() {
    return (
    <div className="previewFooter">
      <Button className="preview-close" onClick={() => { this.handleFooterSubmit('Close') }}>Close Preview</Button>
         {this.props.editCall ? ('') : (<Button className="preview-savedraft" onClick={() => { this.handleFooterSubmit('SaveDraft') }}>Save Draft</Button>)}
    </div>
    )
  }
}




export default PreviewFooter;