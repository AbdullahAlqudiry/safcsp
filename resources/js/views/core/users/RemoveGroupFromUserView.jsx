import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {userData, removeGroupFromUser} from './../../../redux/actions/Core/UsersActions';

import AppLayout from './../../../components/AppLayout';

class RemoveGroupFromUserView extends React.Component {

    state = {
        userData: [],
        name: '',
        formErrors: {},
    }

    componentDidMount = () => {

        this.props.userData(this.props.match.params.id)
        .then(response => {
            this.setState({
                userData: response,
                name: response.name
            });
        })
        .catch(error => {
            this.props.history.push('/core/users');
        });

    }

    removeGroupFromUser = (e) => {
        e.preventDefault();
        
        this.props.removeGroupFromUser(this.props.match.params.id, this.props.match.params.group_id)
        .then(response => {
            this.props.history.push('/core/users/' + this.props.match.params.id + '/show');
        })
        .catch(response => {

        });

    }

    render = () => {

        if(this.state.userData.length === 0) {
            return null;
        }
        
        return (
            <AppLayout>
                
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">

                            <div className="card-header">
                                <h4 className="float-left">
                                    Remove Group From User: {this.state.userData.name}
                                </h4>
                                <div className="float-right">
                                    <Link to={'/core/users/' + this.props.match.params.id + '/show'} className="btn btn-primary">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.removeGroupFromUser}>
        
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            When you remove group from this user he will not be able to add reports in this group
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
        userData, removeGroupFromUser
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveGroupFromUserView);