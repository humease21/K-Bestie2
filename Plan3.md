# 내친구 케이 — 웹사이트 개선 및 배포 가이드 v1.1

**작성일**: 2026-04-20
**대상**: Antigravity 개발팀
**범위**: 랜딩 페이지(v2) + 관리자 페이지 + GitHub Pages 배포

---

## Part A. 현재 상태 요약

**운영 중 사이트 (구버전)**
- URL: `www.k-bestie.com`
- 호스팅: GitHub Pages (기존 레포지토리)
- 특징: 아이 중심 톤("타이핑은 NO! 목소리로 통하는 우리 아이 첫 AI 단짝!"), 이모지 다수, 간결한 3섹션 구성
- 상태: **개편 대상 — v2로 전면 교체 예정**

**개발 중 사이트 (v2)**
- URL: `ai.k-bestie.com` (개발/스테이징)
- 스택: React + Vite + TypeScript
- 특징: 부모 중심 톤, 13개 섹션 랜딩 페이지 + 관리자 페이지, 베타 테스터 모집 CTA
- 이미지: `public/images/` 폴더에 **로컬 저장** (character_logo.png, Hero1~6.png, how1~3.png, feature1~3, problem1~4.png, kid1~2.png, logo1~2.png, potentials.jpg, child.png)
- 상태: **개선 후 새 레포지토리로 배포 예정**

---

## Part B. 배포 계획

### B-1. 새 GitHub 레포지토리 생성

기존 `www.k-bestie.com` 레포지토리는 아카이브 처리하고, v2 전용 새 레포지토리를 생성합니다.

- 레포지토리명 예시: `k-bestie-homepage-v2` 또는 `k-bestie.com`
- Visibility: Public (GitHub Pages 무료 사용 시) 또는 Private (Pro/Team 플랜 시)
- 기본 브랜치: `main` (소스 코드) / `gh-pages` (빌드 결과물, 자동 생성)

### B-2. GitHub Actions 자동 배포 설정

`.github/workflows/deploy.yml` 파일을 생성하여, `main` 브랜치에 push할 때마다 자동으로 빌드 → `gh-pages` 브랜치에 배포되도록 구성합니다.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build-and-deploy
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### B-3. 커스텀 도메인 연결

**프로젝트 내 설정**: `public/CNAME` 파일 생성

```
www.k-bestie.com
```

**DNS 설정 (도메인 관리 업체)**:

| 타입 | 호스트 | 값 | 비고 |
|------|--------|-----|------|
| CNAME | www | `{username}.github.io` | www 서브도메인 |
| A | @ | 185.199.108.153 | 루트 도메인 |
| A | @ | 185.199.109.153 | 루트 도메인 |
| A | @ | 185.199.110.153 | 루트 도메인 |
| A | @ | 185.199.111.153 | 루트 도메인 |

**GitHub 레포지토리 Settings → Pages**:
- Custom domain: `www.k-bestie.com`
- Enforce HTTPS: 체크 (Let's Encrypt 자동 발급)

### B-4. Vite 설정 확인

`vite.config.ts`에서 `base`가 `/`로 설정되어 있는지 확인합니다.

```typescript
export default defineConfig({
  base: '/',
  // ... 나머지 설정
})
```

### B-5. SPA 라우팅 처리

GitHub Pages는 정적 호스팅이므로, 새로고침 시 404가 발생할 수 있습니다. `public/404.html`을 `index.html`과 동일한 내용으로 생성하거나, 빌드 스크립트에 복사 명령을 추가합니다.

`package.json`의 build 스크립트 예시:

```json
"scripts": {
  "build": "vite build && cp dist/index.html dist/404.html"
}
```

### B-6. 전환 절차 (순서 중요)

1. 새 레포지토리 생성 및 v2 코드 push
2. GitHub Actions 배포 확인 (`{username}.github.io/{repo}` 에서 동작 테스트)
3. 기존 레포지토리의 GitHub Pages 설정에서 Custom domain 제거
4. 새 레포지토리의 GitHub Pages 설정에서 Custom domain에 `www.k-bestie.com` 입력
5. DNS 전파 대기 (최대 24시간, 보통 수 분 이내)
6. HTTPS 인증서 자동 발급 확인
7. `www.k-bestie.com` 접속 테스트
8. 기존 레포지토리 아카이브 처리

### B-7. ai.k-bestie.com 처리

배포 완료 후 `ai.k-bestie.com`은 아래 중 하나로 처리합니다:

- 개발/스테이징 전용으로 유지 (내부 접근만)
- `www.k-bestie.com`으로 301 리다이렉트 설정
- 도메인 해제

SEO 중복 방지를 위해 두 도메인이 동시에 같은 콘텐츠를 공개 서빙하지 않도록 주의합니다.

---

## Part C. 랜딩 페이지 개선 사항

### 🔴 높은 우선순위 (배포 전 필수)

**C-1. 개인정보처리방침 및 이용약관 페이지 추가**

베타 신청 시 개인정보(이름, 연락처, 이메일)를 수집하므로, 개인정보처리방침 및 서비스 이용약관 페이지가 반드시 필요합니다. 푸터에 링크를 배치하고, 신청 폼에 동의 체크박스를 추가합니다. AI 기본법 투명성 요건과도 직결됩니다.

**C-2. 모바일 반응형 최적화 검증**

타깃 사용자(30-50대 맞벌이 부모)는 높은 확률로 모바일 브라우저에서 접속합니다. 아래 항목을 실기기에서 테스트합니다:

- 레이아웃 깨짐 여부 (특히 Hero, 3-Step, Before/After 섹션)
- 이미지 크기 오버플로
- 터치 타깃 크기 (최소 44×44px)
- 폰트 가독성 (본문 최소 16px)
- CTA 버튼 접근성 (모바일 하단 고정 CTA 바 동작 확인)

**C-3. 베타 신청 폼 UX 점검**

- 최소 필드 구성: 이름, 연락처, 자녀 학년, 이메일
- 입력 유효성 검사 (전화번호 형식, 이메일 형식, 필수 항목 누락)
- 제출 후 확인 메시지 표시 + 확인 이메일 자동 발송
- 중복 신청 방지 로직
- 개인정보 동의 체크박스 (C-1과 연동)

### 🟡 중간 우선순위 (베타 런칭 전 개선 권장)

**C-4. 사회적 증거 강화**

현재 "87+ 가족 사전 등록" 수치가 표시되어 있어 좋은 시작이지만, 추가로 아래 요소를 보강하면 전환율이 크게 올라갑니다:

- 파일럿 참여 부모 한 줄 후기 (또는 예정 인용)
- 전문가(아동심리/교육) 추천 코멘트 또는 자문 사실
- 언론 보도, 수상 이력, 협력 기관 로고 등

**C-5. 리포트 미리보기 인터랙티브화**

현재 정적 이미지/텍스트로 표시되는 리포트 섹션을 탭 전환(일간/주간/월간)이 가능한 인터랙티브 목업으로 구현합니다. 클릭 시 감정 흐름 그래프가 변하거나, 주간 요약이 펼쳐지는 간단한 애니메이션이면 충분합니다.

**C-6. 아이 경험 데모 추가**

현재 이미지 2장만으로는 아이의 실제 사용 경험 전달이 부족합니다. 15-30초 짧은 데모 영상 또는 애니메이션 GIF로 아이-케이 대화 흐름을 보여주면 "우리 아이가 좋아할까?"라는 부모의 의문을 해소할 수 있습니다.

**C-7. 페이지 로딩 성능 최적화**

이미지가 다수 포함된 페이지이므로 아래 항목을 점검합니다:

- 이미지 압축 및 WebP 변환 (특히 Hero1~6.png 등 대형 이미지)
- lazy-loading 적용 (`loading="lazy"` 또는 Intersection Observer)
- 폰트 preload (Pretendard CDN)
- Critical CSS 인라이닝
- 목표: Lighthouse Performance 점수 90+, LCP 2.5초 이내

**C-8. NavBar 앵커 링크 + 스크롤 스파이**

긴 랜딩 페이지이므로 NavBar에 섹션 앵커 링크(서비스 소개 | 리포트 미리보기 | 안전정책 | FAQ | 신청하기)를 넣고, 스크롤 위치에 따라 활성 탭이 변하는 스크롤 스파이를 적용하면 탐색 편의성이 크게 올라갑니다.

**C-9. 가격 섹션 UI 보정**

Care Start / Care Insight 두 플랜이 표시되어 있으나, 아래 사항을 보강합니다:

- 카드 형태로 시각적 비교가 가능하도록 구성
- 각 플랜에 포함되는 기능 목록 간단히 병기
- 베타 기간 무료 강조 배지 추가
- "베타 이후에도 부담 없이 시작" 느낌의 톤

### 🟢 낮은 우선순위 (점진적 개선)

**C-10. 스크롤 인 애니메이션**

각 섹션 진입 시 fade-in / slide-up 애니메이션을 적용합니다. Intersection Observer 또는 Framer Motion 기반, opacity 0→1 + translateY 20px→0, duration 500ms, `prefers-reduced-motion` 미디어 쿼리 대응 포함.

**C-11. SEO 및 OG 메타태그 점검**

- `<title>`: "내친구 케이 | 아이 마음을 이해하는 AI 양육 인사이트 서비스"
- `<meta name="description">`: 핵심 가치 1-2문장
- `og:image`: 대표 이미지 (1200×630px 권장)
- `og:title`, `og:description`, `og:url`
- `twitter:card`: summary_large_image
- 카카오톡 공유 시 썸네일·설명 정상 표시 테스트

**C-12. 접근성(A11y) 점검**

- 색상 대비 WCAG AA 기준 (4.5:1 이상)
- 모든 이미지에 의미 있는 alt 텍스트
- 키보드 탭 네비게이션 및 포커스 표시
- FAQ 아코디언 aria-expanded, aria-controls 속성
- CTA 버튼 aria-label

**C-13. GTM / 애널리틱스 이벤트 트래킹 체계화**

현재 관리자 페이지에 클릭 로그가 있으므로, 랜딩 페이지 주요 이벤트를 체계적으로 정의하고 트래킹합니다:

- CTA 버튼 클릭 (위치별 구분: hero / mid / bottom)
- 섹션 도달 (scroll depth)
- FAQ 항목 펼침
- 가격 섹션 조회
- 신청 폼 시작 / 완료 / 이탈

---

## Part D. 관리자 페이지 개선 사항

### 🔴 높은 우선순위

**D-1. 비밀번호/민감정보 마스킹 처리**

베타 신청 목록에서 비밀번호가 평문으로 노출되는 것이 확인되었습니다. 반드시 마스킹(`••••••`) 처리하고, 필요 시 eye-toggle 아이콘으로만 확인 가능하도록 합니다. 보안상 가장 시급한 수정 사항입니다.

**D-2. 검색·필터·페이지네이션 추가**

베타 신청자가 100명까지 늘어나면 현재 단순 리스트로는 관리가 어렵습니다:

- 이름/학년/신청일/상태별 필터
- 키워드 검색
- 페이지네이션 (20건/페이지) 또는 무한 스크롤

### 🟡 중간 우선순위

**D-3. 1:1 문의 상세 보기 및 답변 기능**

현재 "처리 완료" 상태 전환만 가능합니다. 아래 기능을 추가합니다:

- 문의 내용 상세 보기 모달/페이지
- 관리자 답변 작성 영역
- 답변 저장 시 자동 이메일 발송
- 답변 이력 조회

**D-4. 관리자 페이지 모바일 반응형**

- 테이블 → 카드뷰 전환 (768px 이하)
- KPI 카드 2×2 그리드
- 탭 가로 스크롤 또는 드롭다운 전환

**D-5. 세션 보안 강화**

- 관리자 로그인 세션 타임아웃 (예: 30분 비활성 시 자동 로그아웃)
- 세션 만료 시 오버레이 모달 표시 → 재로그인 유도
- 로그인 실패 횟수 제한 (5회 실패 시 일시 잠금)

### 🟢 낮은 우선순위

**D-6. 대시보드 확장**

향후 베타 운영 시 아래 지표를 관리자 대시보드에 추가하면 운영 의사결정에 유용합니다:

- 일별/주별 신청 추이 그래프
- 랜딩 페이지 유입 경로별 통계
- 신청 전환 퍼널 (페이지 방문 → 스크롤 → CTA 클릭 → 폼 작성 → 제출)

---

## Part E. 최종 체크리스트

| 우선순위 | 구분 | 항목 | 상태 |
|---------|------|------|------|
| 🔴 | 배포 | 새 GitHub 레포지토리 생성 | 예정 |
| 🔴 | 배포 | GitHub Actions 배포 워크플로우 설정 | 예정 |
| 🔴 | 배포 | `public/CNAME` 파일 생성 (`www.k-bestie.com`) | 예정 |
| 🔴 | 배포 | DNS CNAME + A 레코드 설정 | 예정 |
| 🔴 | 배포 | 기존 레포지토리 Custom domain 해제 → 새 레포 연결 | 예정 |
| 🔴 | 배포 | HTTPS 활성화 확인 | 예정 |
| 🔴 | 배포 | SPA 404.html 처리 | 예정 |
| 🔴 | 배포 | `ai.k-bestie.com` 처리 방침 결정 | 예정 |
| 🔴 | 랜딩 | FAQ "데이터는 안전한가요?" 답변 수정 | 완료 |
| 🔴 | 랜딩 | 개인정보처리방침·이용약관 페이지 | 미완 |
| 🔴 | 랜딩 | 모바일 반응형 실기기 테스트 | 미확인 |
| 🔴 | 랜딩 | 베타 신청 폼 UX 점검 | 미확인 |
| 🔴 | 관리자 | 비밀번호 마스킹 처리 | 미완 |
| 🔴 | 관리자 | 검색·필터·페이지네이션 | 미완 |
| 🟡 | 랜딩 | 사회적 증거 강화 | 일부 반영 |
| 🟡 | 랜딩 | 리포트 인터랙티브 미리보기 | 미완 |
| 🟡 | 랜딩 | 아이 경험 데모 영상/GIF | 미완 |
| 🟡 | 랜딩 | 페이지 로딩 성능 (LCP <2.5s) | 미확인 |
| 🟡 | 랜딩 | NavBar 앵커 링크 + 스크롤 스파이 | 미확인 |
| 🟡 | 랜딩 | 가격 카드 UI 보정 | 일부 구현 |
| 🟡 | 관리자 | 1:1 문의 답변 기능 | 미완 |
| 🟡 | 관리자 | 모바일 반응형 | 미확인 |
| 🟡 | 관리자 | 세션 보안 강화 | 미확인 |
| 🟢 | 랜딩 | 스크롤 인 애니메이션 | 미확인 |
| 🟢 | 랜딩 | SEO·OG 메타태그 | 일부 확인 |
| 🟢 | 랜딩 | 접근성 (A11y) | 미확인 |
| 🟢 | 랜딩 | 이벤트 트래킹 체계화 | 일부 구현 |
| 🟢 | 관리자 | 대시보드 지표 확장 | 미완 |
| ✅ | 랜딩 | 히어로 CTA 배치 | 개선됨 |
| ✅ | 랜딩 | 사회적 증거 수치 표시 | 추가됨 |
| ✅ | 랜딩 | 베타 혜택 상세화 | 추가됨 |
| ✅ | 랜딩 | 가격 투명 공개 | 추가됨 |
| ✅ | 공통 | 이미지 로컬 저장 확인 | 완료 |

---

**문서 끝** — Antigravity 팀은 🔴 항목부터 순차 진행하고, 배포 전환은 Part B의 B-6 절차를 순서대로 따릅니다. 궁금한 점은 언제든 문의해 주세요.