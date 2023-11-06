import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import "./TableManageUser.scss"

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }


    async componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render => didUpdate
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            });
        }
    }
    
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <table id='table-manage-user'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>

                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) =>
                            <tr key={ index }>
                                <td>{item.email}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-warning'
                                        onClick={() => this.handleEditUser(item)}    
                                    >
                                        <i className='fas fa-pencil-alt'></i>
                                    </button>
                                    <button
                                        onClick={() => this.handleDeleteUser(item)}
                                        className='btn-danger ml-1'
                                    >
                                        <i className='fas fa-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        )

                    }
                </tbody>
            </table>
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
