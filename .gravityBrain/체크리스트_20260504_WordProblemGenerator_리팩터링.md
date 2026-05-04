# ✅ 체크리스트: 문장제 생성기 리팩터링 (2026-05-04)

## 작업 개요
3학년 문장제 생성을 템플릿 기반 엔진으로 리팩터링하여 유지보수성과 확장성을 개선

## 완료된 작업
- [x] wordProblemEngine.js 생성: 템플릿 기반 문제 생성 엔진 구현
- [x] problemUtils.js 생성: 공통 유틸리티 함수 (rand.int, pick, shuffle, format 등)
- [x] commonContexts.js 생성: 이름/물건/상황 어휘 분리
- [x] grade3-addition-subtraction.js 생성: 덧셈/뺄셈 템플릿 17개
- [x] grade3-multiplication-division.js 생성: 곱셈/나눗셈 템플릿 14개
- [x] grade3-time-length-weight.js 생성: 시간/길이/무게 템플릿 12개
- [x] grade3-fraction-shape.js 생성: 분수/도형 템플릿 8개
- [x] grade3-logic-card.js 생성: 사고력/규칙/카드 템플릿 8개
- [x] grade3.js 생성: 메인 파일에서 모든 템플릿 통합
- [x] wordProblemGenerator.js 리팩터링: 3학년 부분만 새 엔진 호출로 변경, 기존 API 유지
- [x] validate-word-problems.js 생성: 자동 검증 스크립트 구현
- [x] package.json에 검증 스크립트 등록
- [x] 검증 실행: 59개 템플릿 100% 통과
- [x] 버그 수정: grade3-logic-card.js 구문 오류 수정
- [x] 버그 수정: g3-subtraction-compare-more 초기화 순서 문제 수정
- [x] 호환성 테스트: WordProblemQuiz, WordProblemWorksheet 동작 확인

## 검증 결과
- 전체 템플릿: 59개
- 통과: 59개 (100%)
- 실패: 0개
- 경고: 2개 (식과 정답 불일치 - 필수 아님)

## 추가된 파일
- `src/utils/math/wordProblemEngine.js`
- `src/utils/math/problemUtils.js`
- `src/data/wordProblems/commonContexts.js`
- `src/data/wordProblems/grade3-addition-subtraction.js`
- `src/data/wordProblems/grade3-multiplication-division.js`
- `src/data/wordProblems/grade3-time-length-weight.js`
- `src/data/wordProblems/grade3-fraction-shape.js`
- `src/data/wordProblems/grade3-logic-card.js`
- `src/data/wordProblems/grade3.js`
- `validate-word-problems.js`

## 수정된 파일
- `src/utils/math/wordProblemGenerator.js` (3학년 부분 리팩터링)
- `package.json` (검증 스크립트 추가)

## 사용 방법
```bash
npm run validate-word-problems
```

## 다음 단계
- 다른 학년(4~6학년)도 템플릿 기반으로 마이그레이션 고려
- 템플릿 확장성을 위한 추가 유틸리티 함수 개발
