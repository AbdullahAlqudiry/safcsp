import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {groupsData, createNewReport} from './../../redux/actions/ReportsActions';

import AppLayout from './../../components/AppLayout';

class CreateReportView extends React.Component {

    state = {
        groupsData: [],
        title: '',
        content: '',
        tags: '',
        group_ids: [],
        documents: [''],
        formErrors: {},
    }

    componentDidMount = () => {

        this.props.groupsData()
        .then(response => {
            this.setState({groupsData: response});
        })
        .catch(error => {});
    }

    handleFormChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleGroupsCheckBoxChange = (e, id) => {
        if(e.target.checked) {
            this.setState({ group_ids: [...this.state.group_ids, id] })
        }
        else {
            this.setState({group_ids: this.state.group_ids.filter(group => group != id )});
        }
    }

    onDocumentsChange = (e, index) => {
        const { documents } = this.state;
        documents[index] = e.target.files[0];
    
        // update state
        this.setState({
            documents,
        });

    }

    addMoreFile = (e) => {
        this.setState({ documents: [...this.state.documents, ''] })
    }

    createNewReport = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('tags', this.state.tags);
        formData.append('group_ids[]', this.state.group_ids);

        this.state.documents.map((document, index) => {
            formData.append('documents['+ index +']', document);
        });

        this.props.createNewReport(formData)
        .then(response => {
            this.props.history.push('/reports');
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
                                    Create Report
                                </h4>
                                <div className="float-right">
                                    <Link to="/reports" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.createNewReport}>
        
                                    <div className="form-group row">
                                        <label htmlFor="title" className="col-md-4 col-form-label text-md-right">Title</label>
                                        <div className="col-md-6">
                                            <input type="text" id="title" name="title" className="form-control" defaultValue={this.state.title}  onChange={this.handleFormChange}/>
                                            { this.state.formErrors.title ? <span className="text-danger">{this.state.formErrors.title[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">content</label>
                                        <div className="col-md-6">
                                            <textarea type="text" id="content" name="content" className="form-control" defaultValue={this.state.content}  onChange={this.handleFormChange} rows="5"/>
                                            { this.state.formErrors.content ? <span className="text-danger">{this.state.formErrors.content[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="title" className="col-md-4 col-form-label text-md-right">Tags</label>
                                        <div className="col-md-6">
                                            <input type="text" id="tags" name="tags" className="form-control" defaultValue={this.state.tags}  onChange={this.handleFormChange}/>
                                            { this.state.formErrors.tags ? <span className="text-danger">{this.state.formErrors.tags[0]}</span> : null }
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label text-md-right">Groups</label>
                                        <div className="col-md-6">
                                            {
                                                this.state.groupsData.map((group, index) => (
                                                    <div key={index} className="mt-2">
                                                        <span>
                                                            <input type="checkbox" className="mr-2" onChange={(e) => { this.handleGroupsCheckBoxChange(e, group.id) }} />
                                                            {group.name}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        
                                            { this.state.formErrors.group_ids ? <span className="text-danger">{this.state.formErrors.group_ids[0]}</span> : null }

                                       </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Documents</label>
                                        <div className="col-md-6">
                                            
                                            {
                                                this.state.documents.map((document, index) => (
                                                    <input key={index} type="file" id={'documents['+ index +']'} name={'documents['+ index +']'} className="form-control mt-2" onChange={(e) => { this.onDocumentsChange(e, index) }}/>
                                                ))
                                            }
                                            { this.state.formErrors.documents ? <span className="text-danger">{this.state.formErrors.documents[0]}</span> : null }
                                        
                                            <div className="mt-2" onClick={this.addMoreFile}>
                                                Add More Fils
                                            </div>
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
        core: state.core,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        groupsData, createNewReport
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReportView);