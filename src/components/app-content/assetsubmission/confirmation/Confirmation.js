import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import './Confirmation.scss';
import Icon_CloseBlackThin from '../../../../assets/images/Icon_CloseBlackThin.svg';
import AjaxWrapper from '../../../../api/AjaxWrapper';
import { SUBMIT_ASSET } from '../../../../config/config';
import axios, { post } from 'axios';





class Confirmation extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      errorSubmit: false,
      responseMessage:'',
      apiHit:false
    }

    this.onHide = this.onHide.bind(this);

  }

  submitPage() {

this.setState({
        errorSubmit: false,
        apiHit:true
      })
    var message = '';
    post(SUBMIT_ASSET, this.props.data).then(response => this.setState({
      responseMessage: response.data.message,
      apiHit:false

    })).then((responseMessage) => {
          if (responseMessage !== '') {
                window.location = '/ksassetfe/confirmation';
              }
       }).catch((error) => {
      this.setState({
        errorSubmit: true,
        apiHit:false
      })
 setTimeout(function() { //Start the timer
                                          this.setState({errorSubmit: false}) //After 1 second, set render to true
                                      }.bind(this), 2000)
    })

    console.log(this.state.responseMessage)


  }

  onHide() {
  this.setState({
          errorSubmit: false
        })
    this.props.onHide();
  }


  render() {
    return (
      <Modal dialogClassName="confirm-modal"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >
        {this.state.errorSubmit ? (<div className="error-confirm"><p className="err-text-confirm">Something went wrong. Please try after sometime.</p></div>) : ('')}
        <div className="confirmation-modal">
        <div><p className="header-title-confirm">One more click!</p>
          <img className="close-btn-confirm" src={Icon_CloseBlackThin} onClick={this.props.onHide} alt="" ></img>
        </div>
        <p className="confirm-msg-confirm">
          We know you put a lot of effort into getting here, so we simply want to make sure you didn’t click before you were ready.  Big blue buttons can be tempting after all…
                                       <br />
          <br />
          After this, your asset will be on it’s way!
                                                                </p>

        
        {
                    this.state.apiHit ?
                      <Button className="confirm-submission" onClick={this.submitPage.bind(this)} disabled>Confirm Submission </Button>
                      : <Button className="confirm-submission" onClick={this.submitPage.bind(this)}>Confirm Submission </Button>
                  }
          <Button className="continue-working" onClick={this.onHide}>Continue working</Button>
        </div>

      </Modal>
    );
  }
}


export default Confirmation;