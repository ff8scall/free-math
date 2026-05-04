/**
 * 난수 및 배열 유틸리티
 * 문제 생성 엔진에서 사용할 공통 헬퍼 함수들
 */

export const rand = {
  /**
   * min ~ max 범위의 정수 반환 (끝값 포함)
   */
  int: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

  /**
   * min ~ max 범위의 실수 반환 (소수점 n자리)
   */
  float: (min, max, decimals = 2) => {
    const val = Math.random() * (max - min) + min;
    return Number(val.toFixed(decimals));
  },

  /**
   * 배열에서 랜덤 요소 하나 반환
   */
  pick: (arr) => arr[Math.floor(Math.random() * arr.length)],

  /**
   * 배열에서 n개의 요소를 중복 없이 랜덤 추출
   */
  pickN: (arr, n) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, arr.length));
  },

  /**
   * 배열을 무작위 섞기 (새 배열 반환)
   */
  shuffle: (arr) => [...arr].sort(() => Math.random() - 0.5),

  /**
   * 주어진 범위에서 중복 없는 n개의 정수 반환
   */
  uniqueInts: (min, max, count) => {
    const available = [];
    for (let i = min; i <= max; i++) available.push(i);
    return rand.pickN(available, count);
  },

  /**
   * 0 또는 1 랜덤 반환
   */
  bool: () => Math.random() > 0.5
};

/**
 * 문자열 포맷 유틸리티
 */
export const format = {
  /**
   * 숫자에 천 단위 콤마 추가
   */
  number: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),

  /**
   * 분수 문자열 생성 (분자/분모)
   */
  fraction: (numerator, denominator) => `${numerator}/${denominator}`,

  /**
   * 시간 문자열 생성 (시간:분)
   */
  time: (hour, minute) => `${hour}시 ${minute}분`,

  /**
   * 길이/무게 단위 포맷 (kg/g, m/cm 등)
   */
  unit: (value, unit) => `${value}${unit}`,

  /**
   * 여러 개의 정답을 콤마로 구분 (순서 무관 비교용)
   */
  multiAnswer: (answers) => answers.sort().join(',')
};

/**
 * 수학 유틸리티
 */
export const math = {
  /**
   * 최대공약수 (GCD)
   */
  gcd: (a, b) => b === 0 ? a : math.gcd(b, a % b),

  /**
   * 최소공배수 (LCM)
   */
  lcm: (a, b) => (a * b) / math.gcd(a, b),

  /**
   * n개의 숫자에서 최소공배수 계산
   */
  lcmMultiple: (numbers) => numbers.reduce((acc, curr) => math.lcm(acc, curr), 1),

  /**
   * 배열의 합
   */
  sum: (arr) => arr.reduce((a, b) => a + b, 0),

  /**
   * 배열의 평균
   */
  avg: (arr) => math.sum(arr) / arr.length,

  /**
   * 배열의 최대값
   */
  max: (arr) => Math.max(...arr),

  /**
   * 배열의 최소값
   */
  min: (arr) => Math.min(...arr),

  /**
   * 절대값 차이
   */
  diff: (a, b) => Math.abs(a - b),

  /**
   * 주어진 범위 내에서 랜덤 수 생성 (제외값 지정 가능)
   */
  randomExclude: (min, max, exclude = []) => {
    let num;
    do {
      num = rand.int(min, max);
    } while (exclude.includes(num));
    return num;
  }
};

/**
 * 정답 비교/정규화 유틸리티
 */
export const answer = {
  /**
   * 공백 제거 및 콤마 기준 정렬 (다중 답안 비교용)
   */
  normalize: (val) => val.toString().replace(/\s/g, '').split(',').sort().join(','),

  /**
   * 숫자 비교 (문자열/숫자 혼합 허용)
   */
  equals: (a, b) => {
    const normA = answer.normalize(a);
    const normB = answer.normalize(b);
    return normA === normB;
  },

  /**
   * 분수 비교 (문자열 형태)
   */
  equalsFraction: (a, b) => {
    const parseFrac = (f) => {
      if (!f.includes('/')) return { num: parseInt(f), den: 1 };
      const [num, den] = f.split('/').map(Number);
      return { num, den };
    };
    const fa = parseFrac(a);
    const fb = parseFrac(b);
    return (fa.num * fb.den) === (fb.num * fa.den);
  }
};

/**
 * 문장 생성 유틸리티
 */
export const text = {
  /**
   * 랜덤 이름 반환 (기본 리스트에서)
   */
  name: (names) => rand.pick(names),

  /**
   * 랜덤 물건 반환
   */
  item: (items) => rand.pick(items),

  /**
   * 이름 2개 반환 (중복 없음)
   */
  names: (names) => {
    const n1 = rand.pick(names);
    const n2 = rand.pick(names.filter(n => n !== n1));
    return [n1, n2];
  }
};

/**
 * 검증 유틸리티
 */
export const validate = {
  /**
   * NaN/undefined/Infinity 체크
   */
  isFiniteNumber: (val) => {
    const num = Number(val);
    return typeof num === 'number' && !isNaN(num) && isFinite(num);
  },

  /**
   * 문자열이 비어있지 않은지 체크
   */
  nonEmpty: (str) => str && str.trim().length > 0,

  /**
   * 배열이 비어있지 않은지 체크
   */
  nonEmptyArray: (arr) => Array.isArray(arr) && arr.length > 0,

  /**
   * 정답이 계산 결과와 일치하는지 체크
   */
  answerMatches: (expected, calculated) => {
    const normExp = answer.normalize(expected);
    const normCalc = answer.normalize(calculated);
    return normExp === normCalc;
  }
};
