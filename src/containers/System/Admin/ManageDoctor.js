import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageDoctor.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGES } from '../../../utils';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: '',
            listDoctors: []
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleSaveContentMardown = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
    }

    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    buildDataInputSelect(inputData) {
        let result = [];
        let { language } = this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastname} ${item.firstname}`;
                let labelEn = `${item.firstname} ${item.lastname}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className="manage-doctor-title">
                    Tạo thêm thông tin doctors
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label htmlFor="">Chọn bác sĩ</label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="content-right">
                        <label htmlFor="">Thông tin giới thiệu</label>
                        <textarea
                            className='form-control'
                            rows="4"
                            onChange={e => this.handleOnchangeDesc(e)}
                            value={this.state.description} >
                        </textarea>
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                     />
                </div>
                <button onClick={() => this.handleSaveContentMardown()}
                    className='save-content-doctor'>Lưu thông tin</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
