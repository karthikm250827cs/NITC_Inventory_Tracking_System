import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';

export default function AdminApprovals(){
  const [list,setList] = useState([]);
  useEffect(()=>{ API.get('/equipment/pending').then(r=>setList(r.data)).catch(()=>{}) },[]);
  const act = async (id, approve) => {
    await API.put(`/equipment/${id}/approve`, { approve });
    setList(list.filter(i=> i._id !== id));
  }
  return (
    <Layout>
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
      <div className="space-y-3">
        {list.map(item => (
          <div key={item._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-bold">{item.name} <span className="text-sm text-gray-400">({item.equipmentId})</span></div>
              <div className="text-sm text-gray-500">{item.type} • {item.lab}</div>
            </div>
            <div className="space-x-2">
              <button onClick={()=>act(item._id, true)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
              <button onClick={()=>act(item._id, false)} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
            </div>
          </div>
        ))}
        {list.length === 0 && <div className="text-gray-500">No pending approvals</div>}
      </div>
    </div>
    </Layout>
  );
}
