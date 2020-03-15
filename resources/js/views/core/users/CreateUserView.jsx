import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {rolesData, groupsData, createNewUser} from './../../../redux/actions/Core/UsersActions';

import AppLayout from './../../../components/AppLayout';

class CreateUserView extends React.Component {

    state = {
        groupsData: [],
        rolesData: [],
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: 0,
        group_ids: [],
        formErrors: {},
    }

    componentDidMount = () => {

        this.props.rolesData()
        .then(response => {
            this.setState({rolesData: response});
        })
        .catch(error => {});

        this.props.groupsData()
        .then(response => {
            this.setState({groupsData: response});
        })
        .catch(error => {});
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleGroupsCheckBoxChange = (e, id) => {
        if(e.target.checked) {
            this.setState({ group_ids: [...this.state.group_ids, id] })
        }
        else {
            this.setState({group_ids: this.state.group_ids.filter(group => group != id )});
        }
    }

    createNewUser = (e) => {
        e.preventDefault();
        
        this.props.createNewUser({name: this.state.name, email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation, role_id: this.state.role_id, group_ids: this.state.group_ids})
        .then(response => {
            this.props.history.push('/core/users');
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
                                    Create New User
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/users" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.createNewUser} onChange={this.handleFormChange}>
        
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                                        <div className="col-md-6">
                                            <input type="text" id="name" name="name" className="form-control" defaultValue={this.state.name} />
                                            { this.state.formErrors.name ? <span className="text-danger">{this.state.formErrors.name[0]}</span> : null }
                                        </div>
                                    </div>

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

                                    <div className="form-group row">
                                        <label htmlFor="password_confirmation" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                        <div className="col-md-6">
                                            <input type="password" id="password_confirmation" name="password_confirmation" className="form-control" defaultValue={this.state.password_confirmation} />
                                            { this.state.formErrors.password_confirmation ? <span className="text-danger">{this.state.formErrors.password_confirmation[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="role_id" className="col-md-4 col-form-label text-md-right">Role</label>
                                        <div className="col-md-6">
                                            <select id="role_id" name="role_id" className="form-control">
                                                <option></option>
                                                {
                                                    this.state.rolesData.map((role, index) => (
                                                        <option key={index} value={role.id}>{role.name}</option>
                                                    ))
                                                }
                                            </select>
                                            { this.state.formErrors.role_id ? <span className="text-danger">{this.state.formErrors.role_id[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label text-md-right">Groups</label>
                                        <div className="col-md-6">
                                            {
                                                this.state.groupsData.map((group, index) => (
                                                    <div key={index} className="mt-2">
                                                        <span>
                                                            <input type="checkbox" className="mr-2" onChange={(e) => { this.handleGroupsCheckBoxChange(e, group.id) }} />
                                                            {group.name}
                                                        </span>
                                                    </div>
                                                ))
                                            }

                                            { this.state.formErrors.group_ids ? <span className="text-danger">{this.state.formErrors.group_ids[0]}</span> : null }

                                       </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">Create</button>
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
        core: state.core,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        rolesData, groupsData, createNewUser
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserView);