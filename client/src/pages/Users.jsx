import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

export default function Users(){
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'user', lab:'' });

  const load = async ()=> {
    const res = await API.get('/users');
    setUsers(res.data);
  };
  useEffect(()=>{ load(); }, []);

  const addUser = async e => {
    e.preventDefault();
    await API.post('/users', form);
    alert('User added');
    setForm({ name:'', email:'', password:'', role:'user', lab:'' });
    load();
  };

  const removeUser = async id => {
    if(!window.confirm('Delete this user?')) return;
    await API.delete(`/users/${id}`);
    load();
  };

  return (
    <Layout>
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      <form onSubmit={addUser} className="grid grid-cols-5 gap-2 mb-6">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="p-2 border rounded"/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="p-2 border rounded"/>
        <input placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} className="p-2 border rounded"/>
        <select value={form.role} onChange={e=>setForm({...form, role: e.target.value})} className="p-2 border rounded">
          <option value="user">User</option>
          <option value="lab-incharge">Lab-Incharge</option>
          <option value="admin">Admin</option>
        </select>
        <select value={form.lab} onChange={e=>setForm({...form, lab: e.target.value})} className="p-2 border rounded">
          <option value="CSED">CSED</option>
          <option value="ECED">ECED</option>
          <option value="EEE">EEE</option>
          <option value="CIVIL">CIVIL</option>

        </select>
        {/* <input placeholder="Lab (if incharge)" value={form.lab} onChange={e=>setForm({...form, lab: e.target.value})} className="p-2 border rounded"/> */}
        <button className="col-span-5 bg-indigo-600 text-white px-3 py-1 rounded">Add User</button>
      </form>

      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Lab</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u=>(
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.lab}</td>
              <td className="p-2 text-right">
                <button onClick={()=>removeUser(u._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
}
