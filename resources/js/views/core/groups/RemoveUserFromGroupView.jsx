import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {groupData, removeUserFromGroup} from './../../../redux/actions/Core/GroupsActions';

import AppLayout from './../../../components/AppLayout';

class RemoveUserFromGroupView extends React.Component {

    state = {
        groupData: [],
        name: '',
        formErrors: {},
    }

    componentDidMount = () => {

        this.props.groupData(this.props.match.params.id)
        .then(response => {
            this.setState({
                groupData: response,
                name: response.name
            });
        })
        .catch(error => {
            this.props.history.push('/core/groups');
        });

    }

    removeUserFromGroup = (e) => {
        e.preventDefault();
        
        this.props.removeUserFromGroup(this.props.match.params.id, this.props.match.params.user_id)
        .then(response => {
            this.props.history.push('/core/groups/' + this.props.match.params.id + '/show');
        })
        .catch(response => {

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
                                    Remove User From Group: {this.state.groupData.name}
                                </h4>
                                <div className="float-right">
                                    <Link to={'/core/groups/' + this.props.match.params.id + '/show'} className="btn btn-primary">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.removeUserFromGroup}>
        
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            When you remove user from this group he will not be able to add reports in this group
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-danger">Remove</button>
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
        groupData, removeUserFromGroup
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveUserFromGroupView);