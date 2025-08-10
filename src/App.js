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
  const { token, logout, user  } = useAuth();
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
              token ? (
                <div className="d-flex flex-column justify-content-center align-items-center text-center p-5 bg-light rounded shadow-sm" style={{ minHeight: '70vh' }}>
                  <h1 className="display-4 fw-bold mb-3 text-success">Welcome Back, {user?.username || "User"}!!</h1>
                  <p className="lead mb-4 text-secondary" style={{ maxWidth: '600px' }}>
                    Manage your inventory efficiently. Access your products and stay organized.
                  </p>
                  <div>
                    <Link to="/products" className="btn btn-success btn-lg shadow-sm">
                      View Products
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center text-center p-5 bg-light rounded shadow-sm" style={{ minHeight: '70vh' }}>
                  <h1 className="display-4 fw-bold mb-3 text-success">Welcome to Inventory Management System</h1>
                  <p className="lead mb-4 text-secondary" style={{ maxWidth: '600px' }}>
                    Simplify your inventory tracking and control. Manage your products efficiently with real-time updates and seamless operations.
                  </p>
                  <div>
                    <Link to="/register" className="btn btn-success btn-lg me-3 shadow-sm">
                      Get Started
                    </Link>
                    <Link to="/login" className="btn btn-outline-success btn-lg shadow-sm">
                      Login
                    </Link>
                  </div>
                </div>
              )
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
