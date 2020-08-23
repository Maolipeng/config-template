import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../src/store';
import '@/normalize.css';
import '@/App.css';
import routerConfig from '@/router';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {
            routerConfig.map( (route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
          }
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
