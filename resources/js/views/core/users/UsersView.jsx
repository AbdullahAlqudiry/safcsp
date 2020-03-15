import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {usersData} from './../../../redux/actions/Core/UsersActions';

import AppLayout from './../../../components/AppLayout';

class UsersView extends React.Component {

    state = {
        search_value: '',
        currentPage: 1,
    }

    componentDidMount = () => {
        this.loadMoreData(this.state.currentPage);
    }

    searchInData(e) {
        
        this.setState({
            search_value: e.target.value,
        })

        this.loadMoreData(this.state.currentPage);

    }

    loadMoreData(pageID) {
        
        this.props.usersData(pageID, this.state.search_value)
        .then(response => {
            this.setState({
                currentPage: pageID
            });
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
                                    Users
                                </h4>
                                <div className="float-right">
                                    {
                                        this.props.user.userData.permissions.core_add_users ?
                                            <Link to="/core/users/create" className="btn btn-primary">New User</Link>
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
                
                                {
                                    this.props.core.usersData.total ? 
                                        <div className="float-right">
                                            Total Users: {this.props.core.usersData.total}
                                        </div>
                                    :
                                        null
                                }
                                

                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Groups</th>
                                            <th>Reports</th>
                                            <th>Role</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.core.usersData.data.map((user, index) => (
                                                <tr key={index}>
                                                    <th>{user.id}</th>
                                                    <th>{user.name}</th>
                                                    <th>{user.email}</th>
                                                    <td>{user.groups_count}</td>
                                                    <td>{user.reports_count}</td>
                                                    <td>{user.current_role}</td>
                                                    <td>
                                                        <div className="float-right">
                                                            <Link to={'/core/users/' + user.id + '/show'} className="btn btn-primary">Show</Link>

                                                            {
                                                                this.props.user.userData.permissions.core_edit_users ?
                                                                    <Link to={'/core/users/' + user.id + '/edit'} className="btn btn-warning ml-2">Edit</Link>
                                                                :
                                                                    null
                                                            }

                                                            {
                                                                this.props.user.userData.permissions.core_delete_users ?
                                                                    <Link to={'/core/users/' + user.id + '/destroy'} className="btn btn-danger ml-2">Destroy</Link>
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

                                <div className="float-right mt-1">
                                    <span className="btn btn-light" onClick={() => { this.loadMoreData(this.state.currentPage - 1) }}>Previous</span>
                                    <span className="btn btn-light ml-1" onClick={() => { this.loadMoreData(this.state.currentPage + 1) }}>Next</span>
                                </div>

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
        usersData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersView);