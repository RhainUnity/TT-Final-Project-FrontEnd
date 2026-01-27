// src/components/Main/Main.jsx
import { useMemo, useState } from "react";
import "./Main.css";

const initialItems = [
  { id: 1, name: "Nissin Chow Mein", price: 2.75, category: "Pantry", qty: 0 },
  { id: 2, name: "Eggs (dozen)", price: 3.99, category: "Dairy", qty: 0 },
  { id: 3, name: "Chicken breast", price: 6.49, category: "Meat", qty: 0 },
];

function Main() {
  const [budget, setBudget] = useState(50);
  const [items, setItems] = useState(initialItems);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  const handleInc = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const handleDec = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty - 1) } : item
      )
    );
  };

  const remaining = budget - total;

  return (
    <section className="main">
      <div className="main__summary">
        <h1 className="main__title">Cart Total Tracker</h1>

        <div className="main__budget-row">
          <label className="main__label" htmlFor="budget">
            Budget
          </label>
          <input
            id="budget"
            className="main__input"
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <div className="main__totals">
          <p className="main__total">
            Total: <span>${total.toFixed(2)}</span>
          </p>
          <p className="main__remaining">
            Remaining: <span>${remaining.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <ul className="main__list">
        {items.map((item) => (
          <li key={item.id} className="main__item">
            <div className="main__item-info">
              <p className="main__item-name">{item.name}</p>
              <p className="main__item-meta">
                {item.category} • ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="main__item-actions">
              <button
                className="main__btn"
                type="button"
                onClick={() => handleDec(item.id)}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                -
              </button>

              <span className="main__qty" aria-label={`Quantity ${item.qty}`}>
                {item.qty}
              </span>

              <button
                className="main__btn"
                type="button"
                onClick={() => handleInc(item.id)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Stage 2/3: this becomes "search API preload" + "add manual item" */}
      <div className="main__footer-actions">
        <button className="main__cta" type="button">
          Add Item (modal later)
        </button>
      </div>
    </section>
  );
}

export default Main;
