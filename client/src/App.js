import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL
const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY
const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER

function App() {

  const [inventories, setInventories] = useState([]);
  const [inventory, setInventory] = useState({});

  handleChange = (evt) => {
    setInventory(evt.target.value)
  }

  postInventory = (evt) => {
    evt.preventDefault();

    if (!inventory.length) {
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

  deleteInventory = id => {
    fetch(API_URL + id, {
      method: 'delete'
    }).then(console.log);
  }

  addInventory = newInventory => {
    setInventory(prevInventories => prevInventories.concat(newInventory))
    setInventory({})
  }

  removeInventory = id => {
    setInventory(prevInventories => prevInventories.filter(el => el.id !== id))
  }

  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true
    });

    let channel = pusher.subscribe('inventories');
    channel.bind('inserted', addInventory)
    channel.bind('deleted', removeInventory)

  })



  return (
    <div>

    </div>
  );
}

export default App;
