import React from "react";

export default function ProductTable({ products = [], onOpenQuantity }) {
  if (!products.length)
    return <div className="alert alert-info">No products found.</div>;

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover mb-0 align-middle">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th style={{ minWidth: 130 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id || p.id || p._id}>
              <td style={{ width: 80 }}>
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                ) : (
                  <div
                    className="bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{ width: 64, height: 64, borderRadius: 6 }}
                  >
                    No
                  </div>
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.type}</td>
              <td>{p.sku}</td>
              <td
                style={{
                  maxWidth: 240,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={p.description}
              >
                {p.description}
              </td>
              <td>{p.quantity}</td>
              <td>₹{p.price}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => onOpenQuantity(p)}
                >
                  Update Qty
                </button>
                {/* Add edit/delete buttons here if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
