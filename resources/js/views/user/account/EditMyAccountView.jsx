import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {updateUserAccount} from './../../../redux/actions/UserActions';

import AppLayout from './../../../components/AppLayout';

class EditMyAccountView extends React.Component {

    state = {
        password: '',
        password_confirmation: '',
        formErrors: {},
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    updateUserAccountAction = (e) => {
        e.preventDefault();

        this.setState({formErrors: {}});

        this.props.updateUserAccount({password: this.state.password, password_confirmation: this.state.password_confirmation})
        .then(response => {
            this.props.history.push('/user/my-account');
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
                                    Edit My Account
                                </h4>
                                <div className="float-right">
                                    <Link to="/user/my-account" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.updateUserAccountAction} onChange={this.handleFormChange}>
                                    
                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                        <div className="col-md-6">
                                            <input type="password" id="password" name="password" className="form-control" defaultValue={this.state.password} />
                                            { this.state.formErrors.password ? <span className="text-danger">{this.state.formErrors.password[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password_confirmation" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                        <div className="col-md-6">
                                            <input type="password" id="password_confirmation" name="password_confirmation" className="form-control" defaultValue={this.state.password_confirmation} />
                                            { this.state.formErrors.password_confirmation ? <span className="text-danger">{this.state.formErrors.password_confirmation[0]}</span> : null }
                                        </div>
                                    </div>


                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">Save</button>
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
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateUserAccount
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMyAccountView);