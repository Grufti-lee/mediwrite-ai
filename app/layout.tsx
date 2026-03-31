import './globals.css';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex bg-[#FBFBFB] min-h-screen text-[#37352F]">
        {/* 좌측 사이드바 */}
        <Sidebar />
        {/* 우측 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
