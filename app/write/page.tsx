"use client";
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, ChevronDown, CheckCircle, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>(""); // 결과 글 저장
  const [formData, setFormData] = useState({
    hospitalName: '', mainKeyword: '', subKeyword: '', topic: '', caution: ''
  });
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('medi_hospitals') || '[]');
    setHospitals(saved);
    if (saved.length > 0) setFormData(prev => ({ ...prev, hospitalName: saved[0].name }));
  }, []);

  const handleGenerate = async () => {
    if (!formData.hospitalName) return alert("병원을 먼저 등록해 주세요.");
    if (!formData.mainKeyword || !formData.topic) return alert("키워드와 주제를 입력해 주세요.");

    setLoading(true);
    setResult(""); // 이전 결과 초기화
    
    // 작성 가이드에서 수정한 SEO 로직 가져오기
    const customSeo = localStorage.getItem('custom_seo_logic') || "";

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectName: formData.hospitalName, // API와 이름 맞춤
          mainKeyword: formData.mainKeyword,
          subKeyword: formData.subKeyword,
          topic: formData.topic,
          caution: formData.caution,
          customSeo: customSeo
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setResult(data.content); // 화면에 글 표시

      // [프로젝트 관리] 리스트에 저장
      const newPost = {
        id: Date.now(),
        hospital: formData.hospitalName,
        title: formData.mainKeyword + " 관련 최적화 포스팅",
        content: data.content,
        keyword: formData.mainKeyword,
        date: new Date().toLocaleDateString(),
        author: "마케팅 담당자"
      };
      const existingPosts = JSON.parse(localStorage.getItem('medi_posts') || '[]');
      localStorage.setItem('medi_posts', JSON.stringify([newPost, ...existingPosts]));

      alert("포스팅이 생성되었습니다! 하단에서 확인하거나 프로젝트 관리 메뉴에서 볼 수 있습니다.");
    } catch (e: any) {
      alert("글 생성 중 오류가 발생했습니다: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-4xl mx-auto font-sans pb-40">
      <header className="mb-10">
        <h1 className="text-3xl font-black mb-2 tracking-tight">AI 글 생성</h1>
        <p className="text-gray-400 font-medium">선택한 병원의 톤앤매너와 SEO 로직을 반영하여 글을 생성합니다.</p>
      </header>

      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8 mb-12">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">병원 선택</label>
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
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">메인 키워드</label>
            <input type="text" placeholder="핵심 키워드" className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-100 transition" onChange={(e)=>setFormData({...formData, mainKeyword: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">서브 키워드</label>
            <input type="text" placeholder="연관 키워드" className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-100 transition" onChange={(e)=>setFormData({...formData, subKeyword: e.target.value})} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">블로그 주제</label>
          <textarea placeholder="정보성/후기성 등 주제를 입력하세요." className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl font-medium outline-none focus:ring-2 focus:ring-blue-100 resize-none" onChange={(e)=>setFormData({...formData, topic: e.target.value})} />
        </div>

        <button 
          onClick={handleGenerate} 
          disabled={loading} 
          className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 shadow-2xl shadow-blue-100 flex items-center justify-center gap-3 transition disabled:bg-blue-300"
        >
          {loading ? <Loader2 className="animate-spin"/> : <Sparkles size={24}/>}
          {loading ? "AI가 글을 작성하는 중..." : "포스팅 생성하기"}
        </button>
      </div>

      {/* 결과물 노출 영역 */}
      {result && (
        <div className="bg-white p-12 rounded-[40px] border border-blue-100 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-50">
            <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
              <CheckCircle size={18}/> Generation Success
            </div>
            <button 
              onClick={() => { navigator.clipboard.writeText(result); alert('복사되었습니다!'); }}
              className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition"
            >
              <Copy size={16}/> 복사하기
            </button>
          </div>
          <h2 className="text-3xl font-black mb-8 leading-tight">{formData.mainKeyword} 최적화 포스팅</h2>
          <div className="prose prose-slate max-w-none text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-medium">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
