import React, { useState } from 'react';
import { PlanetDetails, PlanetList } from '../sw-components';
import Row from '../row';

const PlanetsPage = () => {
  const [selectedItem, setItem] = useState(null)

  const onItemSelected = (selectedItem) => {
    setItem(selectedItem)
  };

  return (
    <Row
      left={<PlanetList onItemSelected={onItemSelected} />}
      right={<PlanetDetails itemId={selectedItem} />} />
  );
}

export default PlanetsPage