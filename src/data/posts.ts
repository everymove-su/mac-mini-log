export type CategoryKey = "it" | "finance" | "daily";

export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  category: CategoryKey;
  tags: string[];
  readTime: string;
  publishedAt: string;
}

export interface Post extends PostMeta {
  content: string;
}

export const CATEGORIES: Record<CategoryKey, { label: string; description: string }> = {
  it: {
    label: "IT",
    description: "맥 미니, 개발환경, 자동화, 툴 활용 등 IT 관련 내용",
  },
  finance: {
    label: "재테크",
    description: "데이터 기반 주식 인사이트, 자산 관리, 수익형 블로그 수익 관리",
  },
  daily: {
    label: "일상",
    description: "데이터 기반 피트니스·학습, 일상 속 기록과 라이프스타일",
  },
};

export const posts: Post[] = [
  {
    slug: "m4-mac-mini-review",
    title: "M4 맥미니 내돈내산 후기: AI 공부와 블로그 작업용 가성비 끝판왕일까? (장단점 정리)",
    summary:
      "항상 거대한 데스크탑만 쓰다가, 컴팩트하면서도 강력한 성능을 찾다 애플 M4 맥미니를 선택한 이유와 실제 사용감, AI 공부·블로그 작업 관점에서의 장단점을 정리했습니다.",
    category: "it",
    tags: ["맥 미니", "M4", "리뷰", "AI", "블로그"],
    readTime: "7분",
    publishedAt: "2025-02-01",
    content:
      "항상 거대한 데스크탑만 고집해 왔는데, 꽉 찬 책상 공간을 볼 때마다 답답함이 느껴지더라고요. 컴팩트하면서도 강력한 성능을 찾다 보니, 결국 애플의 가성비 끝판왕인 M4 맥미니를 선택하게 되었습니다. 윈도우 유저였던 제가 왜 맥OS로 넘어왔는지, 실제 사용감은 어떤지 솔직하게 공유해 볼게요.\n\n디자인과 스펙 관점에서 보면, 맥미니는 역대급 공간 활용성을 보여줍니다. 모든 데스크탑을 통틀어 이 정도 퍼포먼스를 내면서 책상을 넓게 쓸 수 있는 기기는 맥미니가 유일한 것 같습니다. 아이폰 유저라면 익숙한 부드러움도 그대로 이어집니다. 평소 아이폰 특유의 최적화와 부드러운 감도를 좋아해서 계속 사용해 왔는데, 맥미니 역시 기대를 저버리지 않네요. 끊김 없는 작업 환경이 정말 만족스럽습니다.\n\nAI 공부 및 작업 시 장점도 뚜렷합니다. 밤늦게 AI 모델을 돌리거나 공부할 때 팬 소음이 들리면 집중력이 깨지곤 하죠. M4 맥미니는 놀라울 정도로 정숙하고 발열 제어가 잘 되어 밤샘 작업도 쾌적합니다. 특히 수면 모드 전환이 빨라 언제든 다시 작업을 이어갈 수 있는 안정감이 훌륭합니다. 여기에 맥OS 특유의 렌더링 덕분에 텍스트 가독성이 뛰어나서, 장시간 블로그 글을 쓰거나 코드를 볼 때 눈의 피로도가 확실히 덜합니다. 아이폰, 아이패드에서 보던 자료를 에어드랍(AirDrop)이나 공통 클립보드로 즉시 가져올 수 있어 작업 효율도 2배는 빨라졌습니다.\n\n물론 아쉬운 점도 있습니다. 본체 외에 모니터, 키보드, 마우스를 별도로 구비해야 한다는 점은 초기 비용 면에서 고려해야 할 부분입니다. 또한 최신 모델답게 USB-C 타입 위주라 기존 USB-A 기기들을 연결하려면 변환 허브가 필수입니다. 저도 이번에 같이 허브를 구매했는데, 이 허브 리뷰는 조만간 따로 정리해 볼 예정입니다.\n\n정리하자면, 책상 공간을 미니멀하고 깔끔하게 유지하고 싶은 분, 맥 터미널 환경에서 AI 개발 및 공부에 몰입하고 싶은 분, 가성비 있게 맥 생태계에 입문하고 싶은 블로거에게 M4 맥미니는 최고의 선택지에 가깝습니다.",
  },
  {
    slug: "mac-mini-blog-setup",
    title: "맥 미니로 만드는 수익형 블로그 전체 세팅 가이드",
    summary:
      "맥 미니를 처음 세팅하는 단계부터 도메인 연결, Next.js 배포, 기본 SEO까지 한 번에 정리했습니다.",
    category: "it",
    tags: ["맥 미니", "개발환경", "Next.js", "블로그"],
    readTime: "10분",
    publishedAt: "2025-01-01",
    content:
      "이 글은 맥 미니를 기반으로 수익형 블로그를 구축하려는 분들을 위한 전체 로드맵입니다.\n\n1. 맥 미니 기본 세팅\n2. 개발환경 구성\n3. 도메인 연결과 배포\n4. 기본 SEO 체크리스트\n\n각 단계별로 필요한 설정과 체크 포인트를 정리해 두었습니다.",
  },
  {
    slug: "seo-basics-for-blog",
    title: "수익형 블로그를 위한 실전 SEO 기본기 7가지",
    summary:
      "검색 유입을 꾸준히 만드는 제목 짓기, 메타 설명, 내부 링크 구조를 실제 예시와 함께 설명합니다.",
    category: "daily",
    tags: ["SEO", "키워드", "메타태그"],
    readTime: "8분",
    publishedAt: "2025-01-05",
    content:
      "수익형 블로그에서 SEO는 선택이 아니라 필수입니다.\n\n이 글에서는 바로 적용할 수 있는 7가지 기본기를 다룹니다.",
  },
  {
    slug: "desk-setup-and-ai-tools",
    title: "M4 맥 미니 데스크테리어와 AI 생산성 도구 활용법",
    summary:
      "최적의 데스크 환경 구성과 ChatGPT, Cursor 등 AI 도구로 업무 생산성을 극대화하는 실전 설정을 공유합니다.",
    category: "it",
    tags: ["데스크테리어", "AI", "생산성", "맥 미니"],
    readTime: "8분",
    publishedAt: "2025-01-10",
    content:
      "맥 미니를 중심으로 데스크 환경을 꾸미고, AI 도구로 반복 작업을 줄이며 집중도를 높이는 방법을 정리했습니다.",
  },
  {
    slug: "blog-income-tracking",
    title: "수익형 블로그 애드센스·제휴 수익 관리와 기록 방법",
    summary:
      "애드센스, 쿠팡 파트너스, 아마존 어소시에이트 수익을 한눈에 관리하는 기록 템플릿을 소개합니다.",
    category: "finance",
    tags: ["재테크", "애드센스", "제휴마케팅"],
    readTime: "9분",
    publishedAt: "2025-01-15",
    content:
      "수익형 블로그의 수익은 들쭉날쭉하기 쉽습니다. 이 글에서는 수익을 어떻게 기록하고 관리하면 좋은지 다룹니다.",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: CategoryKey): Post[] {
  return posts.filter((post) => post.category === category);
}

