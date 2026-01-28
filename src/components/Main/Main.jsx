// src/components/Main/Main.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

const initialItems = [
  {
    id: 1,
    name: "Nissin Chow Mein",
    price: 2.75,
    category: "Category",
    priority: "Priority",
    qty: 10,
  },
  {
    id: 2,
    name: "Eggs (dozen)",
    price: 3.99,
    category: "Category",
    priority: "Priority",
    qty: 0,
  },
  {
    id: 3,
    name: "Chicken breast",
    price: 6.49,
    category: "Category",
    priority: "Priority",
    qty: 0,
  },
];

function Main() {
  const [items, setItems] = useState(initialItems);

  // UI-only for now (you’ll wire these later)
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );

  const handleInc = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const handleDec = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty - 1) } : item,
      ),
    );
  };

  // For now, show first item to match your screenshot’s “single row” look
  const featured = items[0];

  return (
    <section className="main">
      <div className="main__panel">
        <div className="main__controls">
          <div className="main__filters">
            <label className="main__field">
              <span className="main__label">Filter category:</span>
              <select
                className="main__select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pantry">Pantry</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
              </select>
            </label>

            <label className="main__field">
              <span className="main__label">Filter priority:</span>
              <select
                className="main__select"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Essential">Essential</option>
                <option value="Needed">Needed</option>
                <option value="Optional">Optional</option>
              </select>
            </label>
          </div>

          <div className="main__actions">
            <button className="main__action-btn" type="button">
              Add Item
            </button>
            {/* <button className="main__action-btn" type="button"> */}
            <Link
              className="main__action-btn main__action-link"
              to="/full-list"
            >
              Open Full List
            </Link>
            {/* </button> */}
          </div>
        </div>

        <div className="main__row">
          <div className="main__row-left">
            <span className="main__item-name">
              {featured?.name ?? "Item name"}
            </span>
          </div>

          <div className="main__row-right">
            <span className="main__badge main__badge--priority">
              {featured?.priority ?? "Priority"}
            </span>
            <span className="main__badge main__badge--category">
              {featured?.category ?? "Category"}
            </span>

            <div className="main__qty-wrap" aria-label="Quantity controls">
              <button
                className="main__qty-btn"
                type="button"
                onClick={() => handleDec(featured.id)}
                aria-label={`Decrease quantity of ${featured.name}`}
              >
                –
              </button>

              <span
                className="main__qty"
                aria-label={`Quantity ${featured.qty}`}
              >
                {featured.qty}
              </span>

              <button
                className="main__qty-btn"
                type="button"
                onClick={() => handleInc(featured.id)}
                aria-label={`Increase quantity of ${featured.name}`}
              >
                +
              </button>
            </div>

            <span className="main__price">
              ${((featured?.price ?? 0) * (featured?.qty ?? 0)).toFixed(2)}
            </span>
          </div>
        </div>

        {/* optional: you can keep this for debugging */}
        <p className="main__totalline">Cart total: ${total.toFixed(2)}</p>
      </div>
    </section>
  );
}

export default Main;
