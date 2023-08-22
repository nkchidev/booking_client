import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./UserManage.scss"
import {getAllUsers, createNewUserService,deleteUserService} from "../../services/UserService"
import UserModal from "./UserModal";
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModalUser: false
        }
    }

    fetchUser = async () => {
        let res = await getAllUsers('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                users: res.users
            });
        }
    }

    async componentDidMount() {
        await this.fetchUser();
    }

    handleClickAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.fetchUser();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleClickDelete = async (user) => {
        if(window.confirm(`Bạn có chắc chắn muốn xóa người dùng tên ${user?.lastname} này không?  `)){
            try {
                let response = await deleteUserService(user?.id);
                if(response && response.errCode === 0){
                    await this.fetchUser();
                }else{
                    console.log(response.errMessage);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    render() {
        let { users } = this.state;
        return (
            <div className="users-container">
                <UserModal
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button
                        onClick={this.handleClickAddNewUser}
                        className='btn btn-primary px-3'><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {users && users.map((user) =>
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className='btn btn-warning me-3'>
                                            <span className='p-3'>
                                                Cập nhật
                                            </span>
                                        </button>
                                        <button className='btn btn-danger'
                                            onClick={() => this.handleClickDelete(user)}
                                        >
                                            <span className='p-3'>Xóa</span>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
