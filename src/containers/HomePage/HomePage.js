import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "./HomeHeader"
import Footer from "./HomeFooter"
import Specialty from '../Section/Specialty';
import About from '../Section/About';
import "./HomePage.scss"
import * as actions from "../../store/actions";
import { getAllSpecialty } from '../../services/UserService';

class HomePage extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctors: [],
            arrSpecialties: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    async componentDidMount(){
        this.props.loadTopDoctors();
        let res = await getAllSpecialty();
        if(res && res.errCode === 0){
            this.setState({
                arrSpecialties: res.data ? res.data : []
            });
        }
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        let  { arrDoctors, arrSpecialties } = this.state;

        return (
            <div>
                <Header isShowBanner={true} />
                <Specialty 
                    settings={settings} 
                    title={"homepage.specialty-popular"}
                    moreInfo={"homepage.more-info"} 
                    arrSpecialties={arrSpecialties} 
                />
                {/* <Specialty settings={settings} title="Cơ sở y tế nổi bật" /> */}
                <Specialty 
                    settings={settings} 
                    title={"homepage.outstanding-doctor"} 
                    moreInfo={"homepage.more-info"} 
                    arrDoctors={arrDoctors} 
                />
                {/* <Specialty settings={settings} title="Cẩm nang"/> */}
                <About />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
