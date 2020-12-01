import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import './CancelConfirmation.scss';
import Icon_CloseBlackThin from '../../../../assets/images/Icon_CloseBlackThin.svg';
import { SAVE_ASSET } from '../../../../config/config';
import axios, { post } from 'axios';

class CancelConfirmation extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      errorSubmit:false
    }

  }

  leavePage() {
    window.location = '/library';
  }

  //method to call the save draft api
      saveData() {
          //now after getting the response set asset Id from response to maintain state of edit page call
          post(SAVE_ASSET, this.props.data).then(response => this.setState({
                                      assetID: response.data.assetId,
                                      assetNodeRef:response.data.nodeRef,
                                      errorSubmit:false

                                    })).then((assetID) => {
                                          if (this.state.assetID !== '') {
                                          this.setState({
                                          showDraft: true,
                                          })
                                          setTimeout(function() { //Start the timer
                                            this.setState({showDraft: false}) //After 1 second, set render to true
                                        }.bind(this), 3000)
                                              }
                                       }).catch((error) => {
                                      this.setState({
                                        errorSubmit: true,

                                      })
                                      setTimeout(function() { //Start the timer
                                          this.setState({errorSubmit: false}) //After 1 second, set render to true
                                      }.bind(this), 2000)

                                    });
      }



  render() {
    return (
      <Modal dialogClassName="cancel-modal"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.state.errorSubmit ? (<div className="error-confirm"><p className="err-text-confirm">Something went wrong. Please try after sometime.</p></div>) : ('')}
        <div className="cancelconfirmation-page">
        <div>
        <p className="header-cancel">Do you want to save your work?</p>
          <img className="close-btn-cancel" src={Icon_CloseBlackThin} onClick={this.props.onHide} alt="" ></img>
        </div>
        <p className="meta-data-cancel">
          You are about to leave without saving. If you save your draft you can come back later and continue where you left off.
                  </p>

          <Button className="save-draft-btn-cancel" onClick={this.saveData.bind(this)}>Save Draft</Button>
          <Button className="cancel-draft-btn-cancel" onClick={this.leavePage.bind(this)}>Leave without saving</Button>
        </div>
      </Modal>
    );
  }
}


export default CancelConfirmation;