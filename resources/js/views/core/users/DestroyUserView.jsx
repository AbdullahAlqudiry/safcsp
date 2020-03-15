import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {userData, destroyUser} from './../../../redux/actions/Core/UsersActions';

import AppLayout from './../../../components/AppLayout';

class DestroyUserView extends React.Component {

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

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    destroyUser = (e) => {
        e.preventDefault();
        
        this.props.destroyUser(this.props.match.params.id)
        .then(response => {
            this.props.history.push('/core/users');
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
                                    Destroy User: {this.state.userData.name}
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/users" className="btn btn-primary">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.destroyUser}>
        
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            When you Destroy this user he will not be able to use the system
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-danger">Destroy</button>
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
        userData, destroyUser
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DestroyUserView);