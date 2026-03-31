"use client";

import React, { useState } from 'react';
import { Sparkles, Plus, Copy, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function MediWritePro() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '', mainKeyword: '', subKeyword: '', extractKeywords: '', topic: '', caution: '', hospitalTone: '따뜻하고 친절한 스타일'
  });

  const getCharCount = (text: string) => text ? text.replace(/\s/g, '').length : 0;

  const handleGenerate = async () => {
    setLoading(true);
    setIsModalOpen(false);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("글 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#37352F] selection:bg-blue-100">
      {/* Header */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white italic">M</div>
            MediWrite AI <span className="text-blue-600 font-normal ml-1">PRO</span>
          </div>
          {result && (
            <button onClick={() => window.print()} className="text-sm font-medium text-gray-500 hover:text-black transition">PDF 저장</button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-16 px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 animate-pulse">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-lg font-medium text-gray-500">병원 톤앤매너를 학습하여 글을 작성 중입니다...</p>
          </div>
        ) : result ? (
          <div className="space-y-12 animate-in fade-in duration-700">
            {/* Result Header */}
            <div className="border-b border-gray-100 pb-8">
              <div className="flex items-center gap-2 text-blue-600 text-sm font-bold mb-4">
                <CheckCircle2 size={16} /> 분석 및 작성 완료
              </div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">{result.title}</h1>
              <div className="flex gap-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
                <span>제목: {getCharCount(result.title)}자</span>
                <span>본문: {getCharCount(result.content)}자 (공백제외)</span>
              </div>
            </div>

            {/* Generated Image */}
            {result.imageUrl && (
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img src={result.imageUrl} alt="AI Generated" className="w-full h-auto" />
                <div className="p-3 bg-gray-50 text-xs text-gray-400 italic text-center">DALL-E 3로 생성된 고유 이미지 (유사문서 방지)</div>
              </div>
            )}

            {/* Content Body */}
            <article className="prose prose-slate max-w-none">
              <div className="text-xl leading-[1.9] whitespace-pre-wrap text-gray-800">
                {result.content}
              </div>
            </article>

            {/* CTA & Actions */}
            <div className="pt-10 flex gap-4">
              <button 
                onClick={() => { navigator.clipboard.writeText(result.content); alert('복사되었습니다!'); }}
                className="flex-1 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition"
              >
                <Copy size={20} /> 전체 내용 복사하기
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-40">
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileText className="text-gray-300" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-400">새로운 포스팅을 작성해 보세요</h2>
            <p className="text-gray-400 mt-2">우측 하단의 + 버튼을 눌러 시작할 수 있습니다.</p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <Plus size={32} />
      </button>

      {/* Notion Style Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">새 포스팅 설정</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">✕</button>
            </div>
            <div className="p-8 space-y-5 overflow-y-auto max-h-[70vh]">
              <div className="space-y-4">
                <input 
                  type="text" placeholder="포스팅 제목 (선택사항)" 
                  className="w-full text-2xl font-bold outline-none placeholder:text-gray-200"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">메인 키워드</label>
                    <input type="text" className="w-full p-2 border-b border-gray-100 outline-none focus:border-blue-500" placeholder="예: 임플란트 통증" onChange={(e) => setFormData({...formData, mainKeyword: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">서브 키워드</label>
                    <input type="text" className="w-full p-2 border-b border-gray-100 outline-none focus:border-blue-500" placeholder="예: 무절개 시술" onChange={(e) => setFormData({...formData, subKeyword: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">추출/필수 키워드</label>
                  <input type="text" className="w-full p-2 border-b border-gray-100 outline-none focus:border-blue-500" placeholder="자연스럽게 녹여낼 단어들 (쉼표 구분)" onChange={(e) => setFormData({...formData, extractKeywords: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">블로그 주제 및 상세 내용</label>
                  <textarea className="w-full p-2 h-24 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-blue-100" placeholder="어떤 내용을 중점적으로 다룰까요?" onChange={(e) => setFormData({...formData, topic: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><AlertCircle size={10}/> 유의사항</label>
                  <input type="text" className="w-full p-2 border-b border-gray-100 outline-none focus:border-blue-500 text-sm" placeholder="예: 비수술적 요법 강조" onChange={(e) => setFormData({...formData, caution: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-50 flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition">취소</button>
              <button 
                onClick={handleGenerate}
                className="flex-[2] py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
              >
                <Sparkles size={18} /> AI 글 생성하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
