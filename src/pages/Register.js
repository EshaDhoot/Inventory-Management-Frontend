import React, { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/register", form);
      setMessage({ type: "success", text: "Registered successfully. Please login." });
      setForm({ username: "", password: "" });
    } catch (err) {
      const txt = err?.response?.data?.message || err?.response?.data || err.message;
      setMessage({ type: "danger", text: "Register failed: " + txt });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title mb-3">Register</h4>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input required value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input required value={form.password} onChange={e => setForm({...form, password: e.target.value})} type="password" className="form-control" />
              </div>
              <button disabled={loading} className="btn btn-primary w-100">{loading ? "Registering..." : "Register"}</button>
            </form>
            <hr />
            <div className="text-center">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
