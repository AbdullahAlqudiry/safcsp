import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {reportsData} from './../../redux/actions/ReportsActions';


import AppLayout from './../../components/AppLayout';

class ReportsView extends React.Component {

    state = {
        search_value: '',
        currentPage: 1,
    }

    componentDidMount = () => {
        this.loadMoreData(this.state.currentPage);
    }

    searchInData(e) {
        
        this.setState({
            search_value: e.target.value,
        })

        this.loadMoreData(this.state.currentPage);

    }

    loadMoreData(pageID) {
        
        this.props.reportsData(pageID, this.state.search_value)
        .then(response => {
            this.setState({
                currentPage: pageID
            });
        })
        .catch(response => {

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
                                    Reports
                                </h4>
                                <div className="float-right">
                                    {
                                        this.props.user.userData.permissions.reports_add_reports ?
                                            <Link to="/reports/create" className="btn btn-primary">New Report</Link>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            <div className="card-body">              

                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <input type="text" id="search" name="search" className="form-control" placeholder="Search" onChange={(e) => { this.searchInData(e) }}/>
                                    </div>
                                </div>
                
                                {
                                    this.props.reports.reportsData.total ? 
                                        <div className="float-right">
                                            Total reports: {this.props.reports.reportsData.total}
                                        </div>
                                    :
                                        null
                                }
                                

                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Groups</th>
                                            <th>Documents</th>
                                            <th>Created By</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.reports.reportsData.data.map((report, index) => (
                                                <tr key={index}>
                                                    <th>{report.id}</th>
                                                    <th>{report.title}</th>
                                                    <th>{report.groups_count}</th>
                                                    <th>{report.documents_count}</th>                                                    
                                                    <th>{report.user.name}</th>   
                                                    <th>
                                                        <div className="float-right">
                                                            <Link to={'/reports/' + report.id + '/show'} className="btn btn-primary">Show</Link>

                                                            {
                                                                report.can_edit ?
                                                                    <Link to={'/reports/' + report.id + '/edit'} className="btn btn-warning ml-2">Edit</Link>
                                                                :
                                                                    null
                                                            }
                                                            
                                                            {
                                                                report.can_delete ?
                                                                    <Link to={'/reports/' + report.id + '/destroy'} className="btn btn-danger ml-2">Destroy</Link>
                                                                :
                                                                    null
                                                            }
                                                            
                                                        </div>
                                                    </th>                                                 
                                                </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>

                                <div className="float-right mt-1">
                                    <span className="btn btn-light" onClick={() => { this.loadMoreData(this.state.currentPage - 1) }}>Previous</span>
                                    <span className="btn btn-light ml-1" onClick={() => { this.loadMoreData(this.state.currentPage + 1) }}>Next</span>
                                </div>

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
        reports: state.reports,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        reportsData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsView);