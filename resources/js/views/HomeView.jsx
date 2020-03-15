import React from 'react';
import AppLayout from './../components/AppLayout';

class HomeView extends React.Component {

    render = () => {
        return (
            <AppLayout>
                
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="float-left">
                                    Home
                                </h4>
                            </div>
                            <div className="card-body">
                                Welcome back :) 3
                            </div>
                        </div>
                    </div>
                </div>
    
            </AppLayout>
        );
    }

}

export default HomeView;
