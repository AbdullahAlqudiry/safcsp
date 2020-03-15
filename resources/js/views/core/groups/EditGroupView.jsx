import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {groupData, updateGroup} from './../../../redux/actions/Core/GroupsActions';

import AppLayout from './../../../components/AppLayout';

class EditGroupView extends React.Component {

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

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    updateGroup = (e) => {
        e.preventDefault();
        
        this.props.updateGroup(this.props.match.params.id, {name: this.state.name})
        .then(response => {
            this.props.history.push('/core/groups');
        })
        .catch(response => {
            this.setState({formErrors: response.errors});
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
                                    Edit Group
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/groups" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.updateGroup} onChange={this.handleFormChange}>
        
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                                        <div className="col-md-6">
                                            <input type="text" id="name" name="name" className="form-control" defaultValue={this.state.name} />
                                            { this.state.formErrors.name ? <span className="text-danger">{this.state.formErrors.name[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">Save</button>
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
        groupData, updateGroup
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupView);