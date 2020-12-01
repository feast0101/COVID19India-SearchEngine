import React from 'react';
import { Link } from 'react-router-dom';
import ArrowUpIcon from '../../../assets/images/Icon_ArrowUp.svg';

class AssetsInProgress extends React.Component {

    render() {
        return (


<div className="in-progress">
              <p className="title">Assets in Progress <span className="count">3</span></p>
              <div className="content">
                <div className="heading">
                  <p className="name">ASSET NAME</p>
                  <p className="date">LAST UPDATED</p>
                  <p className="status">STATUS</p>
                  <p className="submitter">SUBMITTER</p>
                  <p className="action">&nbsp;</p>
                </div>
                <div className="item">
                  <a href="#" className="name">Chemical Procurement Analytics</a>
                  <p className="date">Today</p>
                  <div className="status">
                    <p className="review">Need your review</p>
                  </div>
                  <div className="submitter">
                    <div className="display-image">
                      <img alt=""
                           src="http://devwebassets.intranet.mckinsey.com/person/fmno_photos/75614/thumb.jpg?dummy=allowed"/>
                    </div>
                    <p className="name">Chiu Liang</p>
                  </div>
                  <a href="#" className="action"><img alt="" src={ArrowUpIcon}/></a>
                </div>
                <div className="item">
                  <a href="#" className="name">New asset in progress</a>
                  <p className="date">Today</p>
                  <div className="status">
                    <p className="draft">Draft</p>
                  </div>
                  <div className="submitter">
                    <div className="display-image">
                      <img alt=""
                           src="http://devwebassets.intranet.mckinsey.com/person/fmno_photos/75614/thumb.jpg?dummy=allowed"/>
                    </div>
                    <p className="not-submitted">Not yet submitted</p>
                  </div>
                  <a href="#" className="action"><img alt="" href="" src={ArrowUpIcon}/></a>
                </div>
                <div className="item">
                  <p className="pedingAssetName">Agriculture Performance Analytics</p>
                  <p className="date">Yesterday</p>
                  <div className="status">
                    <p className="pending">Pending EKAM Review</p>
                  </div>
                  <div className="submitter">
                    <div className="display-image">
                      <img alt=""
                           src="http://devwebassets.intranet.mckinsey.com/person/fmno_photos/75614/thumb.jpg?dummy=allowed"/>
                    </div>
                    <p className="name">Yash Vardhan</p>
                  </div>
                  <a href="#" className="action"><img alt="" src={ArrowUpIcon}/></a>
                </div>
              </div>
            </div>
         );
    }
}   

export default AssetsInProgress;