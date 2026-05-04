/**
 * 5학년 기본 문장제 템플릿 (2개)
 */

export const grade5BasicTemplates = [
  {
    id: 'g5-shape-area-logic',
    grade: 5,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['area', 'trapezoid'],
    skill: '사다리꼴 넓이 구하기',
    generate: ({ rand }) => {
      const h = rand.int(6, 10);
      const b1 = rand.int(8, 12);
      const b2 = rand.int(4, 7);
      return {
        q: `윗변이 ${b2}cm, 아랫변이 ${b1}cm, 높이가 ${h}cm인 사다리꼴의 넓이는 몇 cm²인가요?`,
        ans: String((b1 + b2) * h / 2),
        hint: '(윗변 + 아랫변) × 높이 ÷ 2 공식을 사용하세요.',
        exp: `[풀이 과정]\n1. 윗변: ${b2}cm\n2. 아랫변: ${b1}cm\n3. 높이: ${h}cm\n4. 식: (${b2} + ${b1}) × ${h} ÷ 2 = ${(b1 + b2) * h / 2}cm²\n따라서 ${(b1 + b2) * h / 2}cm²입니다.`,
        equation: `(${b1}+${b2})×${h}÷2`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g5-mixed-calc-puzzle',
    grade: 5,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['calculation', 'reverse'],
    skill: '거꾸로 계산하기',
    generate: ({ rand }) => {
      const v1 = rand.int(10, 29);
      const v2 = rand.int(5, 14);
      const v3 = 2;
      const result = (v1 + v2) * v3;
      return {
        q: `( ${v1} + ( ) ) × ${v3} = ${result} 입니다. ( ) 안에 알맞은 수를 구하세요.`,
        ans: String(v2),
        hint: '거꾸로 계산해보세요.',
        exp: `[풀이 과정]\n1. 결과: ${result}\n2. 식: ( ${v1} + ( ) ) × ${v3} = ${result}\n3. 거꾸로: ${result} ÷ ${v3} - ${v1} = ${v2}\n따라서 ${v2}입니다.`,
        equation: `${result}÷${v3}-${v1}`,
        answerType: 'number'
      };
    }
  }
];

export default grade5BasicTemplates;
