import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductGrid({ products = [], onOpenQuantity }) {
  if (!products.length) {
    return <div className="alert alert-info">No products found.</div>;
  }

  return (
    <div className="row g-3">
      {products.map((p) => (
        <div key={p.product_id || p.id || p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm">
            {p.image_url ? (
              <img
                src={p.image_url}
                alt={p.name}
                className="card-img-top"
                style={{
                  height: "180px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="bg-secondary text-white d-flex align-items-center justify-content-center"
                style={{ height: "180px" }}
              >
                No Image
              </div>
            )}

            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-1">{p.name}</h5>
              <small className="text-muted">{p.type}</small>
              <p className="card-text text-truncate" title={p.description}>
                {p.description}
              </p>
              <div className="mt-auto">
                <p className="fw-bold mb-2">₹{p.price}</p>
                <p className="mb-2">Qty: {p.quantity}</p>
                <button
                  className="btn btn-success w-100"
                  onClick={() => onOpenQuantity(p)}
                >
                  Update Qty
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
