import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss"
import { handleLoginApi } from "../../services/UserService";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        };
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });
        try {
            let data =  await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage: data.message
                });
            }
            if(data && data.errCode === 0){
                this.props.UserLoginSuccess(data.user);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({
                    errMessage: error.response.data.message
                });
            }
        }
    }

    handleKeyDown = (event) => {
        if(event.key === 'Enter' || event.keyCode === 13){
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-md-12 title-login">
                            Login
                        </div>
                        <div className="col-md-12 form-group">
                            <label htmlFor="">Username</label>
                            <input
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUsername(e)}
                                type="text"
                                className='form-control login-input'
                                placeholder='Enter your username' />
                        </div>
                        <div className="col-md-12 form-group">
                            <label htmlFor="">Password</label>
                            <div className='form-password'>
                                <input
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control login-input'
                                    placeholder='Enter your password' 
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                    />
                                <span onClick={() => this.handleShowPassword()}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-md-12">
                            <button
                                onClick={this.handleLogin}
                                className='btn btn-success w-100 mt-2 btn-login'>Login</button>
                        </div>
                        <div className="col-md-12">
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className="col-md-12 text-center mt-3">
                            <span className=''>Or login with:</span>
                        </div>
                        <div className="col-md-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // UserLoginFail: () => dispatch(actions.UserLoginFail()),
        UserLoginSuccess: (userInfo) => dispatch(actions.UserLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
