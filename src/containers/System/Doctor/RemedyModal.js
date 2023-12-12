
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';


class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
           email: '',
           imageBase64: ''
        }
    }

    componentDidMount() {
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }

    handleOnchangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
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

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }

    render() {
        let { isOpenModal, closeRemedyModal } = this.props;
        return (
            <Modal 
                isOpen={isOpenModal}
                className='booking-modal-container'
                size='md'
                centered
            >
                <div className="modal-header">
                    <h5 className='modal-title'>Gửi hóa đơn khám bệnh thành công</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">Email bệnh nhân</label>
                            <input type="email" className='form-control' value={this.state.email} onChange={e => this.handleOnchangeEmail(e)} />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Chọn file đơn thuốc</label>
                            <input type="file" className='form-control-file' onChange={e => this.handleOnchangeImage(e)} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>
                    <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}



const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);

