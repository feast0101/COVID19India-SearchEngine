import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from './../../../assets/images/Icon_Edit.svg';

class PublishedAssets extends React.Component {

    render() {
        return (
            <div className="published">
              <p className="title">Published Assets <span className="count">3</span></p>
              <div className="content">
                <div className="heading">
                  <p className="name">ASSET NAME</p>
                  <p className="description">DESCRIPTION</p>
                  <p className="first-alert">FIRST ALERT</p>
                  <p className="action">&nbsp;</p>
                </div>
                <div className="item">
                  <div className="name">
                    <a href="#">Chemical Procurement Analytics</a>
                    <p className="owned-by">Owned by <span className="owner">Chemical & Agriculture</span></p>
                  </div>
                  <p className="description">The markup and CSS required to make this demo work cross-browser is
                    slightly
                    different from what's shown in the examples above, which assume a fully spec-compliant browser</p>
                  <div className="first-alert">
                    <div className="display-image">
                      <img alt=""
                           src="http://devwebassets.intranet.mckinsey.com/person/fmno_photos/75614/thumb.jpg?dummy=allowed"/>
                    </div>
                    <p className="name">Chiu Liang</p>
                  </div>
                  <a href="#" className="action"><img alt="" src={EditIcon}/></a>
                </div>
                <div className="item">
                  <div className="name">
                    <a href="#">Chemical Procurement Analytics</a>
                    <p className="owned-by">Owned by <span className="owner">Chemical & Agriculture</span></p>
                  </div>
                  <p className="description">The markup and CSS required to make this demo work cross-browser is
                    slightly
                    different from what's shown in the examples above, which assume a fully spec-compliant browser</p>
                  <div className="first-alert">
                    <div className="display-image">
                      <img alt=""
                           src="http://devwebassets.intranet.mckinsey.com/person/fmno_photos/75614/thumb.jpg?dummy=allowed"/>
                    </div>
                    <p className="name">Chiu Liang</p>
                  </div>
                  <a href="#" className="action"><img alt="" src={EditIcon}/></a>
                </div>
              </div>
            </div>

);
}
}   

export default PublishedAssets;            