"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Hospital, Calendar, Trash2, X } from 'lucide-react';

export default function HospitalManagement() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHospitalName, setNewHospitalName] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('medi_hospitals') || '[]');
    setHospitals(saved);
  }, []);

  const addHospital = () => {
    if (!newHospitalName) return;
    const updated = [{ id: Date.now(), name: newHospitalName, createdAt: new Date().toLocaleDateString() }, ...hospitals];
    setHospitals(updated);
    localStorage.setItem('medi_hospitals', JSON.stringify(updated));
    setNewHospitalName("");
    setIsModalOpen(false);
  };

  const deleteHospital = (id: number) => {
    const updated = hospitals.filter(h => h.id !== id);
    setHospitals(updated);
    localStorage.setItem('medi_hospitals', JSON.stringify(updated));
  };

  return (
    <div className="p-12 max-w-5xl mx-auto min-h-screen relative font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-black mb-2 tracking-tight">병원 관리</h1>
        <p className="text-gray-400 font-medium font-sans">글 생성을 위한 기본 병원 리스트를 관리합니다.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map(h => (
          <div key={h.id} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold italic">H</div>
              <div><p className="font-bold text-gray-800 leading-none mb-1">{h.name}</p><p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{h.createdAt}</p></div>
            </div>
            <button onClick={() => deleteHospital(h.id)} className="text-gray-200 group-hover:text-red-400 transition cursor-pointer p-2"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)} className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"><Plus size={32} /></button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[60] p-6">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl p-10 animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-600"><X size={20}/></button>
            <h3 className="text-2xl font-black mb-6 tracking-tight">병원 추가</h3>
            <input type="text" value={newHospitalName} onChange={(e) => setNewHospitalName(e.target.value)} placeholder="예: 연세정형외과" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 font-bold mb-6" />
            <button onClick={addHospital} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition">등록 완료</button>
          </div>
        </div>
      )}
    </div>
  );
}
