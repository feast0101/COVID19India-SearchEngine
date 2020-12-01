import React, { Component } from 'react';
import './Footer.scss';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button } from 'react-bootstrap';


class Footer extends Component {

  constructor(props) {
    super(props);
  }

  handleFooterSubmit = (nav, event) => {

    console.log(event);
    this.props.callback(nav, event);

  }

  render() {
    return (
<div className="footer-page">
      <hr />
      <div className="footer">
        <div className="rightSubmissionFooterButtons">
        <Button type="submit" className="footer-a">
          Submit for Review
        </Button>
        {this.props.editCall ? ('') : (<Button className="footer-c" onClick={() => { this.handleFooterSubmit('Save Draft') }} >
                                                      Save Draft
                                                    </Button>)}

        <Button className="footer-b" onClick={() => { this.handleFooterSubmit('Preview') }}>
          Preview
        </Button>
        <a className="cancel" onClick={() => { this.handleFooterSubmit('Cancel') }}>Cancel</a>
        </div>
        <div className="leftSubmissionFooterButtons">
        {this.props.id === ''  ? ('') : (<a className="delete-draft" onClick={() => { this.handleFooterSubmit('Delete Draft') }} >Delete Draft</a>)}
        </div>
       
        

      </div>
</div>

    )
  }
}



export default Footer;