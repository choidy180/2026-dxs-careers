export type Job = {
  slug: string;
  team: string;
  teamEnglish: string;
  title: string;
  englishTitle: string;
  experience: string;
  employment: string;
  location: string;
  intro: string;
  mission: string;
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
  stack: string[];
};

// 화면 구성을 위한 예시 공고입니다. 실제 모집 내용은 이 파일에서 교체하세요.
export const jobs: Job[] = [
  {
    slug: "platform",
    team: "플랫폼팀",
    teamEnglish: "PLATFORM TEAM",
    title: "프론트엔드 개발자",
    englishTitle: "Frontend Developer",
    experience: "경력 1–3년",
    employment: "정규직",
    location: "경남 창원",
    intro:
      "복잡한 제조 데이터를 누구나 이해하고 사용할 수 있는 경험으로 만듭니다. 플랫폼팀은 현장과 사람을 연결하는 제조 운영 플랫폼을 개발합니다.",
    mission: "좋은 기술이 더 나은 현장 경험으로 이어지도록.",
    responsibilities: [
      "Next.js와 React를 활용해 제조 운영 플랫폼의 웹 화면을 개발합니다.",
      "설비 현황, 생산 데이터, 품질 정보를 보여주는 대시보드를 구현합니다.",
      "AI 챗봇과 문서 검색 서비스의 사용자 인터페이스를 개발합니다.",
      "디자이너, 백엔드 개발자와 협업하며 사용성과 성능을 개선합니다.",
    ],
    qualifications: [
      "프론트엔드 개발 실무 경험이 1년 이상 3년 이하이신 분",
      "React, TypeScript의 기본 개념을 이해하고 프로젝트에 적용해 보신 분",
      "REST API 연동 및 비동기 데이터 처리 경험이 있으신 분",
      "Git을 활용한 협업에 익숙하고, 동료와 의견을 명확하게 나눌 수 있는 분",
    ],
    preferred: [
      "Next.js App Router 및 styled-components 사용 경험이 있으신 분",
      "TanStack Query 또는 Zustand를 활용해 보신 분",
      "차트, 데이터 테이블 등 데이터를 다루는 UI를 구현해 보신 분",
      "반응형 웹, 웹 접근성, PWA에 관심이 있으신 분",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "styled-components",
      "TanStack Query",
    ],
  },
  {
    slug: "ai",
    team: "AI팀",
    teamEnglish: "AI TEAM",
    title: "AI 엔지니어",
    englishTitle: "AI Engineer",
    experience: "신입·경력",
    employment: "정규직",
    location: "경남 창원",
    intro:
      "데이터 속 가능성을 찾아 현장에서 작동하는 인공지능을 만듭니다. AI팀은 제조 데이터와 현장의 지식을 연결해 실질적인 문제를 해결합니다.",
    mission: "실험실의 가능성을, 현장의 변화로.",
    responsibilities: [
      "제조 문서와 현장 데이터를 활용하는 LLM 기반 서비스를 개발합니다.",
      "문서 검색 및 질의응답을 위한 RAG 파이프라인을 구현하고 개선합니다.",
      "이미지와 시계열 데이터를 분석해 품질 및 설비 이상을 탐지합니다.",
      "모델 성능을 평가하고 플랫폼팀과 협업해 서비스에 적용합니다.",
    ],
    qualifications: [
      "Python으로 데이터 처리 및 모델 개발이 가능하신 분",
      "머신러닝과 딥러닝의 기본 개념을 이해하시는 분",
      "PyTorch 등 딥러닝 프레임워크를 활용한 프로젝트 경험이 있으신 분",
      "새로운 기술을 빠르게 학습하고 문제 해결 과정을 공유할 수 있는 분",
    ],
    preferred: [
      "LLM, RAG, 벡터 데이터베이스를 활용한 프로젝트 경험이 있으신 분",
      "컴퓨터 비전 또는 시계열 데이터 분석 경험이 있으신 분",
      "API 개발이나 모델 서빙 경험이 있으신 분",
      "제조 현장의 문제를 기술로 해결하는 일에 관심이 있으신 분",
    ],
    stack: ["Python", "PyTorch", "LLM", "RAG", "Computer Vision"],
  },
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}
