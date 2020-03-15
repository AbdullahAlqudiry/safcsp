import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {roleData} from './../../../redux/actions/Core/RolesActions';

import AppLayout from './../../../components/AppLayout';

class ShowRoleView extends React.Component {

    state = {
        roleData: [],
    }

    componentDidMount = () => {

        this.props.roleData(this.props.match.params.id)
        .then(response => {
            this.setState({
                roleData: response,
            });
        })
        .catch(error => {
            this.props.history.push('/core/roles');
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
                                    Show Role: {this.state.roleData.name}
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/roles" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Permissions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.roleData.permissions.map((permission, index) => (
                                                <tr key={index}>
                                                    <th>{permission.label}</th>
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
        roleData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowRoleView);