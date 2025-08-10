import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

function App() {
  const { token, logout } = useAuth();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const closeNavbar = () => setNavbarOpen(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/" onClick={closeNavbar}>
            IMS
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={navbarOpen}
            aria-label="Toggle navigation"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link fw-semibold text-white"
                      to="/products"
                      onClick={closeNavbar}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light btn-sm ms-lg-3 mt-2 mt-lg-0 fw-semibold"
                      onClick={() => {
                        logout();
                        closeNavbar();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link fw-semibold text-white"
                      to="/login"
                      onClick={closeNavbar}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link fw-semibold text-white"
                      to="/register"
                      onClick={closeNavbar}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-5">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center p-5 bg-light rounded shadow-sm">
                <h2>Welcome to Inventory Management</h2>
                <p className="lead">Use the navigation above to login or register.</p>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="toast-green"
      />
    </>
  );
}

export default App;
