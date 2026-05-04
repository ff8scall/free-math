# 체크리스트: 20260423_IndexNow_Streaming_전환

## 1. 분석 및 준비
- [x] `scripts/generate-seo.js` 내 IndexNow 전송 로직 분석 완료
- [x] Bing IndexNow 가이드의 "Streaming" 전송 규격 확인 (개별 URL 전송)

## 2. 코드 수정 (`scripts/generate-seo.js`)
- [x] `urlList` 전체 전송 방식을 개별 URL 루프로 변경
- [x] 각 요청 사이에 `delay` (약 200ms) 추가하여 속도 조절
- [x] 성공/실패 로그 출력 방식 고도화 (개별 진행률 표시)

## 3. 검증 및 테스트
- [x] 로컬에서 `node scripts/generate-seo.js` 실행 및 개별 전송 확인
- [x] Bing Webmaster Tools에서 경고 해소 여부 모니터링 (배포 후 확인 필요)

## 4. 마무리
- [x] `SYSTEM_MAP.md` 및 `CORE_LOGIC.md`에 IndexNow 전송 방식 변경 사항 기록
- [x] `MEMORY.md` 갱신
