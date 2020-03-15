import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {reportData} from './../../redux/actions/ReportsActions';

import AppLayout from './../../components/AppLayout';

class ShowReportView extends React.Component {

    state = {
        reportData: [],
    }

    componentDidMount = () => {

        this.props.reportData(this.props.match.params.id)
        .then(response => {
            this.setState({
                reportData: response,
            });
        })
        .catch(error => {
            this.props.history.push('/reports');
        });

    }

    render = () => {

        if(this.state.reportData.length === 0) {
            return null;
        }

        return (
            <AppLayout>
                
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">

                            <div className="card-header">
                                <h4 className="float-left">
                                    Show Report: {this.state.reportData.title}
                                </h4>
                                <div className="float-right">
                                    <Link to="/reports" className="btn btn-danger">Back</Link>
                                </div>
                            </div>

                            <div className="card-body">
                                { this.state.reportData.content }


                                <hr className="mt-5"/>
                                <b>Tags:</b> {this.state.reportData.tags}

                                <hr className="mt-5"/>
                                <h4>Documents</h4>

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
                                            this.state.reportData.documents.map((document, index) => (
                                                <tr key={index}>
                                                    <th>{document.id}</th>
                                                    <th>{document.document_name}</th>
                                                    <th>
                                                        <div className="float-right">
                                                            <a href={'/reports/' + document.report_id + '/documents/' + document.document_path} className="btn btn-primary">Download</a>
                                                        </div>
                                                    </th>
                                                </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>

                                <hr className="mt-5"/>
                                <h4>Groups</h4>

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
                                            this.state.reportData.groups.map((group, index) => (
                                                <tr key={index}>
                                                    <th>{group.id}</th>
                                                    <th>{group.name}</th>
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
        reportData
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowReportView);