import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss"


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
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

    handleLogin = () => {
        
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
                                    placeholder='Enter your password' />
                                <span onClick={() => this.handleShowPassword()}>
                                    <i class={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
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
                            <i class="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
