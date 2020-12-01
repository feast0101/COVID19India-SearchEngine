import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Checkbox } from 'react-bootstrap';
import './DeleteConfirmation.scss';
import Icon_CloseBlackThin from '../../../../assets/images/Icon_CloseBlackThin.svg';
import { DELETE_ASSET } from '../../../../config/config';
import axios, { post } from 'axios';




class DeleteConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCheck: false,
      message:'',
      errorSubmit:false
    }
  }


  leavePage() {
 axios(DELETE_ASSET+"assetId="+this.props.deletepayload.assetID).then(response => this.setState({
                                                  message: response.data.message,


                                                })).then((message) => {
                                                      if (this.state.message !== '') {
                                                       window.location = '/ksassetfe/library';
                                                          }
                                                   }).catch((error) => {
                                                  this.setState({
                                                    errorSubmit: true,

                                                  })
                                                  setTimeout(function() { //Start the timer
                                                                                            this.setState({errorSubmit: false}) //After 1 second, set render to true
                                                                                        }.bind(this), 2000)

                                                });


    //console.log(window.history.back())

  }

  getCheckBoxState() {
    if (this.state.inputCheck) {
      this.setState({
        inputCheck: false
      });
    } else {
      this.setState({
        inputCheck: true
      });

    }
  }

  onHide() {

  this.setState({
  inputCheck: false,
          errorSubmit: false
        })
    this.props.onHide();
  }

  render() {

    return (
      <Modal dialogClassName="delete-modal"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

      <div className="deleteconfirmation-page">
        {this.state.errorSubmit && (<div className="error-delete"><p className="err-text-delete">Something went wrong. Please try after sometime.</p></div>)}
          <div>
            <p className="header-title-delete">Are you sure you want to delete your progress on this asset?</p>
            <img className="close-btn-delete" src={Icon_CloseBlackThin} onClick={this.onHide.bind(this)} alt="" ></img>
          </div>

          <p className="title-metadata-delete">You are about to delete all progress on this asset. This action cannot be undone.</p>
          <hr />

          <span className="please-confirm-msg-delete">Please confirm:</span>
          <div className="topic-review-check" onClick={this.getCheckBoxState.bind(this)}>	

            <input type="checkbox" className="reviewCheck" onClick={this.getCheckBoxState.bind(this)} checked={this.state.inputCheck} />	

            <span className="checkboxLabel"> <span className="confirm-msg-delete">All progress on this asset will be permanently deleted.</span></span>	
          </div>

          {
            this.state.inputCheck ?
              <Button className="delete-confirm" onClick={this.leavePage.bind(this)} >Yes, delete my progress </Button>
              : <Button className="delete-confirm" onClick={this.leavePage.bind(this)} disabled>Yes, delete my progress </Button>
          }

          {
            this.props.assetType === 'large'?
              <Button className="delete-cancel" onClick={this.onHide.bind(this)}>Cancel, continue working</Button>
              : <Button className="delete-cancel" onClick={this.onHide.bind(this)}>Cancel, keep asset</Button>
          }
      </div>
      </Modal>
    );
  }
}


export default DeleteConfirmation;