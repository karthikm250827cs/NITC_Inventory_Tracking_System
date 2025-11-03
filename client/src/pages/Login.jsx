import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import '../styles/login.css'

export default function Login(){
  const [form,setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      nav('/dashboard')
    } catch(err){
      alert('Invalid credentials')
    } finally { setLoading(false) }
  }

  return (
    <div className="login-wrapper">
      <div className="glow-ball one"></div>
      <div className="glow-ball two"></div>

      <div className="login-container fade-in">
        <h1 className="title">NITC Inventory</h1>
        <p className="subtitle">Smart Inventory Management Portal</p>

        <form onSubmit={submit}>
          <input type="email" placeholder="Email address" value={form.email}
                 onChange={e=>setForm({...form,email:e.target.value})} required />
          <input type="password" placeholder="Password" value={form.password}
                 onChange={e=>setForm({...form,password:e.target.value})} required />

          <div className="btn-row">
            <button type="submit" className="btn btn-submit" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
            <button type="button" className="btn btn-cancel" onClick={()=>setForm({email:'',password:''})}>Clear</button>
          </div>
        </form>

        <footer className="footer">
          Don’t have an account? <span className="link-create" onClick={()=>nav('/register')}>Create Account</span>
        </footer>
      </div>
    </div>
  )
}
