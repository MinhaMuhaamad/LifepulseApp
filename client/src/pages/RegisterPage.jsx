import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axiosInstance';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      return setError('Passwords do not match.');
    }
    if (form.password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      login(data.token, data.user);
      navigate('/survey');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Organic/flowing pattern for register — distinct from login */}
      <css-doodle aria-hidden="true">{`
        :doodle {
          @grid: 10 / 100vw 100vh;
        }
        background: hsl(@r(300, 360), @r(40, 70)%, @r(8, 22)%);
        transform: scale(@r(0.5, 1.8));
        border-radius: @r(40%, 50%);
        margin: @r(2px, 8px);
        opacity: @r(0.05, 0.35);
        animation: organicflow @r(4s, 10s) @r(0s, 8s) infinite alternate ease-in-out;
        @keyframes organicflow {
          0%   { transform: scale(@r(0.4,1.2)) translate(@r(-6px,6px), @r(-6px,6px)); border-radius: @r(30%,60%); }
          100% { transform: scale(@r(0.8,1.6)) translate(@r(-8px,8px), @r(-8px,8px)); border-radius: @r(40%,70%); }
        }
      `}</css-doodle>

      <div className="auth-card">
        <div className="auth-logo">
          <h1>LifePulse</h1>
          <p>Create your account</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              required
              autoComplete="name"
            />
          </div>
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
              placeholder="Min. 8 characters"
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              id="confirm"
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repeat password"
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
