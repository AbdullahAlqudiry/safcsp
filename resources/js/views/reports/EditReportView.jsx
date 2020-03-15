import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {groupsData, reportData, updateReport} from './../../redux/actions/ReportsActions';

import AppLayout from './../../components/AppLayout';

class EditReportView extends React.Component {

    state = {
        reportData: [],
        groupsData: [],
        title: '',
        content: '',
        tags: '',
        group_ids: [],
        formErrors: {},
    }

    componentDidMount = () => {

        this.props.reportData(this.props.match.params.id)
        .then(response => {

            this.setState({
                reportData: response,
                title: response.title,
                content: response.content,
                tags: response.tags,
            });

            response.groups.map((group, index) => {
                this.setState(prevState => ({
                    group_ids: [...prevState.group_ids, group.id]
                }))
            });

            this.props.groupsData()
            .then(response => {
                this.setState({groupsData: response});
            })
            .catch(error => {});

        })
        .catch(error => {
            this.props.history.push('/reports');
        });

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

    updateReportData = (e) => {
        e.preventDefault();

        this.props.updateReport(this.props.match.params.id, {title: this.state.title, content: this.state.content, tags: this.state.tags, group_ids: this.state.group_ids})
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
                                    Edit Report: {this.state.reportData.title}
                                </h4>
                                <div className="float-right">
                                    <Link to="/reports" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                
                                <form onSubmit={this.updateReportData} onChange={this.handleFormChange}>
        
                                    <div className="form-group row">
                                        <label htmlFor="title" className="col-md-4 col-form-label text-md-right">Title</label>
                                        <div className="col-md-6">
                                            <input type="text" id="title" name="title" className="form-control" defaultValue={this.state.title} />
                                            { this.state.formErrors.title ? <span className="text-danger">{this.state.formErrors.title[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">content</label>
                                        <div className="col-md-6">
                                            <textarea type="text" id="content" name="content" className="form-control" defaultValue={this.state.content} rows="5"/>
                                            { this.state.formErrors.content ? <span className="text-danger">{this.state.formErrors.content[0]}</span> : null }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="title" className="col-md-4 col-form-label text-md-right">Tags</label>
                                        <div className="col-md-6">
                                            <input type="text" id="tags" name="tags" className="form-control" defaultValue={this.state.tags}/>
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
                                                            <input type="checkbox" className="mr-2" checked={this.state.group_ids.indexOf(group.id) > -1 || false} onChange={(e) => { this.handleGroupsCheckBoxChange(e, group.id) }} />
                                                            {group.name}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        
                                            { this.state.formErrors.group_ids ? <span className="text-danger">{this.state.formErrors.group_ids[0]}</span> : null }

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
        core: state.core,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        groupsData, reportData, updateReport
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReportView);