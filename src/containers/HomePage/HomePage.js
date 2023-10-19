import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "./HomeHeader"
import Footer from "./HomeFooter"
import Specialty from '../Section/Specialty';
import About from '../Section/About';
import "./HomePage.scss"

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (
            <div>
                <Header />
                <Specialty settings={settings} title="Chuyên khoa phổ biến" />
                <Specialty settings={settings} title="Cơ sở y tế nổi bật" />
                <Specialty settings={settings} title="Bác sĩ nổi bật tuần qua"/>
                <Specialty settings={settings} title="Cẩm nang"/>
                <About />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
