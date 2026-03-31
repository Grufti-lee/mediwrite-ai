"use client";
import React, { useState, useEffect } from 'react';
import { X, Copy, Calendar, User, Tag } from 'lucide-react';

export default function ProjectsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState<any>(null); // 모달에 보여줄 데이터

  useEffect(() => {
    // 저장된 글 불러오기
    const savedPosts = JSON.parse(localStorage.getItem('medi_posts') || '[]');
    setPosts(savedPosts);
  }, []);

  return (
    <div className="p-12 max-w-6xl mx-auto">
      <header className="mb-10 text-left">
        <h1 className="text-3xl font-bold mb-2">프로젝트 관리</h1>
        <p className="text-gray-500">생성된 모든 글의 히스토리입니다. 리스트를 클릭하여 본문을 확인하세요.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">병원명</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">키워드 / 제목</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">작성일</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">담당자</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length > 0 ? posts.map((p: any) => (
              <tr key={p.id} onClick={() => setSelectedPost(p)} className="hover:bg-blue-50/50 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-bold text-gray-700">{p.hospital}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">{p.title}</div>
                  <div className="text-xs text-blue-500 font-bold">#{p.keyword}</div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">{p.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">{p.author}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="p-20 text-center text-gray-300 font-medium">아직 생성된 글이 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- 모달창 (선택된 글 상세 보기) --- */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* 모달 헤더 */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase">
                  <Tag size={12}/> {selectedPost.hospital}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold bg-gray-200 text-gray-500 px-3 py-1 rounded-full uppercase">
                  <Calendar size={12}/> {selectedPost.date}
                </div>
              </div>
              <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20}/></button>
            </div>

            {/* 모달 본문 (스크롤 가능) */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              <h2 className="text-3xl font-extrabold mb-8 text-gray-900 leading-tight">{selectedPost.title}</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
              </div>
            </div>

            {/* 모달 하단 버튼 */}
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => { navigator.clipboard.writeText(selectedPost.content); alert('복사되었습니다!'); }}
                className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <Copy size={18}/> 본문 내용 복사하기
              </button>
              <button onClick={() => setSelectedPost(null)} className="px-8 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition">닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
