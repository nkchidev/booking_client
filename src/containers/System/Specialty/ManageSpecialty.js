import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageSpecialty.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import * as actions from "../../../store/actions"
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { createNewSpecialty } from '../../../services/UserService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if(res && res.errCode === 0){
            toast.success('Add new specialty succeed!');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdow: ''
            });
        }else{
            toast.error('Add new specialty error!');
            console.log(res);
        }
    }

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' value={this.state.name}
                            onChange={(e) => this.handleOnchangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control' type='file' 
                            onChange={(e) => this.handleOnchangeImage(e)}
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
                            onClick={() => this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
