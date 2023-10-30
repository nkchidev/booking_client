import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import { LANGUAGES } from '../../../utils';
import "./UserRedux.scss"
import LightBox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: [],
            isOpen: false
        }
    }


    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPostionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render => didUpdate
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if (prevProps.positionReudx !== this.props.positionReudx) {
            this.setState({
                positionArr: this.props.positionReudx
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }


    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="manage-user.add" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type="email" />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type="password" />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className="col-9">
                                <label htmlFor=""><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control">
                                    {genders && genders.length > 0
                                        && genders.map((item, index) => {
                                            return (
                                                <option key={item.id}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control">
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={item.id}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control">
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={item.id}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input id='previewImg' type="file" hidden onChange={(e) => this.handleOnchangeImage(e)} />
                                    <label className='label-upload' htmlFor="previewImg">
                                        Tải ảnh
                                        <i className='fas fa-upload'></i>
                                    </label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}></div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && 
                    <LightBox mainSrc={this.state.previewImgURL} 
                        onCloseRequest={() => this.setState({isOpen: false})}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionReudx: state.admin.positions,
        roleRedux: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPostionStart: () => dispatch(actions.fetchPostionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
