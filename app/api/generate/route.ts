import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { title, mainKeyword, subKeyword, extractKeywords, topic, caution, hospitalTone } = await req.json();

  const systemPrompt = `
    당신은 한국의 의료법을 완벽히 숙지한 10년 차 병원 전문 마케터이자 SEO 전문가입니다.
    네이버 블로그의 C-Rank 및 D.I.A 로직에 최적화된 글을 작성하세요.

    [톤앤매너 설정]
    - 선택된 병원 스타일: ${hospitalTone}
    - 말투: 짧고 쉬운 문장, 친근한 대화체(~해요, ~입니다). 독자의 이익(도움되는 정보)에 집중.

    [SEO 및 키워드 규칙]
    - 메인 키워드: '${mainKeyword}'
    - 서브 키워드: '${subKeyword}'
    - 추출 키워드: '${extractKeywords}' (본문에 자연스럽게 녹여낼 것)
    - 키워드 배치: 제목(1회), 서론(1회), 결론(1회), 본문(5~7회)만 자연스럽게 배치.
    - 반복 제한: 키워드 외 특정 단어/형태소가 20회 이상 반복되지 않도록 유의어 활용.

    [분량 및 구조]
    - 분량: 공백 제외 반드시 1800자 이상 2000자 이하로 매우 상세하게 작성. (중요: 내용이 부족하지 않게 사례와 정보를 풍부하게 넣을 것)
    - 구조: 제목 -> 서론(공감) -> 본론(핵심가치 3가지 이상) -> 결론(정리 및 이유) -> CTA(행동유도).
    - 본론에는 제목과 관련된 핵심 가치를 전달하는 데 집중하세요.

    [의료법 및 안전]
    - '최고', '완치', '부작용 없음' 등 단정적 표현 절대 금지.
    - 마지막에 "개인에 따라 결과가 다를 수 있으며 부작용이 있을 수 있으니 의료진과 상담하세요" 문구 포함.

    [이미지 가이드]
    - 본문 중간에 [IMAGE_PROMPT: 한글설명 | 영문 DALL-E 3 프롬프트] 형태로 2~3개 삽입. 영문 프롬프트는 실사 스타일(Photorealistic, 8k)이어야 함.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `주제: ${topic}\n유의사항: ${caution}` }
      ],
      temperature: 0.8,
    });

    const content = response.choices[0].message.content || "";
    
    // 이미지 생성 (첫 번째 프롬프트 추출 후 DALL-E 3 호출 - 간략화된 로직)
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: `High quality professional medical photo related to ${mainKeyword}, warm atmosphere, clean clinic, 8k resolution`,
      size: "1024x1024"
    });

    return NextResponse.json({ 
      title: title || "추천 제목: " + mainKeyword + "에 대해 꼭 알아야 할 점",
      content,
      imageUrl: image.data[0].url
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
