import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import QuantityModal from "../components/QuantityModal";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error("Failed to load products. " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleOpenQuantity(p) {
    setSelectedProduct(p);
  }

  async function handleQuantitySave(id, newQuantity) {
    try {
      await api.put(`/products/${id}/quantity`, { quantity: parseInt(newQuantity, 10) });
      toast.success("Quantity updated.");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update quantity: " + (err?.message || ""));
    } finally {
      setSelectedProduct(null);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h3 className="mb-0">Products</h3>
        <div>
          <Link to="/add-product" className="btn btn-success me-2 mb-2 mb-sm-0">
            Add Product
          </Link>
          <button className="btn btn-outline-secondary" onClick={fetchProducts}>
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status" aria-hidden="true"></div>
          <div className="mt-2">Loading products...</div>
        </div>
      ) : (
        <ProductTable products={products} onOpenQuantity={handleOpenQuantity} />
      )}

      {selectedProduct && (
        <QuantityModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleQuantitySave}
        />
      )}
    </div>
  );
}
