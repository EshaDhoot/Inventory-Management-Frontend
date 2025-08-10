import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", form);
      const token = res?.data?.access_token || res?.data?.token || res?.data;
      if (!token) throw new Error("No token in response");
      login(token);
      toast.success("Logged in successfully!");
    } catch (err) {
      const txt = err?.response?.data?.message || err?.response?.data?.Message || err.message;
      toast.error("Login failed: " + txt);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-12">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h4 className="card-title mb-4 text-center fw-bold">Login</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="form-control form-control-lg"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="btn btn-success w-100 btn-lg"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
            <hr />
            <p className="text-center mb-0">
              New?{" "}
              <Link to="/register" className="text-decoration-none fw-semibold text-success">
                Register an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
