import React, { useState, useEffect } from 'react';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

const ItemDetails = (props) => {

  const { itemId, getData, getImageUrl } = props

  const [item, setItem] = useState(null)
  const [image, setImage] = useState(null)

  const updateItem = () => {
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        setItem(item)
        setImage(getImageUrl(item))
      });
  }

  useEffect(() => {
    updateItem()
  }, [itemId, getData, getImageUrl])
  
  if (!item) {
    return <h4 className='text-center'>Select an item from the list</h4>;
  }

  const { name } = item;

  return (
    <div className="item-details card">
      <img className="item-image"
        src={image}
        alt="item"/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(props.children, (child) => {
              return React.cloneElement(child, { item });
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default ItemDetails