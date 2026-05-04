# 문장형 문제 확장 계획서

> 작성일: 2026-05-04  
> 대상: 매쓰 펫토리 문장제/학습지 시스템  
> 관련 파일: `src/utils/math/wordProblemGenerator.js`, `WordProblemQuiz.jsx`, `WordProblemWorksheet.jsx`, `WordProblemArchitect.jsx`

---

## 1. 결론 요약

현재 사이트의 문장형 문제는 `wordProblemGenerator.js`에서 학년별 `if/else` 분기와 문제 유형 문자열을 직접 관리하는 방식이다. 3학년은 이미 사용자 제공 문제집 기반으로 덧셈/뺄셈/사고력 유형이 많이 보강되어 있으나, 이 구조는 앞으로 문제 유형이 늘어날수록 파일이 비대해지고 유지보수가 어려워진다.

문제집/웹 문제를 그대로 복사해 넣는 방식은 저작권 리스크가 크므로 권장하지 않는다. 대신 **웹·문제집에서 발견한 문제의 “유형, 수학 구조, 난이도, 표현 패턴”만 분석하고, 문장·수치·상황·풀이를 새로 생성하는 템플릿 엔진**으로 전환하는 것이 안전하고 확장성 있는 방향이다.

---

## 2. 저작권/콘텐츠 수집 원칙

### 2-1. 하면 안 되는 것

- 유료/시판 문제집 문항을 그대로 복사
- 웹에 올라온 문제 이미지를 OCR로 추출해 동일 문장으로 반영
- 출처만 붙이고 원문 문항을 대량 수록
- 문제집의 단원별 배열, 제목, 독자적 편집 구성을 그대로 재현

### 2-2. 가능한 것

- 교과 과정의 일반 개념, 성취기준, 흔한 문제 유형을 참고
- 공개 교육자료/공공기관 자료에서 허용 범위 내의 아이디어 참고
- 원문 문장을 쓰지 않고 수학적 구조만 추출
- 새로운 이름, 상황, 수치, 풀이 문장으로 재작성
- 자체 템플릿과 난수 생성으로 사실상 무한 변형 문제 생성

### 2-3. 권장 수집 방식

웹에서 문제를 “가져오는” 것이 아니라 다음 항목만 기록한다.

| 수집 항목 | 예시 |
|---|---|
| 학년 | 3학년 |
| 단원 | 세 자리 수 덧셈과 뺄셈 |
| 문제 구조 | 전체 - 일부 = 나머지 |
| 난이도 | basic |
| 필요한 연산 | 세 자리 수 뺄셈, 받아내림 1회 |
| 오답 유발 포인트 | 읽은 쪽수와 남은 쪽수를 반대로 계산 |
| 템플릿 아이디어 | 책 쪽수, 스티커, 행사 인원 등 |

---

## 3. 현재 구조 진단

### 3-1. 현재 데이터 흐름

```mermaid
flowchart TD
    A[WordProblemQuiz / WordProblemWorksheet] --> B[generateProblemData(gradeNum, difficulty)]
    B --> C{gradeNum 분기}
    C --> D[basicTypes / advancedTypes 배열]
    D --> E[getRandom(type)]
    E --> F[if/else로 문제 생성]
    F --> G[{ q, ans, exp, hint } 반환]
```

### 3-2. 장점

- 단순하고 빠르게 문제 유형 추가 가능
- `WordProblemQuiz`와 `WordProblemWorksheet`가 같은 생성기를 공유
- `q`, `ans`, `exp`, `hint` 반환 구조가 이미 학습/출력에 적합
- 3학년 문제는 기본/심화 유형이 꽤 풍부함

### 3-3. 한계

- `wordProblemGenerator.js`가 549줄로 이미 커짐
- 문제 유형 추가 시 if/else가 계속 증가
- 학년/단원/난이도/개념 태그 검색이 어려움
- 같은 유형의 변형 수를 관리하기 어려움
- 문제 품질 검증, 중복 방지, 난이도 조절이 코드 안에 묻힘
- 문장제 설계소(`WordProblemArchitect`)는 별도 하드코딩 배열을 사용해 생성기와 분리되어 있음

---

## 4. 목표 방향

### 4-1. 핵심 목표

1. **문제 원문 복제가 아닌 유형 템플릿 확장**
2. **3학년 문장형 문제 대폭 강화**
3. **1~6학년 전체로 확장 가능한 구조 설계**
4. **퀴즈/학습지/문장제 설계소가 같은 문제 은행을 공유**
5. **나중에 웹 리서치나 사용자가 제공한 문제집 분석 결과를 쉽게 반영**

### 4-2. 우선순위

| 우선순위 | 범위 | 이유 |
|---|---|---|
| 1 | 3학년 덧셈/뺄셈/나눗셈/곱셈 문장제 | 사용자의 실제 니즈와 기존 데이터가 가장 많음 |
| 2 | 3학년 시간/길이/무게/분수/도형 | 문장제에서 자주 어려워하는 단원 |
| 3 | 문장제 설계소와 통합 | 문제 읽기 → 식 세우기 훈련 강화 |
| 4 | 1~2학년 기초 문해형 문제 보강 | 저학년 유입 대비 |
| 5 | 4~6학년 심화/사고력 확장 | 장기 콘텐츠 자산화 |

---

## 5. 제안 아키텍처

### 5-1. 문제 템플릿 데이터 분리

현재 `wordProblemGenerator.js` 안에 있는 문제 유형을 데이터 파일로 분리한다.

```text
src/data/wordProblems/
  grade1.js
  grade2.js
  grade3.js
  grade4.js
  grade5.js
  grade6.js
  commonContexts.js
src/utils/math/
  wordProblemEngine.js
  wordProblemGenerator.js  // 기존 API 호환 래퍼
```

### 5-2. 템플릿 객체 형태

```js
{
  id: 'g3-addition-total-event-participants',
  grade: 3,
  unit: 'addition-subtraction',
  difficulty: 'basic',
  tags: ['addition', 'three-digit', 'total', 'carry'],
  skill: '세 자리 수 덧셈으로 전체 수 구하기',
  generate: ({ rand, names, items }) => {
    const morning = rand.int(120, 489);
    const afternoon = rand.int(130, 499);
    return {
      q: `오전에 박물관을 방문한 사람은 ${morning}명이고, 오후에는 ${afternoon}명이 방문했습니다. 하루 동안 박물관을 방문한 사람은 모두 몇 명인가요?`,
      ans: String(morning + afternoon),
      hint: '오전 방문자 수와 오후 방문자 수를 더해 보세요.',
      exp: `[풀이 과정]\n1. 오전 방문자: ${morning}명\n2. 오후 방문자: ${afternoon}명\n3. 식: ${morning} + ${afternoon} = ${morning + afternoon}\n따라서 모두 ${morning + afternoon}명입니다.`,
      equation: `${morning}+${afternoon}`,
      answerType: 'number'
    };
  }
}
```

### 5-3. 기존 API 유지

현재 컴포넌트들이 `generateProblemData(gradeNum, difficulty)`를 사용하고 있으므로 외부 API는 그대로 둔다.

```js
export const generateProblemData = (gradeNum, difficulty = 'mixed', options = {}) => {
  return generateFromTemplateBank({ gradeNum, difficulty, ...options });
};
```

이렇게 하면 `WordProblemQuiz.jsx`, `WordProblemWorksheet.jsx`는 큰 수정 없이 동작한다.

---

## 6. 3학년 우선 확장 설계

### 6-1. 3학년 단원별 문제 유형 후보

#### A. 덧셈/뺄셈

| 유형 ID | 구조 | 예시 구조 |
|---|---|---|
| add-total | 부분 + 부분 = 전체 | 오전/오후 방문객 합계 |
| add-compare-increase | 기준 + 증가량 = 결과 | 어제보다 오늘 몇 명 더 많음 |
| sub-remain | 전체 - 사용량 = 남은 양 | 전체 쪽수 - 읽은 쪽수 |
| sub-difference | 큰 수 - 작은 수 = 차 | 두 반의 학생 수 차이 |
| reverse-add | 어떤 수 + a = b | 거꾸로 계산 |
| reverse-sub | 어떤 수 - a = b | 원래 수 찾기 |
| mistake-add-sub | 빼야 할 것을 더함 | 잘못 계산한 결과에서 원래 수 찾기 |
| multi-step-add-sub | 더하고 빼는 2단계 | 산 것 + 받은 것 - 쓴 것 |
| place-value | 자릿값 해석 | 100이 n개, 10이 n개, 1이 n개 |
| number-card | 카드로 수 만들기 | 가장 큰 수/작은 수의 합 또는 차 |

#### B. 곱셈/나눗셈

| 유형 ID | 구조 | 예시 구조 |
|---|---|---|
| multiply-equal-groups | 묶음 수 × 묶음당 개수 | 상자당 연필 수 × 상자 수 |
| multiply-array | 가로 × 세로 배열 | 의자 줄 수와 한 줄 개수 |
| division-share | 전체 ÷ 사람 수 | 똑같이 나누기 |
| division-measure | 전체 ÷ 한 묶음 | 몇 봉지/몇 상자 |
| division-remainder | 전체 ÷ 묶음 + 나머지 | 남는 사탕/필요한 봉지 수 |
| division-check | 나누는 수×몫+나머지 | 어떤 수 찾기 |
| cut-rope | 자른 횟수 + 1 = 도막 수 | 밧줄 자르기 |
| reverse-multiply | 어떤 수 × a = b | 어떤 수 찾기 |

#### C. 시간/길이/무게

| 유형 ID | 구조 | 예시 구조 |
|---|---|---|
| time-after | 시작 시각 + 걸린 시간 | 끝난 시각 구하기 |
| time-before | 끝난 시각 - 걸린 시간 | 시작 시각 구하기 |
| time-duration | 끝난 시각 - 시작 시각 | 걸린 시간 구하기 |
| length-unit-convert | m/cm 변환 후 계산 | 2m 30cm + 45cm |
| length-overlap | 총 길이 - 겹친 길이 | 종이 띠 이어 붙이기 |
| weight-unit-convert | kg/g 변환 후 계산 | 2kg + 450g |
| capacity-unit-convert | L/mL 변환 후 계산 | 물병/컵 용량 |

#### D. 분수/도형/사고력

| 유형 ID | 구조 | 예시 구조 |
|---|---|---|
| fraction-part | 전체의 1/n | 빵 12개의 1/3 |
| fraction-compare | 같은 분모 분수 비교 | 더 큰 분수 찾기 |
| fraction-sum-same-denom | 같은 분모 분수 덧셈 | 2/7 + 3/7 |
| polygon-perimeter | 변의 수 × 한 변 길이 | 정다각형 둘레 |
| shape-count | 변/꼭짓점 수 추론 | 여러 도형 특징 |
| condition-number | 조건을 만족하는 수 | 범위/짝수/홀수 |
| symbol-rule | 기호 규칙 대입 | ☆ 연산 |
| system-sum-diff | 합과 차로 두 수 찾기 | 큰 수/작은 수 |

### 6-2. 목표 수량

1차 구현 목표는 3학년 기준 **최소 60개 템플릿**이다.

| 영역 | 목표 템플릿 수 |
|---|---:|
| 덧셈/뺄셈 | 18개 |
| 곱셈/나눗셈 | 14개 |
| 시간/길이/무게/들이 | 12개 |
| 분수/도형 | 8개 |
| 사고력/규칙/카드 | 8개 |
| 합계 | 60개 |

각 템플릿은 난수 범위와 상황어휘가 달라져 실제 체감 문제 수는 수천 개 이상이 된다.

---

## 7. 웹 자료 활용 방식

### 7-1. 수집 대상

- 교육청/공공기관의 공개 성취기준 문서
- EBS/공개 학습 콘텐츠의 단원 구조
- 블로그/카페/문제집 소개 페이지의 문제 유형 설명
- 무료 공개 학습지 사이트의 목차/유형명
- 국가 교육과정/교과서 단원명

### 7-2. 수집 산출물

웹에서 복사한 문제 원문이 아니라 아래와 같은 “유형 카드”만 만든다.

```md
## 유형 카드: g3-subtraction-remain-pages
- 출처 메모: 3학년 덧셈과 뺄셈 단원에서 흔한 남은 양 문제
- 수학 구조: 전체 - 일부 = 나머지
- 수치 범위: 전체 400~999, 일부 100~399, 결과 양수
- 문장 상황 후보: 책 쪽수, 스티커, 행사 좌석, 저금액
- 오답 유발: 일부를 더하거나, 전체와 일부를 뒤집어 뺌
- 템플릿화 방향: 원문과 무관한 새 문장 3종 작성
```

### 7-3. 자동화 가능성

외부 웹을 직접 크롤링해 문제를 가져오는 자동화는 저작권/이용약관 문제가 있으므로 피한다. 대신 다음 방식은 가능하다.

1. 사람이 참고한 웹 자료에서 “유형명/구조”만 정리
2. AI가 원문과 다른 새 템플릿 초안 생성
3. 수치 범위/정답 검증 로직 자동 테스트
4. 템플릿을 문제 은행에 반영

---

## 8. 품질 검증 전략

### 8-1. 자동 검증

템플릿마다 100회 생성해 다음을 검사한다.

- `q`, `ans`, `exp`, `hint`가 비어 있지 않은가
- 정답이 수식 계산 결과와 일치하는가
- 나눗셈에서 나누어떨어져야 하는 유형은 나머지가 없는가
- 음수 결과가 나오지 않는가
- 단위가 문제/정답/해설에서 일관되는가
- `NaN`, `undefined`, `Infinity`가 포함되지 않는가

### 8-2. 학습 품질 검증

- 한 문제에 요구하는 핵심 개념은 1~2개로 제한
- 저학년 문장은 너무 길지 않게 유지
- 3학년 심화 문제는 “힌트”와 “풀이 과정”을 반드시 제공
- 정답 입력 형식이 복잡한 문제는 `answerType`을 지정
- 여러 답이 가능한 문제는 정답 normalize 로직 보강

---

## 9. 구현 단계 계획

### Phase 1. 구조 개편 준비

- `wordProblemGenerator.js`의 현재 API를 유지하면서 내부를 엔진/데이터 분리 구조로 전환
- `src/data/wordProblems/` 디렉터리 생성
- 공통 유틸(`rand.int`, `pick`, `shuffle`, `format`) 생성
- 기존 1~6학년 문제를 우선 그대로 이식하거나, 3학년부터 새 구조로 분리

### Phase 2. 3학년 템플릿 확장

- 3학년 문제 유형 목록을 단원별로 정의
- 덧셈/뺄셈 18개 템플릿 우선 추가
- 곱셈/나눗셈 14개 추가
- 시간/길이/무게/들이 12개 추가
- 분수/도형/사고력 16개 추가
- `basic`, `advanced`, `mixed` 선택이 균형 있게 동작하도록 가중치 조정

### Phase 3. 문장제 설계소 통합

- `WordProblemArchitect.jsx`의 하드코딩 문제 3개를 문제 은행 기반으로 교체
- 템플릿 반환값에 `numbers`, `operation`, `equation` 필드 추가
- 숫자 추출, 식 세우기, 정답 체크를 더 안정적으로 개선

### Phase 4. 학습지 UX 개선

- 학습지 문제 수 선택: 6/10/20문제
- 단원 선택: 덧셈/뺄셈, 곱셈/나눗셈, 시간/길이/무게, 사고력
- 정답지에 “풀이 과정” 포함 여부 선택
- 같은 유형이 연속으로 과도하게 나오지 않도록 중복 방지

### Phase 5. 자동 테스트 추가

- `scripts/validate-word-problems.js` 작성
- 학년/난이도별 100~500회 생성 테스트
- `npm run validate:word-problems` 스크립트 추가
- 빌드 전 검증 옵션 고려

---

## 10. 작업 전 검토 포인트

진행 전 결정이 필요한 항목은 다음과 같다.

1. **우선 학년**: 3학년부터 집중 확장할지, 1~6학년을 고르게 보강할지
2. **문제 수 목표**: 3학년 60개 템플릿을 1차 목표로 할지
3. **문제집 참고 방식**: 사용자가 가진 문제집은 원문 복사가 아니라 유형/구조만 반영하는 방식으로 진행할지
4. **UI 확장 범위**: 이번에는 생성기만 바꿀지, 학습지 단원 선택 UI까지 바꿀지
5. **검증 스크립트**: 이번 작업에 자동 검증까지 포함할지

---

## 11. 권장 진행안

가장 안전하고 효과적인 진행안은 다음과 같다.

1. **3학년 문장제 중심으로 시작**
2. **원문 복제 금지, 유형 템플릿화 방식 채택**
3. **기존 `generateProblemData` API는 유지**하여 화면 수정 최소화
4. **새 데이터 구조 도입**으로 앞으로 문제 유형을 파일별로 쉽게 추가
5. **3학년 60개 템플릿 + 검증 스크립트**를 1차 목표로 구현
6. 이후 사용자 검토 후 1~2학년 또는 4~6학년으로 확장

---

## 12. 예상 수정 파일

| 파일 | 작업 |
|---|---|
| `src/utils/math/wordProblemGenerator.js` | 기존 API 유지 래퍼로 정리 또는 일부 구조 개편 |
| `src/utils/math/wordProblemEngine.js` | 신규 생성 엔진 추가 |
| `src/data/wordProblems/grade3.js` | 3학년 템플릿 대량 추가 |
| `src/data/wordProblems/commonContexts.js` | 이름/물건/상황 어휘 분리 |
| `src/components/math/WordProblemWorksheet.jsx` | 선택적으로 단원/문제 수 UI 추가 |
| `src/components/math/WordProblemQuiz.jsx` | 선택적으로 단원 필터 추가 |
| `src/components/math/grade3/WordProblemArchitect.jsx` | 선택적으로 문제 은행 통합 |
| `scripts/validate-word-problems.js` | 신규 자동 검증 스크립트 |
| `package.json` | 검증 스크립트 추가 |

---

## 13. 최종 권고

사용자의 목적이 “딸 문제집처럼 실제로 도움이 되는 문장형 문제를 많이 만드는 것”이라면, 문제를 많이 복사하는 방식보다 **문제집에서 반복되는 사고 구조를 추출해 자체 생성기로 만드는 것**이 훨씬 낫다. 이 방식은 저작권 리스크를 줄이면서도, 한 번 만든 템플릿이 난수와 상황어휘를 바꿔 수백~수천 개의 변형 문제를 만들 수 있다.

따라서 다음 작업은 “3학년 문장제 템플릿 은행 1차 구축”으로 진행하는 것을 추천한다.
