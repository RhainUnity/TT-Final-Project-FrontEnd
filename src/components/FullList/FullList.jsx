// src/components/FullList/FullList.jsx

import { useMemo, useState } from "react";
import "./FullList.css";

const STORE_TABS = ["WinCo", "Safeway", "Albertson’s"];

const initialRows = [
  {
    id: 1,
    item: "Nissin Chow Mein",
    category: "Needed",
    price: 2.75,
  },
];

function FullList() {
  const [activeStore, setActiveStore] = useState("Safeway");
  const [rows, setRows] = useState(initialRows);

  // Stage 1 simple “editing row” UX for the screenshot vibe
  const [editingId, setEditingId] = useState(1);
  const editingRow = useMemo(
    () => rows.find((r) => r.id === editingId),
    [rows, editingId],
  );

  const handleChange = (id, patch) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const handleSave = () => {
    // Later: persist to backend / state store
    setEditingId(null);
  };

  const handleCancel = () => {
    // Later: revert changes (for now just stop editing)
    setEditingId(null);
  };

  return (
    <section className="full">
      <div className="full__tabs">
        {STORE_TABS.map((store) => (
          <button
            key={store}
            type="button"
            className={`full__tab ${activeStore === store ? "full__tab_active" : ""}`}
            onClick={() => setActiveStore(store)}
          >
            {store}
          </button>
        ))}
      </div>

      {/* Stage 2/3: this becomes "search API preload" + "add manual item" */}
      {/* <div className="main__footer-actions">
        <button className="main__cta" type="button">
          Add Item (modal later)
        </button>
      </div> */}

      <div className="fulllist__actions">
        <button className="fulllist__action-btn" type="button">
          Add Item
        </button>
      </div>

      <div className="full__panel">
        <div className="full__header-row">
          <div className="full__col full__col_item">Item</div>
          <div className="full__col full__col_category">Category</div>
          <div className="full__col full__col_price">Price</div>
          <div className="full__col full__col_action">Action</div>
        </div>

        <div className="full__body">
          {rows.map((row) => {
            const isEditing = row.id === editingId;

            return (
              <div key={row.id} className="full__row">
                <div className="full__cell full__col_item">
                  {isEditing ? (
                    <input
                      className="full__input"
                      value={row.item}
                      onChange={(e) =>
                        handleChange(row.id, { item: e.target.value })
                      }
                    />
                  ) : (
                    <span>{row.item}</span>
                  )}
                </div>

                <div className="full__cell full__col_category">
                  {isEditing ? (
                    <select
                      className="full__select"
                      value={row.category}
                      onChange={(e) =>
                        handleChange(row.id, { category: e.target.value })
                      }
                    >
                      <option value="Needed">Needed</option>
                      <option value="Optional">Optional</option>
                      <option value="Skip">Skip</option>
                    </select>
                  ) : (
                    <span>{row.category}</span>
                  )}
                </div>

                <div className="full__cell full__col_price">
                  {isEditing ? (
                    <input
                      className="full__input full__input_price"
                      type="number"
                      step="0.01"
                      value={row.price}
                      onChange={(e) =>
                        handleChange(row.id, { price: Number(e.target.value) })
                      }
                    />
                  ) : (
                    <span>${row.price.toFixed(2)}</span>
                  )}
                </div>

                <div className="full__cell full__col_action">
                  {isEditing ? (
                    <div className="full__actions">
                      <button
                        className="full__btn"
                        type="button"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="full__btn"
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="full__btn"
                      type="button"
                      onClick={() => setEditingId(row.id)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Spacer to mimic the big empty box area in the screenshot */}
        <div className="full__spacer" />
      </div>
    </section>
  );
}

export default FullList;
