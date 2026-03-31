"use client";
import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '', mainKeyword: '', subKeyword: '', extractKeywords: '', topic: '', caution: ''
  });
  const router = useRouter();

  const handleGenerate = async () => {
    if (!formData.projectName || !formData.mainKeyword) {
      alert("프로젝트명과 메인 키워드는 필수입니다.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // [추가된 로직] 생성된 글을 로컬 저장소에 저장
      const newPost = {
        id: Date.now(),
        hospital: formData.projectName,
        title: formData.mainKeyword + " 관련 최적화 포스팅",
        content: data.content,
        keyword: formData.mainKeyword,
        date: new Date().toLocaleDateString(),
        author: "관리자"
      };

      const existingPosts = JSON.parse(localStorage.getItem('medi_posts') || '[]');
      localStorage.setItem('medi_posts', JSON.stringify([newPost, ...existingPosts]));

      alert("글이 성공적으로 생성되어 프로젝트 관리에 저장되었습니다!");
      router.push('/projects'); // 프로젝트 리스트 페이지로 이동
    } catch (error) {
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">AI 글 생성</h1>
        <p className="text-gray-500 font-medium">프로젝트별 맞춤형 AI 학습을 진행합니다.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">프로젝트명 (병원명)</label>
            <input type="text" placeholder="예: 서울밝은안과" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" onChange={(e) => setFormData({...formData, projectName: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400">메인 키워드</label>
            <input type="text" placeholder="예: 스마일라식 비용" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" onChange={(e) => setFormData({...formData, mainKeyword: e.target.value})} />
          </div>
        </div>
        <textarea placeholder="블로그 주제를 입력하세요..." className="w-full h-32 p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" onChange={(e) => setFormData({...formData, topic: e.target.value})} />
        <button onClick={handleGenerate} disabled={loading} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-blue-300">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          AI 글 생성 및 저장
        </button>
      </div>
    </div>
  );
}
