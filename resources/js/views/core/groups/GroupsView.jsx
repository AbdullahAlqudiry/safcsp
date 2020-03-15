import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {groupsData} from './../../../redux/actions/Core/GroupsActions';

import AppLayout from './../../../components/AppLayout';

class GroupsView extends React.Component {

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
        
        this.props.groupsData(pageID, this.state.search_value)
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
                                    Groups
                                </h4>
                                <div className="float-right">
                                    {
                                        this.props.user.userData.permissions.core_add_groups ?
                                            <Link to="/core/groups/create" className="btn btn-primary">New Group</Link>
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
                                    this.props.core.groupsData.total ? 
                                        <div className="float-right">
                                            Total Groups: {this.props.core.groupsData.total}
                                        </div>
                                    :
                                        null
                                }
                                

                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Users</th>
                                            <th>Reports</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.core.groupsData.data.map((group, index) => (
                                                <tr key={index}>
                                                    <th>{group.id}</th>
                                                    <th>{group.name}</th>
                                                    <th>{group.users_count}</th>
                                                    <th>{group.reports_count}</th>
                                                    <td>
                                                        <div className="float-right">
                                                            <Link to={'/core/groups/' + group.id + '/show'} className="btn btn-primary">Show</Link>

                                                            {
                                                                this.props.user.userData.permissions.core_edit_groups ?
                                                                    <Link to={'/core/groups/' + group.id + '/edit'} className="btn btn-warning ml-2">Edit</Link>
                                                                :
                                                                    null
                                                            }

                                                            {
                                                                this.props.user.userData.permissions.core_delete_groups ?
                                                                    <Link to={'/core/groups/' + group.id + '/destroy'} className="btn btn-danger ml-2">Destroy</Link>
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
        groupsData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsView);