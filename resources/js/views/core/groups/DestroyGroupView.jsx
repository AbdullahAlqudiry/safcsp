import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {groupData, destroyGroup} from './../../../redux/actions/Core/GroupsActions';

import AppLayout from './../../../components/AppLayout';

class DestroyGroupView extends React.Component {

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

    destroyGroup = (e) => {
        e.preventDefault();
        
        this.props.destroyGroup(this.props.match.params.id)
        .then(response => {
            this.props.history.push('/core/groups');
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
                                    Destroy Group: {this.state.groupData.name}
                                </h4>
                                <div className="float-right">
                                    <Link to="/core/groups" className="btn btn-primary">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.destroyGroup}>
        
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            When you Destroy the group all related things like reports, documents, ..etc will be destroyed
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
        groupData, destroyGroup
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DestroyGroupView);