import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {roleData, destroyRole} from './../../../redux/actions/Core/RolesActions';

import AppLayout from './../../../components/AppLayout';

class DestroyRoleView extends React.Component {

    state = {
        roleData: [],
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

    destroyRole = (e) => {
        e.preventDefault();
        
        this.props.destroyRole(this.props.match.params.id)
        .then(response => {
            this.props.history.push('/core/roles');
        })
        .catch(response => {
            
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
                                    Destroy Role: {this.state.roleData.name}
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/roles" className="btn btn-primary">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.destroyRole}>
        
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            When you destroy this role all users will be miss this roll
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
        roleData, destroyRole
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DestroyRoleView);