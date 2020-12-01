import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Icon_CloseBlackThin from '../../../../assets/images/Icon_CloseBlackThin.svg';

class ErrorPopUp extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
    }

  }

  leavePage() {
    window.location = '/ksassetfe/library';
  }


  render() {
    return (
      <Modal dialogClassName="error-modal"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="errorpopup-page">
        <p className="meta-data-error">
          {this.props.errorMessage}
          </p>
          <Button className="btn-error" onClick={this.leavePage.bind(this)}>Close</Button>
        </div>
      </Modal>
    );
  }
}


export default ErrorPopUp;