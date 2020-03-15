import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {permissionsData,roleData, updateRole} from './../../../redux/actions/Core/RolesActions';

import AppLayout from './../../../components/AppLayout';

class EditRoleView extends React.Component {

    state = {
        roleData: [],
        permissions_ids: [],
        permissionsData: [],
        name: '',
        formErrors: {},
    }

    componentDidMount = () => {

        this.props.roleData(this.props.match.params.id)
        .then(response => {
            this.setState({
                roleData: response,
                name: response.name
            });

            response.permissions.map((permission, index) => {
                this.setState(prevState => ({
                    permissions_ids: [...prevState.permissions_ids, permission.id]
                }))
            });

            this.props.permissionsData()
            .then(response => {
                this.setState({permissionsData: response});
            })
            .catch(error => {

            });

        })
        .catch(error => {
            this.props.history.push('/core/roles');
        });

    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handlePermissionsCheckBoxChange = (e, id) => {
        if(e.target.checked) {
            this.setState({ permissions_ids: [...this.state.permissions_ids, id] })
        }
        else {
            this.setState({permissions_ids: this.state.permissions_ids.filter(permission => permission != id )});
        }
    }

    updateRole = (e) => {
        e.preventDefault();
        
        this.props.updateRole(this.props.match.params.id, {name: this.state.name, permissions_ids: this.state.permissions_ids})
        .then(response => {
            this.props.history.push('/core/roles');
        })
        .catch(response => {
            this.setState({formErrors: response.errors});
        });

    }

    render = () => {

        if(this.state.roleData.length === 0) {
            return null;
        }

        return (
            <AppLayout>
                
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">

                            <div className="card-header">
                                <h4 className="float-left">
                                    Edit Role
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/roles" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.updateRole} onChange={this.handleFormChange}>
        
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                                        <div className="col-md-6">
                                            <input type="text" id="name" name="name" className="form-control" defaultValue={this.state.name} />
                                            { this.state.formErrors.name ? <span className="text-danger">{this.state.formErrors.name[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label text-md-right">Permissions</label>
                                        <div className="col-md-6">
                                            {
                                                this.state.permissionsData.map((permission, index) => (
                                                    <div key={index} className="mt-2">
                                                        <span>
                                                            <input type="checkbox" className="mr-2" checked={this.state.permissions_ids.indexOf(permission.id) > -1 || false} onChange={(e) => { this.handlePermissionsCheckBoxChange(e, permission.id) }} />
                                                            {permission.label}
                                                        </span>
                                                    </div>
                                                ))
                                            }

                                            { this.state.formErrors.permissions_ids ? <span className="text-danger">{this.state.formErrors.permissions_ids[0]}</span> : null }

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

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        permissionsData, roleData, updateRole
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleView);