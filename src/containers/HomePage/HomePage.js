import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "./HomeHeader"
import Footer from "./HomeFooter"
import ListSlider from '../Section/ListSlider';
import About from '../Section/About';
import "./HomePage.scss"
import * as actions from "../../store/actions";
import { getAllClinic, getAllSpecialty } from '../../services/UserService';

class HomePage extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctors: [],
            arrSpecialties: [],
            arrClinics: [],
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

        let resClinic = await getAllClinic();
        if(resClinic && resClinic.errCode === 0){
            this.setState({
                arrClinics: resClinic.data ? resClinic.data : []
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

        let  { arrDoctors, arrSpecialties, arrClinics } = this.state;

        return (
            <div>
                <Header isShowBanner={true} />
                <ListSlider 
                    settings={settings} 
                    title={"homepage.specialty-popular"}
                    moreInfo={"homepage.more-info"} 
                    arrSpecialties={arrSpecialties} 
                />
                <ListSlider settings={settings} 
                    title={"homepage.outstanding-medical-facility"} 
                    moreInfo={"homepage.more-info"} 
                    arrClinics={arrClinics}
                />
                <ListSlider 
                    settings={settings} 
                    title={"homepage.outstanding-doctor"} 
                    moreInfo={"homepage.more-info"} 
                    arrDoctors={arrDoctors} 
                />
                {/* <ListSlider settings={settings} title="Cẩm nang"/> */}
                {/* <About /> */}
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
