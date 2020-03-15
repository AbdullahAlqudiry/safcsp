import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {groupData} from './../../../redux/actions/Core/GroupsActions';

import AppLayout from './../../../components/AppLayout';

class ShowGroupView extends React.Component {

    state = {
        groupData: [],
    }

    componentDidMount = () => {

        this.props.groupData(this.props.match.params.id)
        .then(response => {
            this.setState({
                groupData: response,
            });
        })
        .catch(error => {
            this.props.history.push('/core/groups');
        });

    }

    render = () => {

        if(this.state.groupData.length === 0) {
            return null;
        }

        return (
            <AppLayout>
                
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">

                            <div className="card-header">
                                <h4 className="float-left">
                                    Show Group: {this.state.groupData.name}
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/groups" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <h4 className="mb-2">Users</h4>
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.groupData.users.map((user, index) => (
                                                <tr key={index}>
                                                    <th>{user.id}</th>
                                                    <th>{user.name}</th>
                                                    <th>{user.email}</th>
                                                    <td>{user.current_role}</td>
                                                    <td>
                                                        <div className="float-right">
                                                            <Link to={'/core/groups/'+ this.props.match.params.id +'/'+ user.id +'/remove-user'} className="btn btn-danger">Remove</Link>
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

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        groupData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowGroupView);