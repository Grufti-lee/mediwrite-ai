"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, projects: 0 });

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('medi_posts') || '[]');
    const hospitals = new Set(posts.map((p: any) => p.hospital));
    setStats({ total: posts.length, projects: hospitals.size });
  }, []);

  return (
    <div className="p-12 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">대시보드</h1>
        <p className="text-gray-500 font-medium font-sans">실시간 마케팅 콘텐츠 생성 현황입니다.</p>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <StatCard label="누적 생성 포스팅" value={`${stats.total}건`} change="최근 24시간 업데이트" />
        <StatCard label="활성 프로젝트" value={`${stats.projects}개`} change="병원 브랜드 개수" />
        <StatCard label="평균 글자수" value="1,950자" change="SEO 최적화 유지 중" />
      </div>
    </div>
  );
}

function StatCard({ label, value, change }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{label}</p>
      <p className="text-4xl font-black text-gray-800">{value}</p>
      <p className="text-xs text-blue-500 font-bold mt-4 bg-blue-50 inline-block px-2 py-1 rounded">{change}</p>
    </div>
  );
}
