# 내친구 케이(K-Bestie) Admin Console 리뉴얼 디자인 명세서

**Version**: 1.0
**Date**: 2026-04-20
**Purpose**: 기존 랜딩 페이지 리뉴얼 명세서(Part 1~8)에 이어지는 관리자 페이지 리뉴얼 명세
**위치**: 랜딩 페이지 명세서 뒤에 Part 9~15로 추가

---

## Part 9. Admin Console 디자인 시스템 확장

### 9-1. Admin 전용 컬러 확장

랜딩 페이지의 디자인 시스템(Part 1)을 기반으로 하되, 관리자 페이지에 필요한 컬러를 추가합니다. 브랜드 컬러(Primary Teal, Secondary Coral 등)와 Neutral Palette는 랜딩 페이지와 동일하게 유지하여 시각적 일관성을 확보합니다.

**Admin Status Colors**

| Token | Value | 용도 |
|-------|-------|------|
| status-pending | `#F59E0B` (Amber) | 답변 대기, 검토중 상태 |
| status-pending-bg | `rgba(245,158,11,0.08)` | 답변 대기 배경 |
| status-active | `#22C55E` (Green) | 완료, 해결됨, 활성 |
| status-active-bg | `rgba(34,197,94,0.08)` | 완료 배경 |
| status-danger | `#EF4444` (Red) | 미해결, 긴급, 에러 |
| status-danger-bg | `rgba(239,68,68,0.08)` | 미해결 배경 |
| status-info | `#3B82F6` (Blue) | 문의 전체, 정보성 |
| status-info-bg | `rgba(59,130,246,0.08)` | 정보 배경 |

**Admin Surface Colors**

| Token | Value | 용도 |
|-------|-------|------|
| admin-bg | `#FAFAF8` | 페이지 배경 (랜딩과 동일) |
| admin-surface | `#FFFFFF` | 카드, 테이블 배경 |
| admin-surface-raised | `#F9FAFB` | 테이블 행 호버, 서브 영역 |
| admin-border | `rgba(0,0,0,0.06)` | 기본 보더 |
| admin-border-strong | `rgba(0,0,0,0.12)` | 구분선, 테이블 헤더 하단 |
| admin-dark-bg | `#1A1A2E` | 클릭 로그 다크 섹션 배경 |
| admin-dark-surface | `#252540` | 다크 섹션 카드/테이블 배경 |
| admin-dark-border | `rgba(255,255,255,0.08)` | 다크 섹션 보더 |
| admin-dark-text | `rgba(255,255,255,0.87)` | 다크 섹션 기본 텍스트 |
| admin-dark-text-secondary | `rgba(255,255,255,0.5)` | 다크 섹션 보조 텍스트 |

**차트 컬러 팔레트 (클릭 로그 바 차트용)**

순위 1~10에 대해 그라데이션 느낌으로 배정합니다.

| 순위 | 컬러 | Value |
|------|-------|-------|
| 1 | Sky Blue | `#38BDF8` |
| 2 | Teal | `#2DD4BF` |
| 3 | Emerald | `#34D399` |
| 4 | Green | `#4ADE80` |
| 5 | Lime | `#A3E635` |
| 6 | Yellow | `#FACC15` |
| 7 | Amber | `#FBBF24` |
| 8 | Orange | `#FB923C` |
| 9 | Coral | `#F87171` |
| 10 | Pink | `#F472B6` |

### 9-2. Admin 전용 타이포그래피 확장

폰트 패밀리는 랜딩 페이지와 동일하게 Pretendard를 사용합니다. 추가되는 타이포 스타일은 다음과 같습니다.

| 용도 | Size | Weight | 비고 |
|------|------|--------|------|
| Admin Page Title | 32px | 700 | "K-Bestie Admin Console" |
| Admin Section Title | 20px | 700 | "명단", "문의" 등 |
| Table Header | 13px | 600 | 테이블 컬럼 헤더 |
| Table Cell | 14px | 400 | 테이블 본문 |
| Table Cell Bold | 14px | 600 | 이름, 주요 데이터 |
| KPI Number | 40px | 700 | 대시보드 숫자 |
| KPI Label | 13px | 500 | 대시보드 라벨 |
| Mono (코드/ID) | 13px | 400 | ID 번호, 기기 정보. font-family: `'SF Mono', 'Fira Code', monospace` fallback Pretendard |

### 9-3. Admin 전용 간격 추가

| Token | Value | 용도 |
|-------|-------|------|
| admin-sidebar-width | 240px | 사이드바 너비 (확장 시) |
| admin-header-height | 64px | 어드민 헤더 높이 |
| admin-content-padding | 32px | 메인 콘텐츠 영역 패딩 (Desktop) |
| admin-content-padding-mobile | 16px | 메인 콘텐츠 영역 패딩 (Mobile) |
| admin-card-gap | 20px | KPI 카드 간 간격 |
| admin-table-row-height | 64px | 테이블 행 최소 높이 |
| admin-tab-height | 48px | 탭 네비게이션 높이 |

---

## Part 10. Admin Console 레이아웃 구조

### 10-1. 전체 페이지 레이아웃

현재는 탭 기반 단일 페이지 구조인데, 이를 유지하면서 시각적 정리를 강화합니다. 향후 기능 확장 시 사이드바 구조로 전환 가능하도록 확장성을 고려한 설계입니다.

**MVP 단계 (현재 구조 유지 + 정리)**

```
┌─────────────────────────────────────────────────────┐
│  [Admin Header]                                      │
│  로고 + 타이틀 + 실시간 상태 + 로그아웃              │
├─────────────────────────────────────────────────────┤
│  [KPI Dashboard Cards]                               │
│  베타신청 | 문의전체 | 답변대기 | 완료               │
├─────────────────────────────────────────────────────┤
│  [Tab Navigation]                                    │
│  베타 신청 현황 | 실시간 클릭 로그 | 1:1 문의 리스트 │
├─────────────────────────────────────────────────────┤
│  [Tab Content Area]                                  │
│                                                      │
│  (각 탭의 콘텐츠)                                    │
│                                                      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**전체 레이아웃 스타일**

```
페이지 배경: admin-bg (#FAFAF8)
최대 너비: 1200px
중앙 정렬: margin 0 auto
좌우 패딩: 32px (Desktop) / 16px (Mobile)
```

### 10-2. 향후 확장 구조 (참고용)

서비스가 성장하면 아래처럼 사이드바 네비게이션 구조로 전환할 수 있습니다. 현재 코드 작성 시 메인 콘텐츠 영역을 컴포넌트로 분리해두면 전환이 용이합니다.

```
┌──────────┬──────────────────────────────────────────┐
│ Sidebar  │  [Header]                                 │
│          ├──────────────────────────────────────────┤
│ 대시보드 │  [KPI Cards]                              │
│ 베타신청 │  [Content Area]                           │
│ 클릭로그 │                                           │
│ 1:1문의  │                                           │
│ 설정     │                                           │
└──────────┴──────────────────────────────────────────┘
```

---

## Part 11. Admin Console 컴포넌트 상세 명세

### 11-1. Admin Header

**레이아웃**: 가로 풀너비, 좌측 정렬

```
┌─────────────────────────────────────────────────────────┐
│ K-Bestie Admin Console          [실시간]     [로그아웃] │
│ ● 실시간 현황                                           │
└─────────────────────────────────────────────────────────┘
```

**스타일**

```
컨테이너:
  padding: 24px 0 20px
  border-bottom: 없음 (KPI 카드와의 간격으로 구분)

타이틀:
  "K-Bestie Admin Console"
  font-size: 32px (Admin Page Title)
  font-weight: 700
  color: Charcoal (#1E1E2D)
  letter-spacing: -0.01em
  font-family: Pretendard (현재 고정폭 폰트에서 변경)
  
  [리뉴얼 포인트] 현재 모노스페이스 느낌의 폰트를 Pretendard Bold로 변경하여
  랜딩 페이지와 브랜드 톤을 통일합니다. 다만 "K-Bestie"만 약간의 스타일 차별을
  주고 싶다면, 이 부분만 font-weight 800 또는 letter-spacing -0.02em 적용

실시간 상태 인디케이터:
  "● 실시간 현황"
  ● = 8px 원형, #22C55E, 1초 간격 pulse 애니메이션 (opacity 1 → 0.4 → 1)
  텍스트: Caption (13px), Medium Gray
  타이틀 아래 4px 간격

로그아웃 버튼:
  위치: 우상단 (타이틀과 수평 정렬)
  스타일: Ghost Button 변형
    border: 1px solid admin-border-strong
    border-radius: radius-md (12px)
    padding: 8px 16px
    font-size: 14px, font-weight: 500
    color: status-danger (#EF4444)
    아이콘: Lucide "log-out" (16px), 텍스트 좌측에 배치, 간격 6px
    hover: border-color status-danger, background status-danger-bg
```

### 11-2. KPI Dashboard Cards

**레이아웃**: 4개 카드 가로 나열, 균등 분할

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 베타 신청 │ │ 문의 전체 │ │ 답변 대기 │ │   완료   │
│    2     👥│ │    1     💬│ │    1      │ │    0     │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

**카드 공통 스타일**

```
배경: admin-surface (#FFFFFF)
border: 1px solid admin-border
border-radius: radius-lg (16px)
padding: 20px 24px
shadow: shadow-sm
min-height: 100px
display: flex
flex-direction: column
justify-content: space-between

hover:
  shadow: shadow-md
  border-color: 각 카드의 포인트 컬러 20% opacity
  transition: all 200ms ease

카드 간 간격: admin-card-gap (20px)
```

**카드별 상세**

카드 1 — 베타 신청:
```
라벨: "베타 신청" — KPI Label, Medium Gray
숫자: "2" — KPI Number, color: #E8845A (Warm Coral)
아이콘: Lucide "users" (24px)
아이콘 컨테이너: 40px x 40px 원형, background: rgba(232,132,90,0.1)
아이콘 색상: #E8845A
아이콘 위치: 카드 우상단
좌측 상단 액센트: border-top: 3px solid #E8845A (또는 border-left)
```

카드 2 — 문의 전체:
```
라벨: "문의 전체"
숫자 색상: #3B82F6 (Info Blue)
아이콘: Lucide "message-square" (24px)
아이콘 컨테이너 배경: rgba(59,130,246,0.1)
아이콘 색상: #3B82F6
액센트: border-top: 3px solid #3B82F6
```

카드 3 — 답변 대기:
```
라벨: "답변 대기"
숫자 색상: #F59E0B (Amber) — 0이면 #22C55E로 변경
아이콘: Lucide "clock" (24px)
아이콘 컨테이너 배경: rgba(245,158,11,0.1) — 0이면 green 계열
아이콘 색상: #F59E0B — 0이면 #22C55E
액센트: border-top: 3px solid #F59E0B — 0이면 #22C55E

[특수 동작] 답변 대기가 1 이상이면:
  카드 배경을 status-pending-bg로 미세하게 변경
  숫자에 subtle pulse 애니메이션 (주의 환기)
```

카드 4 — 완료:
```
라벨: "완료"
숫자 색상: #22C55E (Green)
아이콘: Lucide "check-circle" (24px)
아이콘 컨테이너 배경: rgba(34,197,94,0.1)
아이콘 색상: #22C55E
액센트: border-top: 3px solid #22C55E
```

**숫자 변경 애니메이션**: 값이 변경될 때 숫자가 위로 슬라이드하며 교체 (300ms, ease-out). 변경 직후 배경에 해당 색상 flash (opacity 0.1 → 0, 500ms)

**모바일 레이아웃**: 2x2 그리드, 각 카드 동일 높이

### 11-3. Tab Navigation

**레이아웃**: 3개 탭 가로 나열, 균등 분할 또는 콘텐츠 너비 기반

```
┌─────────────────┬──────────────────┬─────────────────┐
│  베타 신청 현황  │  실시간 클릭 로그  │  1:1 문의 리스트 │
└─────────────────┴──────────────────┴─────────────────┘
```

**스타일**

```
컨테이너:
  margin-top: space-6 (32px)
  border-bottom: 2px solid admin-border (#rgba(0,0,0,0.06))
  
탭 아이템 (비활성):
  padding: 14px 24px
  font-size: 15px
  font-weight: 500
  color: Medium Gray (#6B7280)
  cursor: pointer
  border-bottom: 2px solid transparent
  margin-bottom: -2px (border-bottom과 겹치도록)
  transition: all 200ms
  
  hover:
    color: Dark Gray (#3A3A4A)
    background: admin-surface-raised (#F9FAFB)
    border-radius: radius-md radius-md 0 0

탭 아이템 (활성):
  color: Primary (#1A6B5A)
  font-weight: 600
  border-bottom: 2px solid Primary (#1A6B5A)
  
  [리뉴얼 포인트] 현재는 활성 탭이 주황/파란 배경색으로 채워지는데,
  리뉴얼에서는 하단 언더라인 방식으로 변경하여 더 세련된 느낌을 줍니다.
  배경 채우기 방식은 시각적으로 무겁고 탭 간 일관성이 떨어집니다.
```

**탭 전환 애니메이션**: 콘텐츠 영역이 opacity 0 → 1 + translateY(8px → 0), 200ms

**모바일**: 탭이 가로 스크롤 가능하도록 하거나, 3개이므로 균등 분할 유지 (폰트 사이즈 13px로 축소)

### 11-4. 액션 버튼 바 (엑셀 + 새로고침)

각 탭 콘텐츠 영역 상단 우측에 위치하는 액션 버튼 그룹입니다.

```
┌──────────────────────────────────────────────────┐
│ 명단                              [엑셀] [새로고침] │
└──────────────────────────────────────────────────┘
```

**스타일**

```
컨테이너:
  display: flex
  justify-content: space-between
  align-items: center
  padding: 16px 0
  border-bottom: 1px solid admin-border

섹션 타이틀 (좌측):
  "명단" / "문의" 등
  Admin Section Title (20px, Bold, Charcoal)

액션 버튼 그룹 (우측):
  display: flex
  gap: 8px

엑셀 버튼:
  Secondary Button 스타일의 축소 버전
  padding: 8px 14px
  font-size: 13px
  border: 1px solid admin-border-strong
  border-radius: radius-md
  color: Dark Gray
  아이콘: Lucide "download" (14px), 텍스트 좌측, 간격 4px
  hover: background admin-surface-raised, border-color Primary

새로고침 버튼:
  Ghost Button 스타일
  padding: 8px 14px
  font-size: 13px
  아이콘: Lucide "refresh-cw" (14px), 텍스트 좌측, 간격 4px
  hover: background admin-surface-raised
  
  [클릭 시] 아이콘이 360도 회전 (500ms, ease)
```

### 11-5. 데이터 테이블

전체 탭에서 공통으로 사용되는 테이블 컴포넌트입니다.

**테이블 컨테이너**

```
배경: admin-surface (#FFFFFF)
border: 1px solid admin-border
border-radius: radius-lg (16px)
overflow: hidden
shadow: shadow-sm
```

**테이블 헤더**

```
배경: admin-surface-raised (#F9FAFB)
padding: 12px 24px
border-bottom: 1px solid admin-border-strong

텍스트:
  font-size: 13px (Table Header)
  font-weight: 600
  color: Medium Gray (#6B7280)
  text-transform: none (한글이므로 대문자 변환 불필요)
  letter-spacing: 0.02em
```

**테이블 행**

```
padding: 16px 24px
min-height: admin-table-row-height (64px)
border-bottom: 1px solid admin-border
display: flex 또는 grid
align-items: center

hover:
  background: admin-surface-raised (#F9FAFB)
  transition: background 150ms

마지막 행:
  border-bottom: none
```

**테이블 셀 타입별 스타일**

날짜/시간 셀:
```
font-size: 14px (Table Cell)
color: Dark Gray (#3A3A4A)
line-height: 1.5

보조 정보 (ID 등):
  font-size: 12px
  color: Medium Gray
  margin-top: 2px
```

이름/연락처 셀:
```
이름:
  font-size: 14px
  font-weight: 600 (Table Cell Bold)
  color: Charcoal (#1E1E2D)

전화번호:
  font-size: 13px
  color: Medium Gray
  margin-top: 2px

학년 배지: (아래 11-6 Badge 참조)
  이름/전화번호 우측 또는 아래에 배치
  
아바타 아이콘:
  이름 좌측에 32px x 32px 원형
  배경: admin-surface-raised
  아이콘: Lucide "user" (16px), Medium Gray
  border: 1px solid admin-border
```

이메일 셀:
```
아이콘: Lucide "mail" (14px), Medium Gray
텍스트: font-size 14px, color: Dark Gray
아이콘과 텍스트 간격: 6px
```

비밀번호/PIN 셀:
```
[리뉴얼 중요 포인트]
현재 비밀번호가 "2222", "11111" 등으로 보이고 있습니다.
리뉴얼에서는 다음과 같이 변경합니다:

기본 표시: "••••" (마스킹)
배경: admin-surface-raised
border: 1px solid admin-border
border-radius: radius-md
padding: 6px 12px
font-family: monospace
font-size: 14px
display: inline-block

우측에 "보기" 토글 아이콘: Lucide "eye" / "eye-off" (14px)
클릭 시 3초간 원문 표시 후 자동 마스킹 복귀

[보안 참고] 실제 프로덕션에서는 PIN을 관리자에게도 보여주지 않는 것이 원칙입니다.
이 필드는 향후 제거하거나 "PIN 설정됨 ✓" / "PIN 미설정 ✗" 상태 표시로 대체를 권장합니다.
```

**빈 상태 (Empty State)**

```
테이블 콘텐츠 영역 중앙:
  아이콘: Lucide "inbox" (48px), admin-border 색상
  텍스트: "처리 완료된 문의가 없습니다." 또는 상황에 맞는 메시지
  font-size: 15px
  color: Medium Gray
  padding: 80px 0
  text-align: center
```

### 11-6. Badge (배지) 시스템

**학년 배지**

```
현재: "초등학교 4학년" (파란), "초등학교 1학년" (녹색)

리뉴얼 스타일:
  padding: 3px 10px
  border-radius: radius-full (pill)
  font-size: 12px (Badge/Tag)
  font-weight: 600
  letter-spacing: 0.02em
  
  초등 1~2학년: background rgba(34,197,94,0.1), color #16A34A
  초등 3~4학년: background rgba(59,130,246,0.1), color #2563EB
  초등 5~6학년: background rgba(139,92,246,0.1), color #7C3AED
  
  [표시 형식 단축] "초등학교 4학년" → "초4" 또는 "초등 4학년"으로 단축하여
  테이블 내에서 공간을 절약합니다.
```

**상태 배지**

```
검토중:
  background: status-danger-bg
  color: status-danger (#EF4444)
  padding: 4px 10px
  border-radius: radius-full
  font-size: 12px, font-weight: 600

처리완료:
  background: status-active-bg
  color: status-active (#22C55E)
  동일 스타일

CLICK (클릭 로그용):
  background: status-info-bg
  color: status-info (#3B82F6)
  동일 스타일
```

**액션 버튼 배지 (문의 리스트)**

```
"해결 완료하기" 버튼:
  스타일: Primary Button의 소형 버전
  padding: 6px 14px
  font-size: 13px
  border-radius: radius-full
  background: Primary (#1A6B5A)
  color: White
  hover: background Light Teal (#2D9F8F)
  
  [클릭 후] 버튼이 사라지고 "처리완료" 배지로 교체
  전환 애니메이션: scale(1 → 0.9 → 1), 200ms + 배지 fade-in 300ms
```

### 11-7. Sub Tab (문의 리스트 내 미해결/해결됨)

```
┌──────────────────────────────────────────────────┐
│ 문의    [미해결] [해결됨]           [엑셀] [새로고침] │
└──────────────────────────────────────────────────┘
```

**스타일**

```
컨테이너:
  display: flex
  align-items: center
  gap: 8px
  "문의" 타이틀 우측에 배치

토글 버튼 (비활성):
  padding: 6px 16px
  border-radius: radius-full
  font-size: 14px
  font-weight: 500
  color: Medium Gray
  background: transparent
  border: 1px solid admin-border
  cursor: pointer
  
  hover: background admin-surface-raised

토글 버튼 (활성 - 미해결):
  background: status-danger (#EF4444)
  color: White
  border: 1px solid status-danger
  font-weight: 600
  shadow: 0 2px 8px rgba(239,68,68,0.25)

토글 버튼 (활성 - 해결됨):
  background: status-active (#22C55E)
  color: White
  border: 1px solid status-active
  font-weight: 600
  shadow: 0 2px 8px rgba(34,197,94,0.25)

[리뉴얼 포인트] 현재도 비슷한 구조이지만, 활성 상태의 그림자와
비활성 상태의 시각적 차이를 더 명확하게 합니다.
건수 표시를 추가합니다: "미해결 (1)" / "해결됨 (0)" 형태
```

---

## Part 12. 탭별 콘텐츠 상세 명세

### 12-1. 탭 1: 베타 신청 현황

**전체 구조**

```
┌──────────────────────────────────────────────────────┐
│ 명단                                  [엑셀] [새로고침] │
├──────────────────────────────────────────────────────┤
│ [검색/필터 바] (리뉴얼 추가)                           │
├──────────────────────────────────────────────────────┤
│ 신청 시간          전용 이름 / 연락처       상세 내역    │
├──────────────────────────────────────────────────────┤
│ 2026.4.20 10:18   👤 222222              ✉ 22222@... │
│ ID: 2              022-2222-222 [초4]     PIN: ••••  │
├──────────────────────────────────────────────────────┤
│ 2026.4.20 10:17   👤 테스트1              ✉ 111111@..│
│ ID: 1              011-1111-1111 [초1]    PIN: ••••  │
├──────────────────────────────────────────────────────┤
│                    페이지네이션 (리뉴얼 추가)           │
└──────────────────────────────────────────────────────┘
```

**리뉴얼 추가 요소: 검색/필터 바**

```
위치: 섹션 타이틀과 테이블 사이
배경: admin-surface-raised
border-radius: radius-md
padding: 12px 16px
display: flex
gap: 12px
align-items: center

검색 입력 필드:
  width: 280px
  placeholder: "이름, 연락처, 이메일 검색"
  아이콘: Lucide "search" (16px), 입력 필드 좌측 내부
  border: 1px solid admin-border
  border-radius: radius-md
  padding: 8px 12px 8px 36px (아이콘 공간)
  font-size: 14px
  focus: border-color Primary, shadow-glow 미세 버전

학년 필터 드롭다운:
  width: 140px
  options: 전체 / 초1 / 초2 / 초3 / 초4 / 초5 / 초6
  border: 1px solid admin-border
  border-radius: radius-md
  padding: 8px 12px
  font-size: 14px

신청일 정렬:
  버튼 형태: "최신순 ↓" / "오래된순 ↑"
  Ghost Button 스타일
```

**리뉴얼 추가 요소: 페이지네이션**

```
위치: 테이블 하단
정렬: center

스타일:
  display: flex
  gap: 4px
  align-items: center
  
  페이지 번호 버튼 (비활성):
    width: 36px, height: 36px
    border-radius: radius-md
    font-size: 14px
    color: Medium Gray
    hover: background admin-surface-raised
    
  페이지 번호 버튼 (활성):
    background: Primary (#1A6B5A)
    color: White
    font-weight: 600
    
  이전/다음 화살표:
    Lucide "chevron-left" / "chevron-right" (16px)
    동일 버튼 스타일
    disabled 시: opacity 0.3, cursor not-allowed

  "총 2건" 텍스트: Caption, Medium Gray, 페이지네이션 좌측
```

**테이블 컬럼 비율**: 신청 시간 25% / 전용 이름·연락처 40% / 상세 내역 35%

**행 클릭 동작**: 행 클릭 시 해당 신청자의 상세 정보를 사이드 패널(Drawer) 또는 모달로 표시하는 것을 향후 고려. 현재는 인라인 표시 유지

### 12-2. 탭 2: 실시간 클릭 로그

**전체 구조**

```
┌──────────────────────────────────────────────────────┐
│ 문의                                  [엑셀] [새로고침] │
├──────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────┐  │
│ │  [최신순] [인기순]  [목록] [차트]  [최근일주일] [최근한달] │  │
│ └─────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────┤
│                                                       │
│  (목록 뷰 또는 차트 뷰)                                 │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**필터/뷰 전환 바**

```
배경: admin-dark-bg (#1A1A2E) — 이 탭은 다크 테마 유지
border-radius: radius-lg
padding: 12px 16px
margin-bottom: 0 (콘텐츠와 연결)

버튼 그룹들:
  각 그룹은 토글 버튼 세트
  그룹 간 구분: 세로 1px 라인 (admin-dark-border), 또는 gap 16px

  토글 버튼 (비활성):
    padding: 6px 14px
    border-radius: radius-full
    font-size: 13px
    color: admin-dark-text-secondary
    border: 1px solid admin-dark-border
    
  토글 버튼 (활성):
    background: rgba(255,255,255,0.15)
    color: admin-dark-text
    font-weight: 600
    border: 1px solid rgba(255,255,255,0.2)
```

**목록 뷰 (다크 테마)**

```
컨테이너:
  background: admin-dark-bg (#1A1A2E)
  border-radius: 0 0 radius-lg radius-lg (상단은 필터바와 연결)
  padding: 0 16px 16px

테이블 스타일 (다크 버전):
  헤더 배경: admin-dark-surface (#252540)
  헤더 텍스트: admin-dark-text-secondary, 13px, 600
  
  행 배경: transparent
  행 hover: admin-dark-surface
  행 border-bottom: 1px solid admin-dark-border
  행 텍스트: admin-dark-text, 14px
  
  보조 텍스트 (ID, 기기 정보): admin-dark-text-secondary, 12px

테이블 컬럼: 시간 15% / 구분 10% / 텍스트·ID 25% / 위치 20% / 기기 정보 30%

"CLICK" 배지 (다크 버전):
  background: rgba(59,130,246,0.2)
  color: #60A5FA (밝은 Blue)
  padding: 3px 10px
  border-radius: radius-full
  font-size: 11px, font-weight: 700, letter-spacing: 0.05em, uppercase

위치 (URL 경로):
  font-family: monospace
  color: #60A5FA (링크 느낌)
  font-size: 13px

기기 정보:
  font-family: monospace
  color: admin-dark-text-secondary
  font-size: 12px
  max-width: 300px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  
  hover 시: tooltip으로 전체 User Agent 표시
```

**차트 뷰 (다크 테마)**

```
컨테이너: 목록 뷰와 동일한 다크 배경

차트 영역:
  background: admin-dark-surface (#252540)
  border-radius: radius-lg
  padding: 32px
  margin: 16px

타이틀:
  "Top 10 클릭 요소"
  font-size: 20px, font-weight: 700
  color: admin-dark-text

서브 타이틀:
  "최근 한 달 · 총 8건"
  font-size: 14px
  color: admin-dark-text-secondary
  margin-top: 4px
  margin-bottom: 32px

바 차트 항목:

  각 행 구조:
  ┌────┬──────────┬──────────────────────────────────┬──────┐
  │ 순위 │  라벨     │  바                               │ 건수  │
  └────┴──────────┴──────────────────────────────────┴──────┘

  순위:
    28px x 28px 원형
    배경: rgba(255,255,255,0.1)
    텍스트: admin-dark-text, 14px, Bold, center
    
  라벨:
    font-size: 14px
    font-weight: 500
    color: admin-dark-text
    width: 100px (고정)
    
  바:
    height: 32px
    border-radius: radius-sm (6px)
    background: 차트 컬러 팔레트에서 순위별 배정
    width: (건수 / 최대건수) * 100% (상대적)
    min-width: 40px (최소 표시)
    transition: width 600ms ease-out (스크롤 진입 시 애니메이션)
    
    바 내부 건수 라벨:
      바가 충분히 넓으면 바 우측 내부에 표시
      배경: rgba(0,0,0,0.3)
      padding: 2px 8px
      border-radius: radius-sm
      font-size: 12px, font-weight: 600
      color: White
      
  우측 건수:
    font-size: 14px
    color: admin-dark-text-secondary
    width: 40px (고정)
    text-align: right
    
  행 간 간격: 12px
  행 hover: 바에 brightness(1.15) filter 적용
```

### 12-3. 탭 3: 1:1 문의 리스트

**전체 구조**

```
┌──────────────────────────────────────────────────────┐
│ 문의  [미해결(1)] [해결됨(0)]         [엑셀] [새로고침] │
├──────────────────────────────────────────────────────┤
│ 신청 시간          전용 이름 / 연락처       상세 내역    │
├──────────────────────────────────────────────────────┤
│ 2026.4.20 10:20   111111               [검토중]       │
│                    111111@111.com       [해결완료하기] │
│                                         "1171"        │
├──────────────────────────────────────────────────────┤
│                    (빈 상태 또는 추가 문의)             │
└──────────────────────────────────────────────────────┘
```

**문의 행 상세 스타일**

```
미해결 문의 행:
  border-left: 3px solid status-danger (#EF4444)
  배경: 기본 admin-surface, hover 시 status-danger-bg 미세하게
  
해결됨 문의 행:
  border-left: 3px solid status-active (#22C55E)
  배경: 기본 admin-surface, hover 시 status-active-bg 미세하게

문의 내용 표시:
  배경: admin-surface-raised (#F9FAFB)
  border: 1px solid admin-border
  border-radius: radius-md
  padding: 10px 14px
  font-size: 14px
  color: Dark Gray
  max-width: 300px
  
  [길이 제한] 내용이 길면 2줄까지 표시 후 "..." 처리
  클릭 시 전체 내용 표시 (행 확장 또는 tooltip)

상태 배지 + 액션 버튼:
  가로 나열, gap: 8px
  "검토중" 배지와 "해결 완료하기" 버튼이 나란히 위치
```

**상태 전환 플로우 상세**

```
Step 1: "해결 완료하기" 버튼 클릭
Step 2: 확인 다이얼로그 표시
  "이 문의를 해결 완료 처리하시겠습니까?"
  [취소] [확인]
  다이얼로그 스타일: 랜딩 페이지 명세서의 shadow-xl, radius-xl 적용
  
Step 3: 확인 클릭 시
  - 버튼이 스피너로 변경 (200ms)
  - 성공 시: 행에 초록색 flash 애니메이션 (300ms)
  - "검토중" 배지 → "처리완료" 배지로 전환 (fade 300ms)
  - "해결 완료하기" 버튼 사라짐
  - KPI 카드 숫자 업데이트 (답변 대기 -1, 완료 +1)
  
Step 4: "해결됨" 탭으로 전환 시 해당 항목이 이동되어 표시됨

[리뉴얼 포인트] 현재는 확인 없이 바로 처리되는 것으로 보입니다.
실수 방지를 위해 확인 다이얼로그를 추가합니다.
```

---

## Part 13. Admin Console 반응형 레이아웃

### 13-1. 브레이크포인트별 변경

**Desktop (1024px+)**
- 현재 명세의 기본 레이아웃 적용
- KPI 카드 4개 가로 나열
- 테이블 컬럼 모두 표시

**Tablet (768px ~ 1023px)**
- KPI 카드: 4개 가로 유지 (카드 내부 패딩 축소)
- 테이블: 기기 정보 컬럼 숨김 (클릭 로그)
- 전체 좌우 패딩 24px

**Mobile (~ 767px)**
- KPI 카드: 2x2 그리드
- 탭 네비게이션: 폰트 13px, 패딩 축소
- 테이블: 카드 리스트 뷰로 전환

**모바일 카드 리스트 뷰**

테이블 행이 모바일에서는 개별 카드로 변환됩니다.

```
┌─────────────────────────────────┐
│ 2026년 4월 20일 오후 10:18       │
│ ID: 2                           │
├─────────────────────────────────┤
│ 👤 222222                       │
│ 022-2222-222  [초4]             │
├─────────────────────────────────┤
│ ✉ 22222@222.com                │
│ PIN: ••••                       │
└─────────────────────────────────┘

카드 스타일:
  배경: admin-surface
  border: 1px solid admin-border
  border-radius: radius-lg
  padding: 16px
  margin-bottom: 12px
  
  각 영역을 수평 구분선으로 분리
```

---

## Part 14. Admin Console 인터랙션 및 실시간 동작

### 14-1. 실시간 데이터 갱신

```
방식: 폴링 (30초 간격) 또는 WebSocket/Firestore 실시간 리스너

갱신 시 동작:
  - KPI 숫자 변경: 숫자 슬라이드 애니메이션 (위로 이동하며 교체, 300ms)
  - 새 데이터 행: 테이블 최상단에 삽입, 배경 highlight (해당 KPI 카드 색상의 10% opacity)
    → 3초 후 highlight 사라짐 (fade-out 500ms)
  - 새로고침 버튼 클릭 시에도 동일한 동작
  
실시간 인디케이터:
  헤더의 "● 실시간 현황"
  정상 연결: 녹색 도트 + pulse 애니메이션
  연결 끊김: 주황색 도트 + "연결 재시도 중..." 텍스트로 변경
  에러: 빨간색 도트 + "연결 끊김" 텍스트
```

### 14-2. 엑셀 다운로드

```
클릭 시:
  1. 버튼 텍스트 → "다운로드 중..." + 스피너 (200ms)
  2. 파일 생성 완료 시: 브라우저 기본 다운로드 트리거
  3. 버튼 복원 (200ms)
  
파일명 규칙:
  베타 신청: "K-Bestie_베타신청_YYYYMMDD.xlsx"
  클릭 로그: "K-Bestie_클릭로그_YYYYMMDD.xlsx"
  문의 리스트: "K-Bestie_문의리스트_YYYYMMDD.xlsx"
```

### 14-3. 토스트 알림

관리 액션 수행 후 피드백을 제공하는 토스트 컴포넌트입니다.

```
위치: 화면 우상단 (헤더 아래)
최대 너비: 360px

성공 토스트:
  배경: #FFFFFF
  border-left: 4px solid #22C55E
  shadow: shadow-lg
  border-radius: radius-md
  padding: 14px 20px
  
  아이콘: Lucide "check-circle" (20px), #22C55E
  텍스트: "문의가 해결 완료 처리되었습니다." — Body Regular, Charcoal
  닫기: Lucide "x" (16px), Medium Gray, 우측
  
  진입: translateX(100%) → 0, 300ms
  퇴장: 4초 후 자동, 또는 닫기 클릭 시 translateX(100%), 300ms
  
에러 토스트:
  동일 구조, border-left: 4px solid #EF4444
  아이콘: Lucide "alert-circle" (20px), #EF4444
```

---

## Part 15. Admin Console 보안 및 접근 권한 참고사항

이 섹션은 디자인 명세이므로 기술 구현 상세는 다루지 않지만, UI/UX에 영향을 주는 보안 관련 디자인 고려사항을 정리합니다.

### 15-1. 로그인 화면

현재 스크린샷에는 로그인 화면이 보이지 않지만, Admin Console 진입 시 로그인이 필요합니다.

```
Admin 로그인 화면:
  중앙 정렬 카드 (max-width: 400px)
  배경: admin-bg
  
  카드 내부:
    로고 (중앙 정렬, 36px 높이)
    타이틀: "관리자 로그인" — H3, Charcoal, center
    margin-bottom: space-8
    
    이메일 입력 필드
    비밀번호 입력 필드 (eye 토글 포함)
    "로그인" Primary Button (풀너비)
    
  스타일: 랜딩 페이지 디자인 시스템의 입력 필드, 버튼 스타일 그대로 적용
```

### 15-2. PIN 표시 관련 UI 변경

```
현재: PIN이 평문으로 테이블에 노출
변경: "••••" 마스킹 + "보기" 토글
향후 권장: PIN 필드 자체를 제거하고 "PIN 설정됨 ✓" 상태만 표시

[디자인에 반영할 점]
"보기" 토글 클릭 시 관리자 행동 로그에 기록된다는 안내 tooltip:
"PIN 조회 이력이 기록됩니다"
- Caption, Medium Gray, 아이콘 hover 시 표시
```

### 15-3. 세션 만료 안내

```
세션 만료 시 (예: 30분 비활동):
  화면 중앙에 오버레이 모달:
    "세션이 만료되었습니다."
    "보안을 위해 다시 로그인해 주세요."
    [다시 로그인] Primary Button
    
  배경: rgba(0,0,0,0.5) 오버레이
  카드: 랜딩 페이지 카드 스타일, shadow-xl
```

---

## 변경점 요약 (현재 Admin Console 대비)

| 항목 | 현재 | 리뉴얼 |
|------|------|--------|
| 헤더 타이틀 폰트 | 모노스페이스 느낌 | Pretendard Bold로 브랜드 통일 |
| KPI 카드 | 기본 카드 + 색상 숫자 | 아이콘 컨테이너 + border-top 액센트 + 호버 인터랙션 + 숫자 변경 애니메이션 |
| 탭 네비게이션 | 활성 탭 배경 채우기 | 하단 언더라인 방식으로 세련되게 변경 |
| 베타 신청 테이블 | 기본 나열 | 검색/필터 바 추가 + 페이지네이션 추가 |
| PIN 표시 | 평문 노출 | 마스킹 + 보기 토글 + 조회 로그 안내 |
| 학년 배지 | "초등학교 4학년" 전체 표시 | "초4" 단축 + 학년대별 색상 구분 |
| 문의 상태 전환 | 즉시 처리 | 확인 다이얼로그 추가 |
| 클릭 로그 차트 | 기본 바 차트 | 호버 인터랙션 + 스크롤 진입 애니메이션 + 건수 라벨 개선 |
| 빈 상태 | 텍스트만 | 아이콘 + 텍스트 구조화 |
| 실시간 갱신 피드백 | 새로고침 버튼 | 자동 갱신 + 숫자 애니메이션 + 새 데이터 하이라이트 |
| 토스트 알림 | 없음 | 성공/에러 토스트 추가 |
| 반응형 | 미확인 | Desktop/Tablet/Mobile 3단계 대응 |
| 다크 테마 전환 | 탭 전환 시 갑작스러운 전환 | 필터 바와 콘텐츠가 연결된 자연스러운 다크 영역 |
| 엑셀 다운로드 | 기능만 존재 | 로딩 상태 + 파일명 규칙 정의 |
| 에러/로딩 상태 | 미확인 | 연결 상태 인디케이터 + 세션 만료 모달 |
