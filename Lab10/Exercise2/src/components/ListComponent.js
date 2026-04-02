import React, { useState } from 'react';
import '../styles/ListComponent.css';
import InputComponent from './InputComponent';
import ItemList from './ItemList';

/**
 * Main List Manager Component
 * Manages the state for list items and handles add/remove operations
 * Separates input logic and display logic into child components
 */
const ListComponent = () => {
  // State to manage the array of items
  const [items, setItems] = useState([
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' }
  ]);

  /**
   * Handle adding a new item to the list
   * Creates new item with unique ID and adds to state
   */
  const handleAddItem = (itemName) => {
    // Validate input is not empty
    if (!itemName.trim()) {
      alert('Please enter an item name');
      return;
    }

    // Create new item with unique identifier
    const newItem = {
      id: Date.now(), // Unique ID using timestamp
      name: itemName
    };

    // Update list state - add new item
    setItems([newItem, ...items]);
  };

  /**
   * Handle removing an item from the list
   * Filters out item with matching ID
   */
  const handleRemoveItem = (itemId) => {
    // Filter array to remove item with matching id
    setItems(items.filter(item => item.id !== itemId));
  };

  return (
    <div className="list-container">
      <h2 className="list-title">Product List Manager</h2>

      {/* INPUT LOGIC - Separated into InputComponent */}
      <InputComponent onAddItem={handleAddItem} />

      {/* DISPLAY LOGIC - Separated into ItemList Component */}
      <ItemList items={items} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default ListComponent;
