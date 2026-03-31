import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { projectName, mainKeyword, subKeyword, topic, caution, customSeo } = await req.json();

    const systemPrompt = `
      너는 '${projectName}' 병원의 전담 브랜드 마케팅 디렉터다. 
      아래의 [SEO 글쓰기 규칙]을 엄격히 준수하여 네이버 블로그 포스팅을 작성하라.

      [SEO 글쓰기 규칙]
      ${customSeo || "1. 제목에 메인 키워드 포함. 2. 본문 키워드 5~7회 노출. 3. 1800자 이상 작성."}

      [미션 정보]
      - 메인 키워드: ${mainKeyword}
      - 서브 키워드: ${subKeyword}
      - 주제: ${topic}
      - 유의사항: ${caution}

      [의료법 준수]
      - 과장 표현 금지. 마지막에 부작용 관련 주의 문구 포함.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: topic }],
      temperature: 0.7,
    });

    return NextResponse.json({ content: response.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
