import React, { useState } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage } from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import StarshipDetails from '../sw-components/starship-details';

const App = () => {
  
  const [swapiService, setSwapiService] = useState(new SwapiService()) 

  const onServiceChange = () => {
    setSwapiService((swapiService) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  return (
    <ErrorBoundry>
      <SwapiServiceProvider value={swapiService} >
        <Router>
          <div className="stardb-app">
            <Header />
            <RandomPlanet />

            <Switch>
              <Route path="/"
                     render={() => <h2 className='text-center'>Welcome to StarDB</h2>}
                     exact />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route path="/starships/:id"
                     render={({ match }) => {
                       const { id } = match.params;
                       return <StarshipDetails itemId={id} />
                     }}/>
              
              <Route render={() => <h2 className='text-center'>Page not found</h2>} />
            </Switch>

          </div>
        </Router>
      </SwapiServiceProvider>
    </ErrorBoundry>
  );
}

export default App