import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {permissionsData, createNewRole} from './../../../redux/actions/Core/RolesActions';

import AppLayout from './../../../components/AppLayout';

class CreateRoleView extends React.Component {

    state = {
        name: '',
        permissions_ids: [],
        permissionsData: [],
        formErrors: {},
    }

    componentDidMount = () => {

        this.props.permissionsData()
        .then(response => {
            this.setState({permissionsData: response});
        })
        .catch(error => {

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

    createNewRole = (e) => {
        e.preventDefault();
        
        this.props.createNewRole({name: this.state.name, permissions_ids: this.state.permissions_ids})
        .then(response => {
            this.props.history.push('/core/roles');
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
                                    Create New Role
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/roles" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.createNewRole} onChange={this.handleFormChange}>
        
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
                                                            <input type="checkbox" className="mr-2" onChange={(e) => { this.handlePermissionsCheckBoxChange(e, permission.id) }} />
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

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        permissionsData, createNewRole
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoleView);