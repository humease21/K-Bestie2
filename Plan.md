# 내친구 케이(K-Bestie) 랜딩 페이지 리뉴얼 디자인 명세서

**Version**: 1.0
**Date**: 2026-04-20
**Purpose**: 정식 웹페이지 오픈을 위한 전면 리디자인
**Target Audience**: 초등학교 자녀를 둔 부모 (30대~50대)
**Primary CTA**: 7월 베타 런칭 테스터 사전 모집

---

## 1. 디자인 시스템 (Design System)

### 1-1. 디자인 철학

이 사이트는 "프리미엄 양육 인사이트 서비스"의 첫인상을 결정하는 공간입니다. 방문자 대부분은 아이의 정서 변화에 불안을 느끼고 있는 부모이므로, 사이트가 주는 첫 감정은 "여기는 믿을 수 있겠다", "이건 나를 위한 서비스다"여야 합니다. 차갑고 기술적인 느낌이 아니라, 따뜻하면서도 전문적인 느낌, 즉 "좋은 소아과 원장님이 운영하는 프리미엄 클리닉"의 분위기를 디지털로 옮긴다고 생각하면 됩니다.

디자인 키워드는 다음 다섯 가지입니다: **Warm Premium**, **Trustworthy**, **Calm Confidence**, **Parent-first**, **Emotionally Safe**

### 1-2. 컬러 시스템

**Primary Color (브랜드 메인)**
- Deep Teal: `#1A6B5A` — 신뢰, 안정, 성장을 상징. CTA 버튼, 핵심 강조 요소에 사용
- Light Teal: `#2D9F8F` — Primary의 밝은 변형. 호버 상태, 보조 강조에 사용

**Secondary Color (따뜻한 보조)**
- Warm Coral: `#E8845A` — 감정, 따뜻함, 행동 유도. 배지, 알림, 보조 CTA에 사용
- Soft Peach: `#F5D0B9` — 아이 관련 섹션의 배경 액센트

**Neutral Palette**
- Charcoal: `#1E1E2D` — 본문 제목, 가장 강한 텍스트
- Dark Gray: `#3A3A4A` — 본문 텍스트
- Medium Gray: `#6B7280` — 보조 설명, 캡션
- Light Gray: `#F3F4F6` — 섹션 배경 교차
- Warm White: `#FAFAF8` — 기본 페이지 배경. 순백(#FFF)이 아니라 약간 따뜻한 톤
- Pure White: `#FFFFFF` — 카드 배경, 입력 필드

**Semantic Colors**
- Success Green: `#22C55E` — 긍정 지표, 완료 상태
- Warning Amber: `#F59E0B` — 주의 신호
- Info Blue: `#3B82F6` — 정보성 배지
- Error Red: `#EF4444` — 에러 상태 (최소 사용)

**그라데이션**
- Hero Gradient: `linear-gradient(135deg, #1A6B5A 0%, #2D9F8F 50%, #34B8A8 100%)` — 히어로 섹션 오버레이
- Card Glow: `linear-gradient(180deg, rgba(26,107,90,0.03) 0%, rgba(26,107,90,0.08) 100%)` — 카드 호버 시 미세한 빛
- Section Fade: `linear-gradient(180deg, #FAFAF8 0%, #F3F4F6 100%)` — 섹션 간 자연스러운 전환

### 1-3. 타이포그래피

**한글 기본 폰트**: Pretendard (웹폰트)
- 이유: 한글 가독성 최상, 다양한 웨이트 지원, 무료, Apple SF Pro와 유사한 현대적 느낌
- CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`
- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**영문/숫자 보조 폰트**: Inter 또는 Pretendard 그대로 사용

**타이포 스케일 (Desktop → Mobile)**

| 용도 | Desktop | Mobile | Weight | Line Height | Letter Spacing |
|------|---------|--------|--------|-------------|----------------|
| Hero Title | 56px | 36px | 700 (Bold) | 1.2 | -0.02em |
| Section Title (H2) | 40px | 28px | 700 (Bold) | 1.3 | -0.01em |
| Sub Title (H3) | 28px | 22px | 600 (SemiBold) | 1.4 | 0 |
| Card Title (H4) | 22px | 18px | 600 (SemiBold) | 1.4 | 0 |
| Body Large | 18px | 16px | 400 (Regular) | 1.7 | 0.01em |
| Body Regular | 16px | 15px | 400 (Regular) | 1.7 | 0.01em |
| Body Small | 14px | 13px | 400 (Regular) | 1.6 | 0.01em |
| Caption | 13px | 12px | 500 (Medium) | 1.5 | 0.02em |
| Button Large | 18px | 16px | 600 (SemiBold) | 1 | 0.02em |
| Button Regular | 16px | 15px | 600 (SemiBold) | 1 | 0.02em |
| Badge/Tag | 12px | 11px | 600 (SemiBold) | 1 | 0.04em |

### 1-4. 간격 시스템 (Spacing)

8px 기반 간격 체계를 사용합니다.

| Token | Value | 용도 |
|-------|-------|------|
| space-1 | 4px | 아이콘과 텍스트 사이 미세 간격 |
| space-2 | 8px | 인라인 요소 간격 |
| space-3 | 12px | 카드 내부 요소 간격 |
| space-4 | 16px | 카드 내부 패딩, 요소 그룹 간격 |
| space-5 | 24px | 콘텐츠 블록 간격 |
| space-6 | 32px | 서브섹션 간격 |
| space-8 | 48px | 섹션 내 주요 블록 간격 |
| space-10 | 64px | 섹션 패딩 (모바일) |
| space-12 | 80px | 섹션 패딩 (태블릿) |
| space-16 | 120px | 섹션 패딩 (데스크탑) |
| space-20 | 160px | 히어로 섹션 상하 패딩 |

### 1-5. 레이아웃 그리드

**Desktop (1280px+)**
- Max Content Width: 1200px
- Column: 12 컬럼
- Gutter: 32px
- Side Margin: auto (중앙 정렬)

**Tablet (768px ~ 1279px)**
- Max Content Width: 100%
- Side Padding: 40px
- Column: 8 컬럼 또는 유동

**Mobile (~ 767px)**
- Max Content Width: 100%
- Side Padding: 20px
- Column: 4 컬럼 또는 단일 컬럼

### 1-6. 그림자 시스템

| Token | Value | 용도 |
|-------|-------|------|
| shadow-sm | `0 1px 2px rgba(0,0,0,0.05)` | 미세한 분리감 |
| shadow-md | `0 4px 12px rgba(0,0,0,0.08)` | 카드 기본 상태 |
| shadow-lg | `0 8px 24px rgba(0,0,0,0.12)` | 카드 호버, 모달 |
| shadow-xl | `0 16px 48px rgba(0,0,0,0.15)` | 히어로 이미지, 주요 CTA 영역 |
| shadow-glow | `0 0 40px rgba(26,107,90,0.15)` | CTA 버튼 호버 시 브랜드 글로우 |
| shadow-inner | `inset 0 2px 4px rgba(0,0,0,0.05)` | 입력 필드 |

### 1-7. Border Radius

| Token | Value | 용도 |
|-------|-------|------|
| radius-sm | 6px | 배지, 태그 |
| radius-md | 12px | 입력 필드, 작은 카드 |
| radius-lg | 16px | 일반 카드 |
| radius-xl | 24px | 큰 카드, CTA 섹션 배경 |
| radius-2xl | 32px | 히어로 이미지 컨테이너 |
| radius-full | 9999px | 원형 아바타, 원형 버튼, 필(pill) 배지 |

### 1-8. 애니메이션 원칙

전체적으로 과하지 않고 자연스러운 움직임을 사용합니다. 부모 대상 서비스이므로 현란한 애니메이션은 피하고, 신뢰감을 주는 차분한 트랜지션을 적용합니다.

**Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (기본), `cubic-bezier(0, 0, 0.2, 1)` (진입)
**Duration**: 200ms (호버), 300ms (상태 변경), 500ms (스크롤 등장), 800ms (히어로 초기 로드)

**스크롤 등장 애니메이션 (Intersection Observer 기반)**
- 각 섹션의 주요 콘텐츠 블록은 뷰포트 진입 시 아래에서 위로 20px fade-in
- 스태거(stagger) 적용: 같은 섹션 내 카드가 여러 개면 100ms 간격으로 순차 등장
- 한 번만 실행 (once: true)

**호버 애니메이션**
- 카드: `transform: translateY(-4px)` + `shadow-lg` 전환
- 버튼: 배경색 변경 + 미세한 scale(1.02) + shadow-glow 추가
- 링크: 밑줄 애니메이션 (왼쪽에서 오른쪽으로 확장)

### 1-9. 아이콘 시스템

Lucide Icons (https://lucide.dev/) 사용을 권장합니다. 선 두께 1.5px, 크기는 용도에 따라 20px(인라인), 24px(버튼/리스트), 32px(피처 아이콘), 48px(섹션 아이콘)을 사용합니다. 아이콘 컬러는 텍스트 컬러를 따르되, 피처 아이콘은 Primary Color를 사용합니다.

---

## 2. 컴포넌트 라이브러리 (Component Specs)

### 2-1. 버튼

**Primary Button (CTA)**
```
배경: #1A6B5A
텍스트: #FFFFFF
패딩: 16px 32px (Large) / 12px 24px (Regular)
Border Radius: radius-full (pill shape)
Font: Button Large / Button Regular
Shadow: shadow-md
Hover: 배경 #2D9F8F, shadow-glow 추가, translateY(-1px)
Active: 배경 #15574A, translateY(0)
Disabled: 배경 #D1D5DB, 텍스트 #9CA3AF, cursor not-allowed
Loading: 텍스트를 스피너로 교체, 배경 유지
```

**Secondary Button (보조 행동)**
```
배경: transparent
텍스트: #1A6B5A
Border: 1.5px solid #1A6B5A
패딩: Primary와 동일
Border Radius: radius-full
Hover: 배경 rgba(26,107,90,0.05), border 색상 #2D9F8F
```

**Ghost Button (최소 강조)**
```
배경: transparent
텍스트: #3A3A4A
패딩: 12px 16px
Hover: 배경 #F3F4F6
```

### 2-2. 카드

**Standard Card**
```
배경: #FFFFFF
Border: 1px solid rgba(0,0,0,0.06)
Border Radius: radius-lg (16px)
Padding: 32px (Desktop) / 24px (Mobile)
Shadow: shadow-md
Hover: shadow-lg, translateY(-4px), border-color rgba(26,107,90,0.15)
Transition: all 300ms ease
```

**Feature Card (아이콘 + 타이틀 + 설명)**
```
Standard Card 기본 + 상단에 48px 아이콘 영역
아이콘 배경: rgba(26,107,90,0.08) 원형(64px) 안에 아이콘 배치
아이콘 색상: #1A6B5A
```

**Image Card (이미지 + 텍스트)**
```
Standard Card 기본
이미지 영역: 카드 상단, border-radius 상단만 radius-lg
이미지 비율: 16:10 또는 4:3
이미지 위에 미세 오버레이: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.03) 100%)
```

### 2-3. 배지/태그

**Status Badge**
```
패딩: 4px 12px
Border Radius: radius-full
Font: Badge/Tag size
Background: 의미별 컬러의 10% opacity
Text: 의미별 컬러 원색
예: 베타 모집중 → 배경 rgba(232,132,90,0.1), 텍스트 #E8845A
예: LIVE → 배경 rgba(34,197,94,0.1), 텍스트 #22C55E
```

**Number Badge**
```
원형, 28px x 28px
배경: #1A6B5A
텍스트: #FFFFFF, 14px, Bold
```

### 2-4. 섹션 헤더 패턴

모든 섹션 헤더는 동일한 패턴을 따릅니다:
```
[상단 배지 - 선택사항] "WHY" 또는 "HOW IT WORKS" 등 영문 대문자 태그
[메인 타이틀] H2, Charcoal, 최대 2줄
[서브 설명] Body Large, Medium Gray, 최대 3줄, 타이틀 아래 space-4(16px)
[구분선 - 선택사항] 40px 너비, 3px 높이, Primary Color, 타이틀 아래 space-5(24px)
```
정렬: 기본 center 정렬. 좌우 분할 레이아웃에서는 left 정렬

### 2-5. 네비게이션 바

```
위치: fixed top, z-index 1000
높이: 72px (Desktop) / 60px (Mobile)
배경: rgba(250,250,248,0.85) + backdrop-filter: blur(20px) + saturate(180%)
하단 border: 1px solid rgba(0,0,0,0.06) — 스크롤 50px 이상일 때만 표시
최대 너비: 1200px, 중앙 정렬
```

**구성 요소 (왼쪽 → 오른쪽)**
- 로고 (현재 이미지 그대로 사용, 높이 36px)
- 네비게이션 링크 (Desktop만): 부모 고민 | 작동 방식 | 리포트 | 안전과 신뢰 | FAQ
  - 링크 스타일: Body Regular, Dark Gray, hover 시 Primary Color + 밑줄 애니메이션
  - 현재 섹션 하이라이트: Primary Color + font-weight 600
- CTA 버튼: "베타 신청하기" Primary Button (Regular 사이즈)

**모바일 네비게이션**
- 로고 (왼쪽) + 햄버거 메뉴 아이콘 (오른쪽, 24px)
- 햄버거 클릭 시 풀스크린 오버레이 메뉴
  - 배경: Warm White, opacity 진입 애니메이션 300ms
  - 링크 리스트: 세로 중앙 정렬, H3 사이즈, 각 항목 간격 space-6(32px)
  - 하단에 Primary CTA 버튼 풀너비
  - 닫기 버튼: 우상단 X 아이콘

---

## 3. 페이지 섹션 구조 및 상세 명세

전체 페이지는 다음 13개 섹션으로 구성됩니다.

```
[Navigation Bar - Fixed]
[S1] Hero Section
[S2] Social Proof Strip
[S3] Problem Section — "부모님, 이런 고민을 하고 계시지는 않나요?"
[S4] Gap Section — "왜 기존 방식만으로는 부족할까요?"
[S5] Philosophy Quote
[S6] How It Works — "내친구 케이는 이렇게 작동합니다"
[S7] Before & After — "함께하는 긍정적인 변화"
[S8] Report Preview — "부모님의 판단을 돕는 정교한 리포트"
[S9] Child Experience — "아이에게는 다정한 친구가 생깁니다"
[S10] Trust & Safety — "안전과 신뢰를 최우선으로 합니다"
[S11] CTA Section — 베타 신청
[S12] FAQ Section
[S13] Footer
```

---

### S1. Hero Section

**목적**: 3초 안에 "이 서비스가 나를 위한 것"이라는 확신과 감정적 공명을 만들고, 즉시 행동(베타 신청)으로 연결

**레이아웃**: 좌우 분할 (6:6 그리드). 왼쪽 텍스트, 오른쪽 이미지

**배경**: Warm White (`#FAFAF8`) 위에 우상단으로 매우 미세한 원형 그라데이션 블러 (`radial-gradient(ellipse at 80% 20%, rgba(26,107,90,0.04) 0%, transparent 60%)`)

**패딩**: 상단 160px (nav 높이 + 여유분), 하단 120px

**왼쪽 영역 (텍스트)**

```
[배지] "✨ 7월 베타 런칭 | 테스터 사전 모집"
  - Status Badge 스타일 (Warm Coral 계열)
  - margin-bottom: space-5 (24px)

[메인 타이틀]
  "아이가
   "그냥 괜찮아"라고만
   말할 때가 있나요?"
  - Hero Title (56px/36px)
  - Color: Charcoal (#1E1E2D)
  - "그냥 괜찮아" 부분을 Primary Color(#1A6B5A)로 강조
  - 따옴표는 Light Teal(#2D9F8F)으로 살짝 다른 톤
  - margin-bottom: space-5 (24px)

[서브 카피]
  "학교 이야기나 친구 이야기를 회피하는 아이의 짧은 대답 뒤에 있는
   변화를 더 잘 이해하도록 돕는 정서 인사이트 서비스입니다."
  - Body Large (18px/16px)
  - Color: Medium Gray (#6B7280)
  - max-width: 480px
  - margin-bottom: space-8 (48px)

[CTA 버튼 그룹]
  - Primary Button (Large): "무료 베타 신청하기 →"
    - 화살표는 hover 시 오른쪽으로 4px 이동하는 마이크로 애니메이션
  - 버튼 아래 캡션: "선착순 100가정 · 7월 시작 · 완전 무료"
    - Caption size, Medium Gray
    - margin-top: space-3 (12px)
```

**오른쪽 영역 (이미지)**

```
현재 Hero Slide 1 이미지를 사용
컨테이너:
  - border-radius: radius-2xl (32px)
  - shadow-xl
  - overflow: hidden
  - 이미지 위에 미세한 그라데이션 오버레이 (하단 5%만, 배경과 자연스럽게 연결)
  - 이미지는 object-fit: cover
  - 비율: 약 4:5 또는 3:4 (세로가 살짝 긴 형태)
  
배경 장식:
  - 이미지 뒤에 Primary Color의 5% opacity 원형 블롭 (이미지보다 20% 크게, -20px offset)
  - 이건 순수 장식이므로 z-index를 이미지 뒤로
```

**모바일 레이아웃**
- 단일 컬럼으로 전환
- 순서: 배지 → 타이틀 → 서브카피 → CTA → 이미지 (이미지가 아래로)
- 이미지 너비: 100%, border-radius: radius-xl (24px)
- 이미지 높이: 300px, object-fit: cover
- 전체 패딩: 상단 100px, 하단 64px

**애니메이션 (초기 로드)**
- 텍스트 영역: opacity 0 → 1, translateY(30px → 0), 800ms, delay 200ms
- 이미지: opacity 0 → 1, translateX(30px → 0), 800ms, delay 400ms
- CTA 버튼: opacity 0 → 1, translateY(10px → 0), 500ms, delay 800ms

---

### S2. Social Proof Strip

**목적**: 히어로 직후에 가벼운 신뢰 지표를 보여주어 스크롤 지속 동기를 부여

**레이아웃**: 전체 너비 가로 밴드, 중앙 정렬된 3~4개 항목이 가로로 나열

**배경**: `#F3F4F6` (Light Gray)

**패딩**: 상하 32px

**콘텐츠** (가로 나열, 항목 간 구분선 `|` 또는 세로 1px 라인)
```
"사전 신청 가정 87+" | "부모 만족도 예상 4.8/5.0" | "하루 5분, 주 2회 미션" | "7월 베타 오픈"
```
각 항목:
- 숫자/핵심어: Sub Title weight(600), Charcoal
- 설명: Caption, Medium Gray
- 가로 정렬, 항목 간 간격 space-8(48px)

**참고**: 실제 데이터가 아직 없다면, "사전 신청 접수 중", "하루 5분 미션", "7월 베타 오픈 예정" 등 사실 기반 문구로 대체 가능. 숫자를 넣을 수 없는 항목은 아이콘 + 텍스트 형태로

**모바일**: 2x2 그리드 또는 가로 스크롤

---

### S3. Problem Section — "부모님, 이런 고민을 하고 계시지는 않나요?"

**목적**: 부모의 실제 고민을 정확히 짚어서 "이 서비스가 내 상황을 이해하고 있다"는 공감을 극대화

**배경**: Warm White (`#FAFAF8`)

**패딩**: 상하 120px (Desktop) / 64px (Mobile)

**섹션 헤더**
```
[배지] "PARENTS' CONCERNS" — 영문 대문자, Caption 사이즈, Primary Color
[타이틀] "부모님, 이런 고민을\n하고 계시지는 않나요?"
  - H2 (40px/28px), Charcoal
[서브] "초등학교 3~4학년 시기, 아이의 마음이 조금씩 닫히기 시작합니다."
  - Body Large, Medium Gray
정렬: center
```

**카드 그리드**: 2x2 (Desktop), 단일 컬럼 (Mobile)
- 각 카드: Image Card 타입
- 카드 간격: space-6 (32px)
- 카드 최대 너비: 각 560px

**카드 4개 콘텐츠** (현재 이미지 그대로 사용)

카드 1:
```
이미지: "신호는 있는데 확신이 없다" 이미지
타이틀: "신호는 있는데 확신이 없다"
설명: "아이의 표정이 어두워진 것 같은데, 정말 무슨 일이 있는 건지 아니면 사춘기 시작인지 헷갈려요."
이미지 높이: 200px, object-fit: cover
```

카드 2:
```
이미지: "검색만으로는 알 수 없다" 이미지
타이틀: "검색만으로는 알 수 없다"
설명: "맘카페나 블로그의 일반적인 정보는 우리 아이의 특수한 상황을 설명해주지 못해 답답합니다."
```

카드 3:
```
이미지: "다그치면 닫히고, 두면 놓칠까봐" 이미지
타이틀: "다그치면 닫히고, 두면 놓칠까 봐"
설명: "자세히 물어보면 짜증을 내고, 그냥 두자니 학교 폭력이나 따돌림 같은 큰 문제를 놓칠까 봐 불안해요."
```

카드 4:
```
이미지: "부부의 해석이 달라 대화가 엇갈림" 이미지
타이틀: "부부의 해석이 달라 대화가 엇갈림"
설명: "아이 상태를 두고 한 명은 '예민하다', 한 명은 '괜찮다'고 하며 부부 싸움으로 번지기도 합니다."
```

**카드 스타일 디테일**
- 이미지 영역: 카드 상단, 좌우 패딩 없음 (가장자리까지), 상단 border-radius만 적용
- 텍스트 영역: padding 24px
- 타이틀: Card Title (H4), Charcoal, margin-bottom 8px
- 설명: Body Regular, Dark Gray
- 카드 전체 hover 시: translateY(-4px), shadow-lg, 300ms

**스크롤 등장**: 각 카드가 뷰포트 진입 시 fade-in-up, 카드 간 100ms 스태거

---

### S4. Gap Section — "왜 기존 방식만으로는 부족할까요?"

**목적**: 기존 대안의 한계를 구조적으로 보여주어, 새로운 솔루션의 필요성을 논리적으로 납득시킴

**배경**: Light Gray (`#F3F4F6`)

**패딩**: 상하 120px / 64px

**섹션 헤더**
```
[배지] "WHY NOT ENOUGH"
[타이틀] "왜 기존 방식만으로는\n부족할까요?"
정렬: center
```

**레이아웃**: 3컬럼 (Desktop), 단일 컬럼 (Mobile)

**카드 3개** — Feature Card 타입 (아이콘 + 타이틀 + 설명)

카드 1:
```
아이콘: Lucide "layers" 또는 "slice" (단편적 정보 표현)
아이콘 배경: rgba(26,107,90,0.08) 원형
타이틀: "단편적인 정보"
설명: "맘카페나 담임 상담은 특정 시점의 정보만 제공합니다. 아이의 변화를 '선'으로 연결해 보기 어렵습니다."
```

카드 2:
```
아이콘: Lucide "eye-off" 또는 "heart-crack"
타이틀: "주관적 판단"
설명: "부모의 감이나 아이의 짧은 대답에만 의존하면 과잉 개입하거나 방치하게 될 위험이 있습니다."
```

카드 3:
```
아이콘: Lucide "puzzle" 또는 "help-circle"
타이틀: "맥락의 부재"
설명: "아이가 왜 그런 감정을 느꼈는지, 어떤 상황에서 그런 표현을 했는지에 대한 구조적 맥락이 없습니다."
```

**카드 하단에 비교 키워드 3개** (카드 영역 밖, 섹션 하단)
가로 나열, 중앙 정렬:
```
"연속적인 변화 추적" · "구조화된 데이터 인사이트" · "객관적인 개입 시점 판단"
```
각 키워드: Body Small, Primary Color, font-weight 600
키워드 앞에 작은 체크 아이콘 (Lucide "check-circle", 16px, Primary Color)

---

### S5. Philosophy Quote

**목적**: 서비스의 핵심 철학을 한 문장으로 각인. 감정적 전환점 역할

**배경**: Primary Color 그라데이션 (`Hero Gradient`) 또는 Deep Teal 단색

**패딩**: 상하 80px / 48px

**콘텐츠**
```
"내친구 케이는 아이를 진단하는 것이 아니라,
 부모가 아이를 더 잘 보게 해주는 렌즈입니다."
```

**스타일**
- 텍스트: Sub Title (28px/22px), White (#FFFFFF), font-weight 500
- 텍스트 정렬: center
- 최대 너비: 700px
- "렌즈" 또는 "더 잘 보게" 부분에 약간 다른 처리: font-style italic 또는 Soft Peach 색상
- 따옴표 장식: 큰 따옴표 아이콘을 텍스트 상단에 배치, opacity 0.3, 48px 크기
- 하단에 얇은 구분선: 40px 너비, 2px, White opacity 0.3

**모바일**: 동일 구조, 폰트 사이즈만 축소

---

### S6. How It Works — "내친구 케이는 이렇게 작동합니다"

**목적**: 서비스 작동 흐름을 3단계로 명확하게 전달. 추상적이지 않고 구체적으로

**배경**: Warm White (`#FAFAF8`)

**패딩**: 상하 120px / 64px

**섹션 헤더**
```
[배지] "HOW IT WORKS"
[타이틀] "내친구 케이는\n이렇게 작동합니다"
[서브] "아이와 부모 사이의 따뜻한 가교가 되어드릴게요."
정렬: center
```

**레이아웃**: 3컬럼 가로 나열 (Desktop), 세로 스택 (Mobile)
- 각 스텝 사이에 연결선 또는 화살표 장식 (Desktop만)
- 연결선: 점선(dashed), Primary Color 20% opacity, 수평

**스텝 카드 3개** — 각 카드는 이미지 상단 + 번호 + 타이틀 + 설명

스텝 1:
```
이미지: "아이의 일상 대화" 이미지 (현재 것 사용)
번호: Number Badge "01"
타이틀: "아이의 일상 대화"
설명: "아이는 AI 친구 케이와 하루 2개의 미션을 수행하며 자연스럽게 감정과 일상을 표현합니다."
```

스텝 2:
```
이미지: "데이터 구조화" 이미지
번호: "02"
타이틀: "데이터 구조화"
설명: "아이의 표현 패턴, 감정 흐름, 학교생활 신호를 AI가 부모가 이해하기 쉬운 구조로 정리합니다."
```

스텝 3:
```
이미지: "부모 인사이트 리포트" 이미지
번호: "03"
타이틀: "부모 인사이트 리포트"
설명: "부모는 대시보드를 통해 아이의 상태를 체계적으로 파악하고 적절한 대화 시점을 찾습니다."
```

**스텝 카드 스타일**
```
이미지: 카드 상단, 높이 220px, object-fit: cover, border-radius 상단 radius-lg
번호 배지: 이미지와 텍스트 영역 경계에 걸쳐 배치 (이미지 하단에서 반쯤 노출)
  - 위치: absolute, 이미지 영역 좌하단에서 24px 오른쪽, 50% 겹침
  - 크기: 48px x 48px 원형
  - 배경: Primary Color
  - 텍스트: White, 18px, Bold
  - Shadow: shadow-md
텍스트 영역: padding 24px 24px 32px
```

**모바일 레이아웃**
- 세로 스택, 각 카드 풀너비
- 카드 간 연결선: 세로 점선 (카드 좌측 중앙에 위치) 또는 생략
- 카드 간 간격: space-6 (32px)

---

### S7. Before & After — "함께하는 긍정적인 변화"

**목적**: 서비스 사용 전후 변화를 대비시켜 가치를 직관적으로 전달

**배경**: Light Gray (`#F3F4F6`)

**패딩**: 상하 120px / 64px

**섹션 헤더**
```
[배지] "TRANSFORMATION"
[타이틀] "함께하는 긍정적인 변화"
[서브] "막연한 걱정이 확신 있는 양육으로 바뀝니다."
정렬: center
```

**레이아웃**: 3개 행, 각 행은 Before(좌) → 화살표 → After(우)

**각 행 구조**
```
[Before Card]          [Arrow Icon]          [After Card]
회색 톤, 약간 어둡게      →                   밝은 톤, Primary 액센트
```

**Before Card 스타일**
```
배경: #FFFFFF
Border-left: 4px solid #D1D5DB (회색)
Padding: 20px 24px
Border Radius: radius-md
Shadow: shadow-sm
"Before" 태그: 상단 좌측, Caption, Medium Gray, font-weight 600
본문: Body Regular, Dark Gray
```

**After Card 스타일**
```
배경: #FFFFFF
Border-left: 4px solid #1A6B5A (Primary)
Padding: 20px 24px
Border Radius: radius-md
Shadow: shadow-md
"After" 태그: 상단 좌측, Caption, Primary Color, font-weight 600
본문: Body Regular, Charcoal, font-weight 500
```

**3개 행 콘텐츠**

행 1:
- Before: `"요즘 왜 이러지?"라는 막연한 걱정`
- After: `언제부터 반복됐는지 구조적으로 확인`

행 2:
- Before: `감정적으로 캐묻거나 참기만 함`
- After: `지켜볼지, 대화할지 객관적으로 판단`

행 3:
- Before: `하루하루 단편 정보만 쌓임`
- After: `일일/월간 흐름으로 변화 추적`

**화살표**: Lucide "arrow-right" (Desktop) / Lucide "arrow-down" (Mobile), 24px, Primary Color

**모바일**: 각 행이 세로 스택 (Before → 화살표 → After)

---

### S8. Report Preview — "부모님의 판단을 돕는 정교한 리포트"

**목적**: 실제 리포트 UI를 보여줌으로써 서비스의 구체적 가치를 체감하게 함. 이 섹션이 전환율에 가장 큰 영향을 줄 수 있음

**배경**: Warm White (`#FAFAF8`)

**패딩**: 상하 120px / 64px

**레이아웃**: 좌우 분할 (5:7). 왼쪽 텍스트, 오른쪽 리포트 UI 모형

**왼쪽 영역 (텍스트)**
```
[배지] "PARENT REPORT"
[타이틀] "부모님의 판단을 돕는\n정교한 리포트"
  - H2, left 정렬
[서브] "일일, 주간, 월간 리포트를 통해 아이의 마음 지도를 그려보세요.
       단순한 요약이 아니라, 부모가 어떤 행동을 취해야 할지
       객관적인 가이드를 제공합니다."
  - Body Large, Medium Gray

[기능 리스트] — 아이콘 + 텍스트, 세로 나열, 각 항목 간 space-3(12px)
  ✓ 감정 흐름 추적
  ✓ 학교생활 신호
  ✓ 친구관계 관련 표현
  ✓ 대화 참여도 분석
  ✓ 미션 완료율
  ✓ 데이터 충분도 표시
  
  각 항목: Lucide "check" 아이콘(16px, Primary Color) + Body Regular, Dark Gray
```

**오른쪽 영역 (리포트 UI 모형)**

이 영역은 실제 대시보드를 축약한 카드 UI로 구성합니다. 브라우저 프레임이나 폰 프레임 안에 넣으면 더 세련됩니다.

```
[리포트 카드 컨테이너]
  배경: #FFFFFF
  Border Radius: radius-xl (24px)
  Shadow: shadow-xl
  Padding: 32px
  최대 너비: 520px

  [상단 헤더]
    "오늘의 핵심 인사이트" — Card Title, Charcoal
    "LIVE" 배지 — Status Badge (Success Green 계열), 우측 정렬
    구분선: 1px, 하단, rgba(0,0,0,0.06)

  [지표 그리드] — 2x2 그리드, gap 16px
    각 지표 카드:
      배경: #F9FAFB
      Padding: 16px
      Border Radius: radius-md
      
    지표 1: 라벨 "감정 변화" / 값 "매우 긍정적" / 색상 dot: Success Green
    지표 2: 라벨 "친구 관계" / 값 "안정적임" / 색상 dot: Success Green
    지표 3: 라벨 "학교 스트레스" / 값 "약간 높음" / 색상 dot: Warning Amber
    지표 4: 라벨 "에너지 레벨" / 값 "매우 활발함" / 색상 dot: Info Blue
    
    라벨: Caption, Medium Gray
    값: Body Regular, font-weight 600, Charcoal
    색상 dot: 8px 원형, 라벨 왼쪽에 배치

  [대화 가이드 영역] — 지표 아래
    배경: rgba(26,107,90,0.04)
    Border: 1px solid rgba(26,107,90,0.1)
    Border Radius: radius-md
    Padding: 16px
    
    라벨: "대화 가이드" — Caption, Primary Color, 상단
    아이콘: Lucide "message-circle" (16px, Primary Color)
    본문: "서아야, 오늘 학교에서 어떤 일이 너를 가장 크게 웃게 했어?"
      - Body Regular, Dark Gray, font-style: italic
```

**리포트 카드 장식**
- 카드 뒤에 살짝 기울어진(rotate 3deg) 두 번째 카드 실루엣을 깔아서 "여러 페이지의 리포트" 느낌
- 두 번째 카드: 같은 크기, 배경 #F3F4F6, shadow-md, z-index -1, offset: 8px right, 12px down

**모바일**: 단일 컬럼, 텍스트 → 리포트 카드 순서, 리포트 카드 풀너비

---

### S9. Child Experience — "아이에게는 다정한 친구가 생깁니다"

**목적**: 아이 관점의 경험을 보여줌으로써 "우리 아이가 이걸 좋아할까?" 라는 부모의 걱정을 해소

**배경**: Soft Peach의 아주 연한 버전 (`rgba(245,208,185,0.15)`) 또는 Warm White + 우측에 Soft Peach 블롭 장식

**패딩**: 상하 120px / 64px

**섹션 헤더**
```
[배지] "CHILD EXPERIENCE"
[타이틀] "아이에게는 다정한\n친구가 생깁니다"
[서브] "아이는 케이와 친구처럼 편안하게 대화하며 정서적 유대를 쌓습니다.
       이 과정은 부모가 아이의 내면을 이해하는 가장 자연스러운 창구가 됩니다."
정렬: center
```

**레이아웃**: 이미지 갤러리 (좌) + 설명 카드 2개 (우)

**왼쪽: 이미지 영역**
```
현재 "Kid Experience 1", "Kid Experience 2" 이미지 2개를 겹쳐 배치
  - 이미지 1: 기본 위치, border-radius: radius-xl, shadow-lg
  - 이미지 2: 이미지 1 위에 우하단으로 offset (40px right, 40px down), 
              약간 작은 크기 (80%), border-radius: radius-xl, shadow-xl
              Border: 4px solid #FFFFFF (프레임 효과)
```

**오른쪽: 설명 카드 2개** — 세로 스택

카드 1:
```
아이콘: Lucide "clock" 또는 "zap" (24px, Warm Coral)
타이틀: "부담 없는 일일 미션"
설명: "하루 5분, 아이가 즐겁게 참여할 수 있는 2개의 미션으로 자연스러운 표현을 유도합니다."
```

카드 2:
```
아이콘: Lucide "heart" 또는 "smile" (24px, Warm Coral)
타이틀: "친구 같은 상호작용"
설명: "AI 친구 케이는 아이를 가르치려 하지 않습니다. 공감하고 들어주며 아이의 마음을 엽니다."
```

**설명 카드 스타일**
```
배경: #FFFFFF
Padding: 24px
Border Radius: radius-lg
Shadow: shadow-md
아이콘: 타이틀 왼쪽에 인라인 또는 타이틀 상단에 배치
타이틀: Card Title (H4), Charcoal
설명: Body Regular, Dark Gray
카드 간 간격: space-5 (24px)
```

**모바일**: 이미지가 상단(단일 이미지, 두 번째는 숨기거나 스택), 설명 카드가 하단

---

### S10. Trust & Safety — "안전과 신뢰를 최우선으로 합니다"

**목적**: 아동 데이터 관련 불안을 해소하고, 서비스의 책임감 있는 운영 원칙을 전달

**배경**: Warm White (`#FAFAF8`)

**패딩**: 상하 120px / 64px

**섹션 헤더**
```
[배지] "TRUST & SAFETY"
[타이틀] "안전과 신뢰를\n최우선으로 합니다"
[서브] "내친구 케이는 부모님의 가장 든든한 조력자가 되고자 합니다."
정렬: center
```

**레이아웃**: 3컬럼 Feature Card (Desktop), 단일 컬럼 (Mobile)

카드 1:
```
아이콘: Lucide "shield-check" (48px)
타이틀: "부모 동의 기반 사용"
설명: "모든 서비스 이용은 부모님의 명확한 동의 하에 이루어집니다."
```

카드 2:
```
아이콘: Lucide "heart-handshake" (48px)
타이틀: "진단이 아닌 이해의 도구"
설명: "부모가 아이를 더 잘 이해하도록 돕는 따뜻한 보조 도구입니다."
```

카드 3:
```
아이콘: Lucide "users" (48px)
타이틀: "전문가 상담 연계 지원"
설명: "민감한 신호가 있다면 전문가와 상의할 수 있도록 리포트를 제공합니다."
```

**카드 스타일**: Feature Card 기본. 아이콘 배경을 Primary 대신 Light Teal 계열 `rgba(45,159,143,0.08)`로 하여 이 섹션만의 차분한 느낌

**추가 요소 (선택사항)**: 카드 영역 아래에 한 줄 안내
```
"내친구 케이는 의료·심리 진단이나 전문가 판단을 대체하지 않으며,
 아이의 일상 대화에서 관찰된 경향을 정리해 드리는 참고 도구입니다."
- Body Small, Medium Gray, center 정렬, max-width 600px
- 상단에 Lucide "info" 아이콘 (14px)
```

---

### S11. CTA Section — 베타 신청

**목적**: 페이지의 최종 전환 포인트. 망설이는 방문자에게 마지막 확신을 주고 즉시 행동을 유도

**배경**: Primary Color 그라데이션 (Hero Gradient와 동일) 위에 미세한 패턴 또는 노이즈 텍스처

**패딩**: 상하 100px / 64px

**콘텐츠** — 중앙 정렬

```
[타이틀]
  "지금 베타 서비스 신청하고
   부모님만의 인사이트를
   미리 만나보세요"
  - H2 (40px/28px), White, center

[서브]
  "초등 자녀를 둔 부모님 100분을 선착순으로 모십니다.
   아이와의 대화가 다시 즐거워지는 경험을 가장 먼저 해보세요."
  - Body Large, White opacity 0.85, center
  - max-width: 560px
  - margin-top: space-4

[CTA 버튼]
  "무료 베타 신청하기"
  - 특별 버전: 배경 White, 텍스트 Primary Color (#1A6B5A)
  - Padding: 18px 40px
  - Border Radius: radius-full
  - Shadow: `0 4px 20px rgba(0,0,0,0.2)`
  - Font: Button Large, font-weight 700
  - Hover: 배경 #F3F4F6, shadow 강화, scale(1.03)
  - margin-top: space-8

[보조 문구]
  "7월 시작 · 3개월 완전 무료 · 언제든 해지 가능"
  - Caption, White opacity 0.6
  - margin-top: space-3
```

**장식**
- 배경 위에 매우 미세한 원형 빛 포인트 2~3개 (opacity 0.1 수준의 밝은 원)
- 좌상단과 우하단에 추상적 원형 블롭, Primary의 밝은 변형, opacity 0.15

---

### S12. FAQ Section

**목적**: 남은 의문점 해소. 전환 직전 이탈 방지

**배경**: Light Gray (`#F3F4F6`)

**패딩**: 상하 120px / 64px

**섹션 헤더**
```
[배지] "FAQ"
[타이틀] "자주 묻는 질문"
정렬: center
```

**레이아웃**: 아코디언 리스트, 중앙 정렬, max-width 720px

**아코디언 아이템 스타일**
```
배경: #FFFFFF
Border: 1px solid rgba(0,0,0,0.06)
Border Radius: radius-md
Padding: 20px 24px
margin-bottom: space-3 (12px)

[질문 행]
  텍스트: Body Large, font-weight 600, Charcoal
  우측: Lucide "chevron-down" 아이콘 (20px, Medium Gray)
  클릭 시: 아이콘 180도 회전 (300ms)

[답변 영역]
  max-height: 0 → auto 애니메이션 (300ms)
  Padding-top: space-4 (16px) — 열릴 때만
  텍스트: Body Regular, Dark Gray
  Border-top: 1px solid rgba(0,0,0,0.06) — 열릴 때만 표시
```

**FAQ 항목 3개** (현재 콘텐츠 유지)

Q1: "어떤 연령대의 아이에게 적합한가요?"
A1: "초등학교 전 학년(1~6학년) 자녀를 둔 가정을 위해 설계되었습니다."

Q2: "아이가 매일 꼭 길게 대화해야 하나요?"
A2: "아니요, 하루 5분 내외의 짧은 대화와 미션만으로도 충분한 인사이트를 얻을 수 있습니다."

Q3: "이 서비스가 상담이나 치료를 대신하나요?"
A3: "아니요, 내친구 케이는 부모의 이해를 돕는 '사전 판단 지원 도구'입니다. 전문적인 상담이나 치료가 필요한 경우에는 전문가 연계를 안내해 드립니다."

**추가 권장 FAQ 항목**

Q4: "아이의 대화 내용이 부모에게 그대로 전달되나요?"
A4: "아이의 대화 원문 전체가 전달되지 않습니다. AI가 감정 흐름과 변화 패턴을 요약하여 부모가 이해하기 쉬운 리포트 형태로 제공합니다."

Q5: "베타 기간 이후에는 어떻게 되나요?"
A5: "베타 기간(3개월)은 완전 무료이며, 이후 유료 전환 여부는 부모님이 자유롭게 결정하실 수 있습니다."

Q6: "개인정보는 안전하게 보호되나요?"
A6: "네, 모든 데이터는 암호화되어 저장되며, 부모님의 동의 없이 외부에 공유되지 않습니다. 서비스 해지 시 데이터 삭제를 요청하실 수 있습니다."

---

### S13. Footer

**배경**: Charcoal (`#1E1E2D`)

**패딩**: 상 64px, 하 32px

**레이아웃**: 3컬럼 (Desktop), 단일 컬럼 (Mobile)

**왼쪽 컬럼**
```
로고 (현재 이미지, 밝은 버전 또는 White 모드)
서비스 한 줄 소개: "아이 마음을 이해하는 부모 맞춤형 AI 육아 서비스"
  - Body Small, White opacity 0.6
```

**중앙 컬럼**
```
타이틀: "서비스" — Caption, White opacity 0.4, 대문자
링크 리스트:
  - 베타 신청
  - 자주 묻는 질문
  - 이용약관
  - 개인정보처리방침
  각 링크: Body Small, White opacity 0.7, hover 시 opacity 1
```

**우측 컬럼**
```
타이틀: "문의" — Caption, White opacity 0.4, 대문자
이메일: contact@k-bestie.com (또는 실제 이메일)
인스타그램 / 카카오톡 아이콘 (있다면)
```

**하단 구분선 + 저작권**
```
구분선: 1px, White opacity 0.1
"© 2026 이지웨이. All rights reserved."
  - Caption, White opacity 0.4
  - Padding-top: space-5 (24px)
```

---

## 4. Floating CTA (고정 CTA)

**목적**: 사용자가 페이지 어디에 있든 즉시 전환 가능하도록 CTA를 항상 접근 가능하게 유지

**데스크탑**
- 네비게이션 바 우측의 "베타 신청하기" 버튼이 이 역할을 수행 (별도 floating 불필요)

**모바일**
- 스크롤이 히어로 섹션을 지나면 (약 600px 이상) 하단에 고정 CTA 바가 나타남
```
위치: fixed bottom
높이: 72px
배경: White + shadow-xl (위로 그림자)
내부: CTA 버튼 풀너비 (좌우 패딩 20px)
버튼: "무료 베타 신청하기" — Primary Button, Large
진입 애니메이션: translateY(100%) → 0, 300ms
```
- S11 CTA 섹션이 뷰포트에 보이면 floating CTA는 사라짐 (중복 방지)

---

## 5. 반응형 브레이크포인트 요약

| 구간 | 너비 | 주요 변경 |
|------|------|----------|
| Desktop | 1280px+ | 12컬럼, max-width 1200px, 여유로운 여백 |
| Laptop | 1024px ~ 1279px | 그리드 유지, 여백 축소 |
| Tablet | 768px ~ 1023px | 2컬럼 → 일부 단일 컬럼, 패딩 축소 |
| Mobile | ~ 767px | 단일 컬럼, 모바일 네비게이션, 하단 고정 CTA |

---

## 6. 성능 및 접근성 가이드

### 6-1. 이미지 최적화
- 모든 이미지에 `loading="lazy"` 적용 (히어로 이미지 제외, 히어로는 즉시 로드)
- WebP 포맷 우선, fallback으로 JPEG
- 각 이미지에 적절한 `alt` 텍스트 (한글)
- 이미지 컨테이너에 미리 aspect-ratio 지정하여 CLS(Cumulative Layout Shift) 방지

### 6-2. 폰트 최적화
- Pretendard: `font-display: swap` 적용
- 초기 로드에 필요한 weight만 프리로드 (400, 600, 700)
- 나머지 weight는 비동기 로드

### 6-3. 접근성
- 모든 인터랙티브 요소에 `focus-visible` 스타일 적용 (Primary Color outline, 2px offset)
- 아코디언: `aria-expanded`, `aria-controls` 적용
- CTA 버튼: 명확한 `aria-label`
- 색상 대비: WCAG AA 기준 충족 확인 (특히 Primary Color 위의 White 텍스트)
- 스크롤 애니메이션: `prefers-reduced-motion` 미디어 쿼리 대응 (모션 감소 시 애니메이션 비활성화)

### 6-4. SEO 기본
- 페이지 타이틀: "내친구 케이 | 아이 마음을 이해하는 AI 양육 인사이트 서비스"
- Meta Description: "초등학생 자녀의 감정 변화와 친구관계 신호를 AI가 분석하여 부모에게 맞춤형 리포트를 제공합니다. 7월 베타 런칭, 지금 무료 신청하세요."
- OG Image: 히어로 섹션 캡처 또는 별도 제작
- 시맨틱 HTML: section, article, nav, main, footer 적절히 사용

---

## 7. 현재 사이트 대비 변경점 요약

| 항목 | 현재 | 리뉴얼 |
|------|------|--------|
| 네비게이션 | 없거나 미약 | Fixed 네비게이션 + 섹션 앵커 링크 + CTA 버튼 |
| CTA 위치 | 하단 1곳 | 히어로 + 네비게이션 + 중간 floating(모바일) + 최종 CTA 섹션 = 4곳 |
| Social Proof | 없음 | 히어로 직후 숫자 스트립 추가 |
| 타이포그래피 | 위계 불명확 | 8단계 타이포 스케일, 명확한 위계 |
| 컬러 | 구조 불명확 | 5계열 체계적 컬러 시스템 |
| 간격 | 불규칙 | 8px 기반 일관된 간격 시스템 |
| 카드 스타일 | 단순 | 호버 인터랙션, 그림자, 보더 체계화 |
| 리포트 미리보기 | 정적 텍스트 | UI 모형 카드 + 지표 그리드 + 대화 가이드 |
| 아이 경험 | 이미지 나열 | 이미지 오버랩 갤러리 + 설명 카드 |
| FAQ | 단순 텍스트 | 아코디언 인터랙션 + 항목 확장 |
| Footer | 없거나 최소 | 3컬럼 구조화된 Footer |
| 모바일 | 미확인 | 완전한 반응형 + 하단 고정 CTA |
| 애니메이션 | 없거나 미약 | 스크롤 등장 + 호버 + 마이크로 인터랙션 |
| 접근성 | 미확인 | WCAG AA 대응 |

---

## 8. 개발 전달 시 참고사항

이 명세서를 Antigravity 팀에 전달할 때 함께 제공해야 할 에셋 목록입니다.

**필수 에셋**
1. 현재 사이트의 모든 이미지 원본 파일 (히어로, 카드 4개, 작동 방식 3개, 아이 경험 2개)
2. 로고 파일 (SVG 우선, 없으면 고해상도 PNG) — 밝은 배경용 + 어두운 배경용
3. 이 디자인 명세서 (본 문서)

**선택 에셋 (있으면 좋은 것)**
4. 브랜드 가이드라인 (있다면)
5. OG Image용 별도 이미지
6. 파비콘 / 앱 아이콘

**개발 참고**
- CSS Framework: Tailwind CSS 권장 (이 명세서의 토큰을 tailwind.config.js에 매핑 가능)
- 애니메이션: Framer Motion (React) 또는 Intersection Observer + CSS Transition
- 아코디언: Headless UI 또는 Radix UI 컴포넌트 권장
- 아이콘: `lucide-react` 패키지

