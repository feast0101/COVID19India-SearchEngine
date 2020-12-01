import React, { Component } from 'react';
import './SubmitPage.scss';
import NavBar from './../navbar/NavBar'
import {Form,FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';
import BlueFooter from '../bluefooter/BlueFooter';
import ConfirmationLogo from '../../../../assets/images/Confirmation.svg';


class SubmitPage extends Component {

constructor(props) {
        super(props);
    }

submitAnother(){

window.location = '/ksassetfe/assetsubmissionpage';
}

 render(){
  	return(

  	        <div className="submitpage">
             <NavBar/>

              <div class="wrapper">
                <div>
                  <div class="submit-content">
                    <div>
                      <img className="container" src={ConfirmationLogo} alt="person logo" height="310" width="388"></img>
                      {/*<div className="thank-metadata">You can check in on review progress anytime by visiting your dashboard at <a style={{color:'#1F40E6'}} href="#">Manage My Asset List.</a></div>*/}
                      <div className="thank-you">Thanks!!</div>
                      <div className="thank-question" style={{'margin-top':'16px','margin-left':'44px'}}>Have any questions? Contact <a style={{color:'#1F40E6'}} href="mailto:Asset_Library_Support@mckinsey.com">Asset_Library_Support@mckinsey.com</a></div>
                       <div className="meta-data">Still have more to add?</div>
                      <Button onClick={this.submitAnother.bind(this)} type="submit" className="add-confirm" style={{'backgroundColor': '#1F40E6'}}> Create another full asset page </Button>

                    </div>
                  </div>
                </div>
              </div>
              <BlueFooter/>
             </div>

  )
  }
}



export default SubmitPage;