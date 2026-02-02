// src/components/Modals/AddItemModal/AddItemModal.jsx

import { useEffect, useState } from "react";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    // reset each time it opens
    setName("");
    setPrice("");
    setCategory("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedPrice = Number(price);
    if (!name.trim() || Number.isNaN(parsedPrice)) return;

    onSubmit({
      item: name.trim(),
      price: parsedPrice,
      category: category.trim() || "Surplus",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="addmodal" onMouseDown={onClose} role="presentation">
      <div
        className="addmodal__content"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Add Item"
      >
        <button
          type="button"
          className="addmodal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <form className="addmodal__form" onSubmit={handleSubmit}>
          <label className="addmodal__label">
            Item Name
            <input
              className="addmodal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              required
            />
          </label>
          <label className="addmodal__label">
            Item Price
            <input
              className="addmodal__input"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder=""
              required
            />
          </label>

          {/* needs to be dropdown */}
          <label className="addmodal__label">
            Item Category
            <select
              className="addmodal__input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Essential">Essential</option>
              <option value="Surplus">Surplus</option>
              <option value="Optional">Optional</option>
            </select>
          </label>
          <button className="addmodal__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
