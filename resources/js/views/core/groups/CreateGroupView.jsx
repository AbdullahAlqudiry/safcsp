import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {createNewGroup} from './../../../redux/actions/Core/GroupsActions';

import AppLayout from './../../../components/AppLayout';

class CreateGroupView extends React.Component {

    state = {
        name: '',
        formErrors: {},
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    createNewGroup = (e) => {
        e.preventDefault();
        
        this.props.createNewGroup({name: this.state.name})
        .then(response => {
            this.props.history.push('/core/groups');
        })
        .catch(response => {
            this.setState({formErrors: response.errors});
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
                                    Create New Group
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/groups" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.createNewGroup} onChange={this.handleFormChange}>
        
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                                        <div className="col-md-6">
                                            <input type="text" id="name" name="name" className="form-control" defaultValue={this.state.name} />
                                            { this.state.formErrors.name ? <span className="text-danger">{this.state.formErrors.name[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">Create</button>
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
        createNewGroup
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupView);