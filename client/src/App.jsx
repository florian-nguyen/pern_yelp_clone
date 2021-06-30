import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';
import HomePage from './routes/HomePage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

// Switch is used so that only one route is served, and to avoid loading multiple pages
const App = () => {
    return (
        <RestaurantsContextProvider>

            <div className="container m-0 p-0 mx-auto">
                <Router basename ="/client">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        < Route exact path="/restaurants/:id/update" component={UpdatePage} />
                        <Route exact path="/restaurants/:id" component={RestaurantDetailPage} />
                    </Switch >
                </Router >
            </div >
        </RestaurantsContextProvider>
    );
};

export default App;