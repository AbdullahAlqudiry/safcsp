import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux actions
import {userLogout} from './../../../redux/actions/UserActions';


class LogoutView extends React.Component {

    
    componentDidMount = () => {
        this.props.userLogout()
        .then(response => {
            this.props.history.push('/');
        })
        .catch(error => {
            this.props.history.push('/user/my-account');
        });
    }

    
    render = () => {
        return null;
    }

}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userLogout
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);