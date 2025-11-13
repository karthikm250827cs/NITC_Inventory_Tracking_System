import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

export default function EquipmentDetail(){
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [desc, setDesc] = useState('');
  useEffect(()=>{ API.get(`/equipment/${id}`).then(r=>setEquipment(r.data)).catch(()=>{}) },[id]);

  const raise = async e => {
    e.preventDefault();
    await API.post('/complaints', { equipmentId: equipment._id, description: desc });
    alert('Complaint raised!');
    setDesc('');
  }

  if(!equipment) return <div>Loading...</div>;
  return (
    <Layout>
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      <div className="flex gap-6">
        <div className="w-1/2">
          <div className="font-bold text-xl">{equipment.name}</div>
          <div className="text-sm text-gray-500">{equipment.type} • {equipment.model}</div>
          <div className="mt-2">Status: <span className="font-semibold">{equipment.status}</span></div>
          <div className="mt-4">
            <form onSubmit={raise}>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe the issue" className="w-full p-2 border rounded mb-2"></textarea>
              <button className="px-3 py-1 bg-red-600 text-white rounded">Raise Complaint</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
 //updated by raafia for testing
