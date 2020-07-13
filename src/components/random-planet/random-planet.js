import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

const RandomPlanet = ({ updateInterval }) => {

  const swapiService = new SwapiService();

  const [componentState, setState] = useState({
    planet: {},
    loading: true,
    error: false
  })

  useEffect(() => {
    updatePlanet();
    const interval = setInterval(updatePlanet, updateInterval);
    return () => clearInterval(interval)
  }, [])

  const onPlanetLoaded = (planet) => {
    setState({
      planet,
      loading: false,
      error: false
    });
  };

  const onError = (err) => {
    setState({
      error: true,
      loading: false
    });
  };

  const updatePlanet = () => {
    const id = Math.floor(Math.random()*17) + 2;
    swapiService
      .getPlanet(id)
      .then(onPlanetLoaded)
      .catch(onError);
  };

  const { planet, loading, error } = componentState
  const hasData = !(loading || error);
  const errorMessage = error ? <ErrorIndicator /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = hasData ? <PlanetView planet={planet} /> : null;
  return (
    <div className="random-planet jumbotron rounded">
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

RandomPlanet.propTypes = {
  updateInterval: PropTypes.number
}

RandomPlanet.defaultProps = {
  updateInterval: 5000
}

export default RandomPlanet

const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
           alt="planet" />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};