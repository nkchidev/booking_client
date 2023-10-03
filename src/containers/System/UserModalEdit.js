import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class UserModalEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.userEdit;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstname: user.firstname,
                lastname: user.lastname,
                address: user.address
            });
        }
    }


    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstname', 'lastname', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleClickEditUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.handleUpdateUser(this.state);
        }
    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.props.toggleFromParent()}
                className='modal-user-container'
                size='lg'
            >
                <ModalHeader toggle={() => this.props.toggleFromParent()}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="email"
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <label>Firstname</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstname') }}
                                value={this.state.firstname}
                            />
                        </div>
                        <div className="input-container">
                            <label>Lastname</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastname') }}
                                value={this.state.lastname}
                            />
                        </div>
                        <div className="input-container w-100">
                            <label>Address</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color="primary" onClick={() => this.handleClickEditUser()}>
                        Save changes
                    </Button>{' '}
                    <Button
                        className='px-3'
                        color="secondary" onClick={() => this.props.toggleFromParent()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModalEdit);
