import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import {reportData, destroyReport} from './../../redux/actions/ReportsActions';

import AppLayout from './../../components/AppLayout';

class DestroyReportView extends React.Component {

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

    destroyReport = (e) => {
        e.preventDefault();
        
        this.props.destroyReport(this.props.match.params.id)
        .then(response => {
            this.props.history.push('/reports');
        })
        .catch(response => {
            
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
                                <form onSubmit={this.destroyReport}>
            
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            When you Destroy this report all related things like documents, ..etc will be destroyed
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
        reportData, destroyReport
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DestroyReportView);