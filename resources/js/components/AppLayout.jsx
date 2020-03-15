import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux actions
import {userData} from './../redux/actions/UserActions';

class AppLayout extends React.Component {

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

        if(this.state.isAppLoading) {
            return null;
        }

        return (
            <div>

                <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                    <div className="container">

                        <Link to="/" className="navbar-brand">SAFCSP PROJECT</Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav mr-auto">

                            </ul>
                            
                            {
                                !this.props.user.userHasLogged ? 

                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to="/user/auth/login" className="nav-link">Login</Link>
                                        </li>
                                    </ul>

                                    :

                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to="/user/my-account" className="nav-link">My Account</Link>
                                        </li>

                                        {
                                            this.props.user.userData.permissions.core_view_roles ?
                                                <li className="nav-item">
                                                    <Link to="/core/roles" className="nav-link">Roles</Link>
                                                </li>
                                            :
                                            null
                                        }

                                        {
                                            this.props.user.userData.permissions.core_view_groups ?
                                                <li className="nav-item">
                                                    <Link to="/core/groups" className="nav-link">Groups</Link>
                                                </li>
                                            :
                                            null
                                        }

                                        {
                                            this.props.user.userData.permissions.core_view_users ?
                                                <li className="nav-item">
                                                    <Link to="/core/users" className="nav-link">Users</Link>
                                                </li>
                                            :
                                            null
                                        }
                                        

                                        <li className="nav-item">
                                            <Link to="/reports" className="nav-link">Reports</Link>
                                        </li>
                                        
                                        <li className="nav-item">
                                            <Link to="/user/auth/logout" className="nav-link">Logout</Link>
                                        </li>
                                    </ul>
                            }
                            
                        </div>
                        
                    </div>
                </nav>

                <main className="py-4">
                    <div className="container">
                        
                        {
                            this.props.app.showLoadingSpinner ? 
                                <div className="spinner-border text-secondary mb-2"></div>
                            :
                                null
                        }

                        {this.props.children}
                    </div>
                </main>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);