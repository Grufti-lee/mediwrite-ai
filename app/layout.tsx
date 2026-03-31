import './globals.css'; // 이 줄이 디자인을 연결합니다.

export const metadata = {
  title: 'MediWrite AI Pro',
  description: 'AI 기반 병원 마케팅 솔루션',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-[#FBFBFB]">{children}</body>
    </html>
  );
}
