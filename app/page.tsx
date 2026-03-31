export default function Dashboard() {
  const stats = [
    { label: '누적 생성 포스팅', value: '128건', change: '+12건' },
    { label: '평균 글자수', value: '1,920자', change: '최적화 완료' },
    { label: '활성 프로젝트', value: '8개 병원', change: '관리 중' },
  ];

  return (
    <div className="p-12 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">대시보드</h1>
        <p className="text-gray-500 font-medium">현재 진행 중인 병원 마케팅 현황을 한눈에 확인하세요.</p>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-400 mb-2 uppercase">{s.label}</p>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-xs text-blue-600 font-bold mt-2">{s.change}</p>
          </div>
        ))}
      </div>

      <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6">최근 프로젝트 활동</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b text-sm">
            <span className="font-bold">서울밝은안과</span>
            <span className="text-gray-500">임플란트 수술 전 주의사항...</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-400">2024.05.20</span>
          </div>
          {/* 추가 리스트 아이템... */}
        </div>
      </section>
    </div>
  );
}
