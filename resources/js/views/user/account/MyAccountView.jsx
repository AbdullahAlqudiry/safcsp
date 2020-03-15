import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import AppLayout from './../../../components/AppLayout';

class MyAccountView extends React.Component {

    render = () => {
        return (
            <AppLayout>
                
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">

                            <div className="card-header">
                                <h4 className="float-left">
                                    My Account
                                </h4>
                                <div className="float-right">
                                    <Link to="/user/my-account/edit" className="btn btn-primary">Edit My Account</Link>
                                </div>
                            </div>

                            <div className="card-body">

                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{this.props.user.userData.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{this.props.user.userData.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Member Since</td>
                                            <td>{moment(this.props.user.userData.created_at , "YYYYMMDD").fromNow()}</td>
                                        </tr>
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
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountView);