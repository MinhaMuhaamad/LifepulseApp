import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axiosInstance';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.user);
      navigate('/survey');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Geometric/grid pattern for login — css-doodle decorative background */}
      <css-doodle aria-hidden="true">{`
        :doodle {
          @grid: 16 / 100vw 100vh;
        }
        background: hsl(@r(220, 270), @r(50, 80)%, @r(10, 25)%);
        transform: rotate(@r(0, 90)deg) scale(@r(0.6, 1.1));
        border-radius: @r(0, 4px);
        margin: 1px;
        opacity: @r(0.1, 0.5);
        animation: geopulse @r(3s, 8s) @r(0s, 6s) infinite alternate;
        @keyframes geopulse {
          to {
            transform: rotate(@r(0, 360)deg) scale(@r(0.4, 1.3));
            opacity: @r(0.05, 0.4);
          }
        }
      `}</css-doodle>

      <div className="auth-card">
        <div className="auth-logo">
          <h1>LifePulse</h1>
          <p>Discover your life dimensions</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}
