import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllUsers, createNewUserService, deleteUserService, updateUserService } from "../../services/UserService"
import UserModal from "./UserModal";
import { emitter } from '../../utils/emitter';
import UserModalEdit from './UserModalEdit';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModalUserCreate: false,
            isOpenModalUserEdit: false,
            userEdit: {},
        }
    }

    fetchUser = async () => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                this.setState({
                    users: res.users
                });
            }else{
                console.log('Error when get all users');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        await this.fetchUser();
    }

    handleClickAddNewUser = () => {
        this.setState({
            isOpenModalUserCreate: true
        })
    }

    toggleUserModalCreate = () => {
        this.setState({
            isOpenModalUserCreate: !this.state.isOpenModalUserCreate
        })
    }

    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalUserEdit: !this.state.isOpenModalUserEdit,
        });
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.fetchUser();
                this.setState({
                    isOpenModalUserCreate: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleClickDelete = async (user) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng tên ${user?.lastname} này không?  `)) {
            try {
                let response = await deleteUserService(user?.id);
                if (response && response.errCode === 0) {
                    await this.fetchUser();
                } else {
                    console.log(response.errMessage);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    handleClickUpdate = (user) => {
        this.setState({
            isOpenModalUserEdit: true,
            userEdit: user
        });
    }

    handleUpdateUser = async (user) => {
        try {
            let response = await updateUserService(user);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                this.setState({
                    isOpenModalUserEdit: false
                })
                await this.fetchUser();
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        let { users } = this.state;
        return (
            <div className="users-container">
                <UserModal
                    isOpen={this.state.isOpenModalUserCreate}
                    toggleFromParent={this.toggleUserModalCreate}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalUserEdit &&
                    <UserModalEdit
                        isOpen={this.state.isOpenModalUserEdit}
                        toggleFromParent={this.toggleUserModalEdit}
                        userEdit={this.state.userEdit}
                        handleUpdateUser={this.handleUpdateUser}
                    />
                }
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
                                        <button className='btn btn-warning me-3'
                                            onClick={() => this.handleClickUpdate(user)}>
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
