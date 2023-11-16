import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageDoctor.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';

const mdParser = new MarkdownIt();
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: ''
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
        console.log(this.state)
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

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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
                            options={options}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
