/**
 * 문장형 문제 생성용 공통 컨텍스트 데이터
 * 이름, 물건, 상황 등을 분리하여 관리
 */

export const NAMES = [
  '철수', '영희', '민수', '지수', '수지', '민아', '도겸', '호시', '민호', '유진', 
  '서준', '하은', '도윤', '채원', '사쿠라', '카즈하', '지아', '우진', '소윤', '준우', 
  '예은', '하니', '민지', '혜인'
];

export const ITEMS = [
  '사과', '포도', '구슬', '장난감', '딱지', '사탕', '연필', '지우개', '스티커', 
  '초콜릿', '쿠키', '빵', '우유', '주스', '과자', '젤리', '마카롱', '캔디'
];

// 덧셈/뺄셈 상황어휘
export const ADDITION_CONTEXTS = [
  '박물관 방문객', '도서관 이용자', '공원 놀이터 아이들', '수영장 이용객',
  '영화관 관객', '버스 승객', '기차 승객', '비행기 승객',
  '학교 학생', '학급 학생', '동아리 회원', '반 친구'
];

export const SUBTRACTION_CONTEXTS = [
  '책 쪽수', '스티커', '연필', '지우개', '공책',
  '캔디', '과자', '젤리', '쿠키', '초콜릿',
  '장난감', '구슬', '딱지', '카드'
];

// 곱셈 상황어휘
export const MULTIPLICATION_CONTEXTS = [
  { item: '연필', container: '타', unit: '자루' },
  { item: '사탕', container: '봉지', unit: '개' },
  { item: '과자', container: '상자', unit: '봉지' },
  { item: '젤리', container: '봉지', unit: '개' },
  { item: '장난감', container: '상자', unit: '개' },
  { item: '스티커', container: '시트', unit: '장' },
  { item: '공책', container: '묶음', unit: '권' },
  { item: '연필심', container: '상자', unit: '개' }
];

// 나눗셈 상황어휘
export const DIVISION_CONTEXTS = [
  { item: '사탕', people: '친구' },
  { item: '과자', people: '동생들' },
  { item: '젤리', people: '학급 친구' },
  { item: '캔디', people: '아이들' },
  { item: '장난감', people: '동네 친구' },
  { item: '스티커', people: '반 친구' },
  { item: '연필', people: '학생들' },
  { item: '공책', people: '학생들' }
];

// 시간 관련 상황
export const TIME_CONTEXTS = [
  { event: '만화 영화', start: '오전 9시 30분', duration: 60 },
  { event: '공부', start: '오전 8시', duration: 45 },
  { event: '운동', start: '오후 3시', duration: 30 },
  { event: '독서', start: '오후 2시', duration: 50 },
  { event: '피아노 연습', start: '오전 10시', duration: 40 }
];

// 길이 관련 상황
export const LENGTH_CONTEXTS = [
  { item: '연필', unit: 'cm' },
  { item: '자', unit: 'cm' },
  { item: '줄', unit: 'cm' },
  { item: '리본', unit: 'cm' },
  { item: '끈', unit: 'cm' },
  { item: '밧줄', unit: 'cm' },
  { item: '종이 띠', unit: 'cm' }
];

// 무게 관련 상황
export const WEIGHT_CONTEXTS = [
  { item: '사과', unit: 'g' },
  { item: '감자', unit: 'g' },
  { item: '당근', unit: 'g' },
  { item: '오렌지', unit: 'g' },
  { item: '포도', unit: 'g' },
  { item: '상자', unit: 'g' },
  { item: '가방', unit: 'g' }
];

// 분수 관련 상황
export const FRACTION_CONTEXTS = [
  { item: '빵', total: 12 },
  { item: '피자', total: 8 },
  { item: '케이크', total: 16 },
  { item: '초콜릿', total: 20 },
  { item: '스티커', total: 15 }
];

// 도형 관련 상황
export const SHAPE_CONTEXTS = [
  { shape: '정삼각형', sides: 3 },
  { shape: '정사각형', sides: 4 },
  { shape: '정오각형', sides: 5 },
  { shape: '정육각형', sides: 6 }
];

// 사고력/논리 상황
export const LOGIC_CONTEXTS = [
  { type: '순서', description: '줄 서기' },
  { type: '비교', description: '크기 비교' },
  { type: '거꾸로 계산', description: '역연산' },
  { type: '규칙', description: '패턴 찾기' },
  { type: '조건', description: '조건 만족' }
];

// 장소
export const PLACES = [
  '박물관', '도서관', '공원', '수영장', '영화관',
  '학교', '학급', '동아리실', '체육관', '음악실'
];

export default {
  NAMES,
  ITEMS,
  ADDITION_CONTEXTS,
  SUBTRACTION_CONTEXTS,
  MULTIPLICATION_CONTEXTS,
  DIVISION_CONTEXTS,
  TIME_CONTEXTS,
  LENGTH_CONTEXTS,
  WEIGHT_CONTEXTS,
  FRACTION_CONTEXTS,
  SHAPE_CONTEXTS,
  LOGIC_CONTEXTS,
  PLACES
};
