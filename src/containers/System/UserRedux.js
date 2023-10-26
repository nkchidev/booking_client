import React, { Component } from 'react';
import { connect } from 'react-redux';
class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }
   

    componentDidMount() {
    }


    render() {
        return (
            <div className="text-center" >User Redux</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
