import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";

import "./Specialty.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

class Specialty extends Component {

    componentDidMount(){
        console.log(this.props.arrDoctors);
    }

    render() {
        let arrDoctors = this.props.arrDoctors;
        let language = this.props;
        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className="title-section">
                            {this.props.moreInfo && <FormattedMessage id={this.props.title} /> }
                        </span>
                        <button className="btn-section">
                            {this.props.moreInfo && <FormattedMessage id={this.props.moreInfo} />}
                        </button>
                    </div>
                    <div className="specialty-body">
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 && 
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = "";
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi =  `${item.positionData.valueVi}, ${item.lastname} ${item.firstname}`;
                                    let nameEn =  `${item.positionData.valueEn}, ${item.firstname} ${item.lastname}`;
                                    return (
                                        <div className='specialty-customize' key={index}>
                                            <div className="bg-image" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <div className="">
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
