import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";


function App() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">IMS</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              
                <>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                </>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<div className="text-center p-5 bg-light rounded"> <h2>Welcome to Inventory Management</h2><p>Use the nav to login or register.</p> </div>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
