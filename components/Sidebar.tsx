"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenLine, Hospital, Folders, BookOpen, UserCircle } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { href: '/', icon: <LayoutDashboard size={20}/>, label: '대시보드' },
    { href: '/write', icon: <PenLine size={20}/>, label: 'AI 글 생성' },
    { href: '/hospitals', icon: <Hospital size={20}/>, label: '병원 관리' },     // 병원 등록/삭제
   { href: '/projects', icon: <Folders size={20}/>, label: '프로젝트 관리' },   // 작성된 글 목록 & 모달
  { href: '/guide', icon: <BookOpen size={20}/>, label: '작성 가이드' },      // SEO 로직 수정
  ];

  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-screen sticky top-0 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 font-bold text-xl mb-10 px-2 tracking-tighter">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white italic text-base">M</div>
          MediWrite Pro
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-100 flex items-center gap-3 px-2">
        <UserCircle size={32} className="text-gray-300" />
        <div className="overflow-hidden">
          <p className="text-sm font-bold truncate">마케팅 담당자</p>
          <p className="text-xs text-gray-400 truncate">admin@hospital.com</p>
        </div>
      </div>
    </aside>
  );
}
