import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux actions
import {userLogin} from './../../../redux/actions/UserActions';

import AppLayout from './../../../components/AppLayout';

class LoginView extends React.Component {

    state = {
        email: null,
        password: null,
        formErrors: {},
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    userLoginAction = (e) => {
        e.preventDefault();
        
        this.setState({formErrors: {}});

        this.props.userLogin({email: this.state.email, password: this.state.password,})
        .then(response => {
            this.props.history.push('/');
        })
        .catch(response => {
            this.setState({formErrors: response.errors});
        });
    }

    
    render = () => {
        return (
            <AppLayout>
                
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="float-left">
                                    Login
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.userLoginAction} onChange={this.handleFormChange}>
        
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input type="text" id="email" name="email" className="form-control" defaultValue={this.state.email} />
                                            { this.state.formErrors.email ? <span className="text-danger">{this.state.formErrors.email[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                        <div className="col-md-6">
                                            <input type="password" id="password" name="password" className="form-control" defaultValue={this.state.password} />
                                            { this.state.formErrors.password ? <span className="text-danger">{this.state.formErrors.password[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    
            </AppLayout>
        );
    }

}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userLogin
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginView);