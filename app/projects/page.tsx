"use client";
import React, { useState, useEffect } from 'react';
import { X, Copy, Calendar, Tag, FileText } from 'lucide-react';

export default function ProjectsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('medi_posts') || '[]');
    setPosts(savedPosts);
  }, []);

  return (
    <div className="p-12 max-w-6xl mx-auto font-sans">
      <header className="mb-10 text-left">
        <h1 className="text-3xl font-black mb-2 tracking-tight">프로젝트 관리</h1>
        <p className="text-gray-400 font-medium">생성된 모든 포스팅의 히스토리입니다. 리스트를 클릭하면 본문을 확인할 수 있습니다.</p>
      </header>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="px-8 py-5">병원명</th>
              <th className="px-8 py-5">제목 / 키워드</th>
              <th className="px-8 py-5 text-center">작성일</th>
              <th className="px-8 py-5 text-center">담당자</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length > 0 ? posts.map((p: any) => (
              <tr key={p.id} onClick={() => setSelectedPost(p)} className="hover:bg-blue-50/30 transition-colors cursor-pointer group">
                <td className="px-8 py-6 font-bold text-blue-600">{p.hospital}</td>
                <td className="px-8 py-6">
                  <div className="font-bold text-gray-800 mb-1">{p.title}</div>
                  <div className="text-xs text-gray-400 font-medium">#{p.keyword}</div>
                </td>
                <td className="px-8 py-6 text-gray-400 text-sm text-center">{p.date}</td>
                <td className="px-8 py-6 text-sm font-bold text-gray-500 text-center">{p.author}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="p-24 text-center text-gray-300 font-bold">생성된 포스팅이 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- 포스팅 상세 보기 모달 --- */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50 px-10">
              <div className="flex gap-3">
                <span className="flex items-center gap-1.5 text-[10px] font-black bg-blue-600 text-white px-3 py-1.5 rounded-full uppercase tracking-widest"><Tag size={12}/> {selectedPost.hospital}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-black bg-white border border-gray-200 text-gray-400 px-3 py-1.5 rounded-full uppercase tracking-widest"><Calendar size={12}/> {selectedPost.date}</span>
              </div>
              <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 px-16 custom-scrollbar">
              <div className="flex items-center gap-2 mb-6 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
                <FileText size={16}/> Generated Post Content
              </div>
              <h2 className="text-4xl font-black mb-10 text-gray-900 leading-tight tracking-tight">{selectedPost.title}</h2>
              <div className="prose prose-slate max-w-none text-[19px] leading-[1.85] text-gray-700 whitespace-pre-wrap font-medium">
                {selectedPost.content}
              </div>
            </div>

            <div className="p-8 px-16 border-t border-gray-50 flex gap-4 bg-white">
              <button 
                onClick={() => { navigator.clipboard.writeText(selectedPost.content); alert('본문이 복사되었습니다!'); }}
                className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-2xl shadow-blue-100 transition flex items-center justify-center gap-3"
              >
                <Copy size={20}/> 본문 내용 복사하기
              </button>
              <button onClick={() => setSelectedPost(null)} className="px-10 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition">닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
