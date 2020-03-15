import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux actions
import {userData} from './../redux/actions/UserActions';


import RoutesList from './RoutesList';

class RoutesBuiilder extends React.Component {

    state = {
        isAppLoading: true,
    }

    componentDidMount = () => {
        
        this.props.userData()
        .then(response => {
            this.setState({isAppLoading: false});
        })
        .catch(error => {
            this.setState({isAppLoading: false});
        });

    }

    render = () => {
        
        const rememberToken = this.props.user.rememberToken;
        
        return (
            <div>
                {
                    RoutesList.map((route, index) => {
                        
                        if(route.userStatus == 'guest' && rememberToken !== null) {
                            return false;
                        }

                        if(route.userStatus == 'auth') {

                            if(rememberToken === null) {
                                return <Redirect key={index} to="/" />;
                            }

                            else if(route.permissionName !== undefined && !this.props.user.userData.permissions[route.permissionName]) {
                                return false;
                            }
                            
                        }
                        
                        return (<Route key={index} exact path={route.path} component={route.view} />);
                        
                    })
                }
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesBuiilder);