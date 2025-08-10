import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    sku: "",
    image_url: "",
    description: "",
    quantity: 0,
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      const res = await api.post("/products", {
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });
      setAlert({ type: "success", text: "Product added." });
      setTimeout(() => navigate("/products"), 700);
    } catch (err) {
      setAlert({
        type: "danger",
        text: "Add product failed: " + (err?.message || err?.response?.data || ""),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-sm rounded">
          <div className="card-body p-4">
            <h4 className="card-title mb-4 text-center fw-bold">Add Product</h4>
            {alert && <div className={`alert alert-${alert.type} mt-2`}>{alert.text}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-control"
                  placeholder="Product name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Type</label>
                <input
                  required
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="form-control"
                  placeholder="Product type"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">SKU</label>
                <input
                  required
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  className="form-control"
                  placeholder="SKU"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Image URL</label>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="form-control"
                  placeholder="Image URL (optional)"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Quantity</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  className="form-control"
                  placeholder="Quantity in stock"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Price</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="form-control"
                  placeholder="Price (₹)"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="form-control"
                  rows="3"
                  placeholder="Product description"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button disabled={loading} className="btn btn-success fw-semibold px-4">
                  {loading ? "Saving..." : "Add Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary fw-semibold px-4"
                  onClick={() => navigate("/products")}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
