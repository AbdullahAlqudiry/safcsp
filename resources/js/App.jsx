import './Bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesBuiilder from './containers/RoutesBuiilder';
import Store from './redux/Store';


class App extends React.Component {

    render = () => {
        return (
            <Provider store={Store}>
                <Router>
                    <div>
                        <RoutesBuiilder />
                    </div>
                </Router>
            </Provider>
            
        );
    }

}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}