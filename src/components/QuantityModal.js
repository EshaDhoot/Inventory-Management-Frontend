import React, { useState } from "react";

export default function QuantityModal({ product, onSave, onClose }) {
  const [value, setValue] = useState(product.quantity || 0);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(product.product_id || product.id || product._id, parseInt(value, 10));
    } catch (e) {
      // onSave should handle error feedback
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay d-flex align-items-center justify-content-center">
      <div className="modal-dialog-custom card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0 fw-bold">Update Quantity - {product.name}</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
            disabled={saving}
          ></button>
        </div>

        <div className="mb-4">
          <label htmlFor="quantityInput" className="form-label fw-semibold">
            Quantity (absolute)
          </label>
          <input
            id="quantityInput"
            type="number"
            min="0"
            className="form-control form-control-lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={saving}
            autoFocus
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-outline-secondary me-3"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSave}
            disabled={saving || value < 0 || value === ""}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
