import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllUsers } from "../../services/UserService"

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }



    async componentDidMount() {
        let res = await getAllUsers('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                users: res.users
            });
        }
    }


    render() {
        let { users } = this.state;
        return (
            <div className="users-container">
                <div className="title text-center">Manage users</div>
                <div className="users-table mt-3">
                    <table id="customers">
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
                                    <button className='btn btn-danger'>
                                        <span className='p-3'>Xóa</span>
                                    </button>
                                </td>
                            </tr>
                        )}
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
