import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {userData} from './../../../redux/actions/Core/UsersActions';

import AppLayout from './../../../components/AppLayout';

class ShowUserView extends React.Component {

    state = {
        userData: [],
    }

    componentDidMount = () => {

        this.props.userData(this.props.match.params.id)
        .then(response => {
            this.setState({
                userData: response,
            });
        })
        .catch(error => {
            this.props.history.push('/core/users');
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
                                    Show User: {this.state.userData.name}
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/users" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <h4 className="mb-2">Groups</h4>
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
                                            this.state.userData.groups.map((group, index) => (
                                                <tr key={index}>
                                                    <th>{group.id}</th>
                                                    <th>{group.name}</th>
                                                    <td>
                                                        <div className="float-right">
                                                            <Link to={'/core/users/'+ this.props.match.params.id +'/'+ group.id +'/remove-group'} className="btn btn-danger">Remove</Link>
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
        userData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserView);