import { Info, CheckCircle, AlertTriangle } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="p-12 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">작성 가이드</h1>
        <p className="text-gray-500 font-medium">네이버 상위 노출과 의료법 준수를 위한 AI 로직 가이드입니다.</p>
      </header>

      <div className="space-y-8">
        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h3 className="flex items-center gap-2 text-blue-700 font-bold mb-4 text-lg">
            <CheckCircle size={20} /> 네이버 상위노출 SEO 로직
          </h3>
          <ul className="space-y-3 text-blue-900/70 text-sm leading-relaxed">
            <li>• <b>키워드 반복:</b> 메인 키워드는 서론(1회), 결론(1회), 본문(5~7회)만 배치합니다.</li>
            <li>• <b>형태소 다양성:</b> 동일 단어의 20회 이상 중복을 방지하여 품질 지수를 높입니다.</li>
            <li>• <b>분량 최적화:</b> 공백 제외 1850자~2000자 분량을 생성하여 전문성을 확보합니다.</li>
          </ul>
        </section>

        <section className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
          <h3 className="flex items-center gap-2 text-amber-700 font-bold mb-4 text-lg">
            <AlertTriangle size={20} /> 의료법 준수 가이드라인
          </h3>
          <p className="text-amber-900/70 text-sm leading-relaxed">
            AI는 '최고', '완치', '부작용 없음' 등 단정적인 과장 표현을 자동으로 필터링합니다. 
            모든 글 하단에는 "개인에 따라 결과가 다를 수 있으며..."라는 면책 문구가 자동으로 포함됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
