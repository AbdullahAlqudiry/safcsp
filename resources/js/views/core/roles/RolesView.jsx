import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {rolesData} from './../../../redux/actions/Core/RolesActions';

import AppLayout from './../../../components/AppLayout';

class RolesView extends React.Component {

    state = {
        search_value: '',
    }

    componentDidMount = () => {

        this.loadMoreData();
    }

    searchInData(e) {
        
        this.setState({
            search_value: e.target.value,
        })

        this.loadMoreData();

    }

    loadMoreData() {
        
        this.props.rolesData(this.state.search_value)
        .then(response => {
        })
        .catch(response => {
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
                                    Roles
                                </h4>

                                <div className="float-right">
                                    {
                                        this.props.user.userData.permissions.core_add_roles ?
                                            <Link to="/core/roles/create" className="btn btn-primary">New Role</Link>
                                        :
                                            null
                                    }
                                </div>
                                
                            </div>

                            <div className="card-body">              

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <input type="text" id="search" name="search" className="form-control" placeholder="Search" onChange={(e) => { this.searchInData(e) }}/>
                                    </div>
                                </div>
                
                                <div className="float-right">
                                    Total Roles: {this.props.core.rolesData.length}
                                </div>
                                

                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.core.rolesData.map((role, index) => (
                                                <tr key={index}>
                                                    <th>{role.id}</th>
                                                    <th>{role.name}</th>
                                                    <td>
                                                        <div className="float-right">
                                                            
                                                            <Link to={'/core/roles/' + role.id + '/show'} className="btn btn-primary">Show</Link>

                                                            {
                                                                this.props.user.userData.permissions.core_edit_roles ?
                                                                    <Link to={'/core/roles/' + role.id + '/edit'} className="btn btn-warning ml-2">Edit</Link>
                                                                :
                                                                    null
                                                            }

                                                            {
                                                                this.props.user.userData.permissions.core_delete_roles ?
                                                                    <Link to={'/core/roles/' + role.id + '/destroy'} className="btn btn-danger ml-2">Destroy</Link>
                                                                :
                                                                    null
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>

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
        rolesData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesView);