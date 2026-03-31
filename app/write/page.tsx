"use client";
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, ChevronDown } from 'lucide-react';

export default function WritePage() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '', mainKeyword: '', subKeyword: '', topic: '', caution: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('medi_hospitals') || '[]');
    setHospitals(saved);
    if (saved.length > 0) setFormData(prev => ({ ...prev, hospitalName: saved[0].name }));
  }, []);

  return (
    <div className="p-12 max-w-4xl mx-auto font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-black mb-2 tracking-tight text-gray-800">AI 글 생성</h1>
        <p className="text-gray-400 font-medium">등록된 병원을 선택하고 상위노출 키워드를 입력하세요.</p>
      </header>

      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
        {/* 병원 선택 셀렉트 박스 */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">병원 선택</label>
          <div className="relative">
            <select 
              value={formData.hospitalName}
              onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-blue-100 transition"
            >
              {hospitals.length > 0 ? (
                hospitals.map(h => <option key={h.id} value={h.name}>{h.name}</option>)
              ) : (
                <option value="">병원을 먼저 등록해 주세요</option>
              )}
            </select>
            <ChevronDown className="absolute right-5 top-5 text-gray-400 pointer-events-none" size={20}/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InputGroup label="메인 키워드" placeholder="핵심 키워드" onChange={(v)=>setFormData({...formData, mainKeyword: v})}/>
          <InputGroup label="서브 키워드" placeholder="연관 키워드" onChange={(v)=>setFormData({...formData, subKeyword: v})}/>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">블로그 주제</label>
          <textarea 
            placeholder="예: 무릎 통증 예방을 위한 운동과 주의사항"
            className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl font-medium outline-none focus:ring-2 focus:ring-blue-100 resize-none"
            onChange={(e) => setFormData({...formData, topic: e.target.value})}
          />
        </div>

        <InputGroup label="유의사항" placeholder="의료법 관련 피해야 할 표현 등" onChange={(v)=>setFormData({...formData, caution: v})}/>

        <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 shadow-2xl shadow-blue-100 flex items-center justify-center gap-3 transition active:scale-[0.98]">
          <Sparkles size={24}/> 포스팅 생성하기
        </button>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
      <input 
        type="text" placeholder={placeholder} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-100 transition"
      />
    </div>
  );
}
