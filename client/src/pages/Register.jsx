import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import '../styles/login.css'

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    department: '',
    lab: ''
  })
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/auth/register', form)
      alert('✅ Registered successfully! Please login.')
      nav('/')
    } catch (err) {
      console.error(err)
      alert('❌ Failed to register. Please check details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="glow-ball one"></div>
      <div className="glow-ball two"></div>

      <div className="login-container fade-in">
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Join the NITC Inventory Management Portal</p>

        <form onSubmit={submit}>
          <input
            placeholder="Full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* New Department field */}
          <input
            placeholder="Department"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
            required
          />

          {/* New Lab field */}
          <input
            placeholder="Lab "
            value={form.lab}
            onChange={e => setForm({ ...form, lab: e.target.value })}
            required
          />

          {/* <select
            className="role-select"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="lab-incharge">Lab In-Charge</option>
            <option value="admin">Admin</option>
          </select> */}

          <div className="btn-row">
            <button
              type="submit"
              className="btn btn-submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Register'}
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => nav('/')}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
