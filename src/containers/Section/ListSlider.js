import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";

import "./ListSlider.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class ListSlider extends Component {

    componentDidMount(){
    }

    handleViewDetailDoctor(data){
        if(this.props.history) {
            this.props.history.push(`/detail-doctor/${data.id}`);
        }
    }

    handleViewDetailSpecialty(data){
        if(this.props.history) {
            this.props.history.push(`/detail-specialty/${data.id}`);
        }
    }

    handleViewDetailClinic(data){
        if(this.props.history) {
            this.props.history.push(`/detail-clinic/${data.id}`);
        }
    }

    render() {
        let arrDoctors = this.props.arrDoctors;
        let arrSpecialties = this.props.arrSpecialties;
        let arrClinics = this.props.arrClinics;
        let { language } = this.props;
        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className="title-section">
                            {this.props.moreInfo && <FormattedMessage id={this.props.title} /> }
                        </span>
                        {/* <button className="btn-section">
                            {this.props.moreInfo && <FormattedMessage id={this.props.moreInfo} />}
                        </button> */}
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
                                        <div className='specialty-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className="bg-image" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <div className="specialty-name">
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            </div>
                                        </div>
                                    )
                            })}

                            {arrSpecialties && arrSpecialties.length > 0 && 
                                arrSpecialties.map((item, index) => {
                                    return (
                                        <div className='specialty-customize' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className="bg-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className="specialty-name">
                                                <div>{item.name}</div>
                                            </div>
                                        </div>
                                    )
                            })}

                            {arrClinics && arrClinics.length > 0 && 
                                arrClinics.map((item, index) => {
                                    return (
                                        <div className='specialty-customize' key={index} onClick={() => this.handleViewDetailClinic(item)}>
                                            <div className="bg-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className="specialty-name">
                                                <div>{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListSlider));
