import React from 'react';

/**
 * Item List Component - Handles display logic
 * Responsible for rendering list items dynamically using map()
 * Demonstrates proper key attribute usage for React reconciliation
 */
const ItemList = ({ items, onRemoveItem }) => {
  // Conditional rendering: show empty state if no items
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-message">No items yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="list-display-section">
      <h3 className="items-header">Items ({items.length})</h3>

      {/* Dynamic list rendering using map() function */}
      {/* Each item has a unique key attribute for React reconciliation */}
      <ul className="items-list">
        {items.map((item) => (
          // key={item.id} - Unique identifier for each list item
          <li key={item.id} className="list-item">
            <div className="item-content">
              {/* Display item name */}
              <span className="item-name">{item.name}</span>
              {/* Display unique ID for demonstration */}
              <span className="item-id">ID: {item.id}</span>
            </div>

            {/* Remove button with onClick event handler */}
            <button
              onClick={() => onRemoveItem(item.id)}
              className="remove-btn"
              title="Remove item"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
