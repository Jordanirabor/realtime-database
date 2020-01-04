import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL
const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY
const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER

function App() {

  const [inventories, setInventories] = useState([]);
  const [inventory, setInventory] = useState({ name: '', price: '' });

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setInventory(prevInventory => ({ ...prevInventory, [name]: value }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(inventory)

    if (!(inventory.name.length && inventory.price)) {
      return;
    }

    const newInventory = {
      name: inventory.name,
      price: inventory.price
    }

    fetch(API_URL + 'new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInventory)
    }).then(console.log)
  }

  const deleteInventory = id => {
    fetch(API_URL + id, {
      method: 'delete'
    }).then(console.log);
  }

  const addInventory = newInventory => {
    setInventories(prevInventories => prevInventories.concat(newInventory))
    setInventory({ name: '', price: '' })
  }

  const removeInventory = id => {
    setInventories(prevInventories => prevInventories.filter(el => el.id !== id))
  }

  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true
    });

    let channel = pusher.subscribe('inventories');
    channel.bind('inserted', addInventory)
    channel.bind('deleted', removeInventory)
  }, [])

  return (
    <div className="inventory">
      <h2> INVENTORY LIST</h2>

      <div className="list">
        <div> Name </div>
        <div> Price</div>
        {inventories.map(inventory => <Inventory key={inventory.id} inventory={inventory} onItemClick={deleteInventory} />)}
      </div>

      <div className="form-holder">
        <form className="form">
          <input type="text" name="name" className="name" placeholder="Name" onChange={handleChange} value={inventory.name} />
          <input type="number" name="price" className="price" placeholder="Price" onChange={handleChange} value={inventory.price} />
          <div className="submit" onClick={handleSubmit}>+</div>
        </form>
      </div>

    </div>
  );
}

function Inventory(props) {
  return (
    <div key={props.inventory.id}>
      <div className="text">{props.inventory.name} {props.inventory.price}</div>
      <div className="delete" onClick={() => props.onItemClick(props.inventory.id)}>-</div>
    </div>
  );
}

export default App;
