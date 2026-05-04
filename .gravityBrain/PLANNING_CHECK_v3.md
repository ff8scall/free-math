# 📋 PLANNING CHECK (기획 체크리스트)

## 📌 [Phase 1] 리텐션 및 1차 수익화 검증 (완료)
- [x] **일일 퀘스트(Daily Quests) 로직 구현**: `storageManager.js`에 마지막 로그인 시간(`lastLoginDate`) 체크 및 퀘스트 상태 초기화 로직 추가.
- [x] **출석체크 UI 추가**: `HomePage.jsx`에 `DailyQuestWidget` 추가하여 출석 보상 및 미션 상태 시각화.
- [x] **학부모 화면 배너 공간 확보**: `/parent` (학습 리포트) 및 학습지 출력 페이지 하단에 `ParentAdBanner` 컴포넌트 삽입.
- [x] **어뷰징 방지**: `storageManager.js`에서 날짜 문자열 기반으로 자정 초기화 검증 로직 구현.

## 🚀 [Phase 2] 클라우드 동기화 및 구독 모델 (대기)
- [ ] **BaaS 기술 스택 확정**: Supabase vs Firebase 성능 및 가격 정책 비교 (PostgreSQL 기반의 Supabase 우선 검토).
- [ ] **로컬 -> 클라우드 마이그레이션**: 기존 유저가 `localStorage`에 쌓아둔 펫과 코인 데이터를 가입 시 클라우드 계정으로 1회 매핑하는 로직 설계.
- [ ] **프리미엄 페이월(Paywall) 기획**: `Math Petory Plus` 로고 디자인 및 결제 화면 유도 흐름(User Journey) 설계.
