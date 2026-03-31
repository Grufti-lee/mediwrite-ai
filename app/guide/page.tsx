"use client";
import React, { useState, useEffect } from 'react';
import { Settings2, Save, FileEdit, CheckCircle } from 'lucide-react';

const DEFAULT_LOGIC = `1. 제목에 메인 키워드 반드시 1회 포함.
2. 메인 키워드가 서론과 결론에 각각 1번씩 언급되도록 함.
3. 본문에 메인 키워드를 5~7번 정도 자연스럽게 녹여냄.
4. 메인/서브 키워드 외 다른 단어가 20번 이상 반복되지 않게 유의어 사용.
5. 말투는 짧고 쉬운 문장으로 친근하게 설명.
6. 공백 제외 1800자~2000자 분량으로 작성.
7. 읽는 사람의 이익에 집중하고 마지막에 행동 유도(CTA) 삽입.`;

export default function GuidePage() {
  const [seoLogic, setSeoLogic] = useState(DEFAULT_LOGIC);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempLogic, setTempLogic] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('custom_seo_logic');
    if (saved) setSeoLogic(saved);
  }, []);

  const handleEdit = () => {
    setTempLogic(seoLogic);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setSeoLogic(tempLogic);
    localStorage.setItem('custom_seo_logic', tempLogic);
    setIsModalOpen(false);
    alert("로직이 수정되었습니다. 다음 글 생성부터 반영됩니다.");
  };

  return (
    <div className="p-12 max-w-4xl mx-auto font-sans">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight text-gray-800 uppercase">SEO Logic Guide</h1>
          <p className="text-gray-400 font-medium">AI가 글을 쓸 때 지켜야 할 상위노출 규칙입니다.</p>
        </div>
        <button 
          onClick={handleEdit}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-sm text-blue-600 hover:shadow-md transition"
        >
          <FileEdit size={16}/> 로직 수정하기
        </button>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5"><Settings2 size={120}/></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8 text-blue-600 font-black text-xs uppercase tracking-[0.3em]">
            <CheckCircle size={14}/> Active System Prompt
          </div>
          <div className="whitespace-pre-wrap text-gray-700 text-lg leading-relaxed font-medium">
            {seoLogic}
          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[60] p-6">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl animate-in slide-in-from-bottom-8 duration-300 overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-2xl font-black tracking-tight">로직 편집기</h3>
              <Settings2 size={24} className="text-blue-500 animate-spin-slow"/>
            </div>
            <div className="p-10">
              <textarea 
                value={tempLogic}
                onChange={(e) => setTempLogic(e.target.value)}
                className="w-full h-80 p-6 bg-gray-50 border-none rounded-3xl outline-none focus:ring-2 focus:ring-blue-100 font-mono text-sm leading-relaxed"
              />
            </div>
            <div className="p-10 bg-gray-50 flex gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-400">취소</button>
              <button onClick={handleSave} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition flex items-center justify-center gap-2">
                <Save size={20}/> 수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
