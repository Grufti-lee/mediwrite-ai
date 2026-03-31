import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { projectName, mainKeyword, subKeyword, extractKeywords, topic, caution } = await req.json();

  const systemPrompt = `
    너는 '${projectName}' 병원의 전담 브랜드 마케팅 디렉터다. 
    단순한 정보 전달을 넘어 '${projectName}'만의 브랜드 정체성과 신뢰도를 높이는 글을 작성해야 한다.

    [프로젝트 개별 학습 데이터]
    - 병원명: ${projectName}
    - 핵심 가치: 환자 중심, 정직한 진료, 과잉 진료 없는 ${projectName}
    - 문체: 해당 병원의 신뢰감을 높이는 따뜻하고 전문적인 톤앤매너 유지

    [네이버 SEO 및 구조 규칙]
    - 메인 키워드 '${mainKeyword}'를 서론 1회, 결론 1회, 본문 5~7회 자연스럽게 배치.
    - 공백 제외 1850자~2000자의 풍부한 분량.
    - 추출 키워드(${extractKeywords})를 문맥 속에 반드시 포함.
    - 의료법 준수 및 하단 주의 문구 필수 포함.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: topic }],
      temperature: 0.7,
    });

    return NextResponse.json({ 
      content: response.choices[0].message.content,
      stats: { projectName, keyword: mainKeyword, date: new Date().toISOString() }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
