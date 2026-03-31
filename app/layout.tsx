// app/layout.tsx 수정
import './globals.css';
import Sidebar from '../components/Sidebar'; // @/ 대신 ../ 사용 (더 확실함)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex bg-[#FBFBFB] min-h-screen text-[#37352F]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
