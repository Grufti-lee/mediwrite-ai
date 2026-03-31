"use client";
import React, { useState } from 'react';
import { Sparkles, Send, Copy, CheckCircle2, Loader2 } from 'lucide-react';

export default function WritePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    projectName: '', mainKeyword: '', subKeyword: '', extractKeywords: '', topic: '', caution: ''
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">AI 글 생성</h1>
        <p className="text-gray-500 font-medium">프로젝트별 맞춤형 AI 학습을 통해 최적화된 블로그 글을 생성합니다.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">프로젝트명 (병원명)</label>
            <input type="text" placeholder="예: 서울맑은안과" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" onChange={(e) => setFormData({...formData, projectName: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">메인 키워드</label>
            <input type="text" placeholder="예: 스마일라식 비용" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" onChange={(e) => setFormData({...formData, mainKeyword: e.target.value})} />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">블로그 주제 및 상세 내용</label>
          <textarea placeholder="환자들이 가장 궁금해하는 스마일라식의 장점과 회복 기간에 대해 상세히 적어줘." className="w-full h-32 p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none resize-none" onChange={(e) => setFormData({...formData, topic: e.target.value})} />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:bg-blue-300"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          AI 맞춤형 글 생성 시작하기
        </button>
      </div>

      {result && (
        <div className="mt-12 p-10 bg-white rounded-2xl border border-gray-100 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h2 className="text-2xl font-bold mb-6 text-blue-600">작성 완료 (프로젝트: {formData.projectName})</h2>
           <div className="prose prose-slate max-w-none text-lg leading-relaxed whitespace-pre-wrap text-gray-700">
             {result.content}
           </div>
        </div>
      )}
    </div>
  );
}
