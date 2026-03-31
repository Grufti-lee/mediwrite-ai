import { LayoutDashboard, PenLine, BookOpen, Folders, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 font-bold text-xl mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white italic">M</div>
          MediWrite Pro
        </div>
        
        <nav className="space-y-2">
          <MenuLink href="/" icon={<LayoutDashboard size={18}/>} label="대시보드" />
          <MenuLink href="/write" icon={<PenLine size={18}/>} label="AI 글 생성" />
          <MenuLink href="/guide" icon={<BookOpen size={18}/>} label="작성 가이드" />
          <MenuLink href="/projects" icon={<Folders size={18}/>} label="프로젝트 관리" />
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition px-2">
          <LogOut size={18} /> 로그아웃
        </button>
      </div>
    </aside>
  );
}

function MenuLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition">
      {icon} {label}
    </Link>
  );
}
