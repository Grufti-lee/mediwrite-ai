export default function ProjectsPage() {
  const dummyProjects = [
    { id: 1, hospital: '서울밝은안과', title: '스마일라식 후기...', date: '2024.05.21', author: '관리자' },
    { id: 2, hospital: '연세정형외과', title: '무릎 통증 예방법', date: '2024.05.20', author: '팀장' },
  ];

  return (
    <div className="p-12 max-w-6xl mx-auto">
      <header className="mb-10 text-left">
        <h1 className="text-3xl font-bold mb-2">프로젝트 관리</h1>
        <p className="text-gray-500">병원별로 생성된 글의 히스토리를 확인하고 관리합니다.</p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">병원명</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">제목</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">작성일</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">담당자</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyProjects.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-bold text-blue-600">{p.hospital}</td>
                <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{p.title}</td>
                <td className="px-6 py-4 text-gray-400 text-sm">{p.date}</td>
                <td className="px-6 py-4 text-sm font-medium">{p.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
