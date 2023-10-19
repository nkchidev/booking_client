import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";

import "./Specialty.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

    render() {
        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className="title-section">{ this.props.title }</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="specialty-body">
                        <Slider {...this.props.settings}>
                            <div className='specialty-customize'>
                                <div className="bg-image"></div>
                                <div className="">Cơ xương khớp 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className="bg-image"></div>
                                <div className="">Cơ xương khớp 2</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className="bg-image"></div>
                                <div className="">Cơ xương khớp 3</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className="bg-image"></div>
                                <div className="">Cơ xương khớp 4</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className="bg-image"></div>
                                <div className="">Cơ xương khớp 5</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className="bg-image"></div>
                                <div className="">Cơ xương khớp 6</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className="bg-image"></div>
                                <div className="">Cơ xương khớp 7</div>
                            </div>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
