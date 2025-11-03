import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './styles/index.css'
import './styles/main.css'
import App from './App'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminApprovals from './pages/AdminApprovals'
import AddEquipment from './pages/AddEquipment'
import EquipmentList from './pages/EquipmentList'
import EquipmentDetail from './pages/EquipmentDetail'
import Complaints from './pages/Complaints'
import Register from "./pages/Register";
import ReviewApprovals from "./pages/ReviewApprovals";
import Users from './pages/Users'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="approvals" element={<AdminApprovals />} />
          <Route path="/add" element={<AddEquipment />} />
          <Route path="equipment" element={<EquipmentList />} />
          <Route path="equipment/:id" element={<EquipmentDetail />} />
          <Route path="complaints" element={<Complaints/>} />
          <Route path="users" element={<Users />} />
           <Route path="/register" element={<Register />} />
          <Route path="/approvals" element={<ReviewApprovals />} />
          <Route path="/equipment" element={<EquipmentList />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
