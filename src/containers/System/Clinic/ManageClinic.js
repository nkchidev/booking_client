import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageClinic.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import * as actions from "../../../store/actions"
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { createNewClinic, createNewSpecialty } from '../../../services/UserService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    componentDidMount() {
    
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if(res && res.errCode === 0){
            toast.success('Add new clinic succeed!');
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdow: ''
            });
        }else{
            toast.error('Add new clinic error!');
            console.log(res);
        }
    }

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên phòng phám</label>
                        <input className='form-control' value={this.state.name}
                            onChange={(e) => this.handleOnchangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh phòng khám</label>
                        <input className='form-control' type='file' 
                            onChange={(e) => this.handleOnchangeImage(e)}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control'
                            value={this.state.address}
                            onChange={(e) => this.handleOnchangeInput(e, 'address')}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <MdEditor 
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdow}
                        />
                    </div>
                    <div className="col-12">
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
