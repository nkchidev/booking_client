import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeHeader extends Component {

    handleClickChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Nguyễn Kim Chí. More information, please visit my youtube chanel.
                    <a target='_blank' href="#">&#8594; Click here &#8592;</a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
