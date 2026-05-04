/**
 * 4학년 기본 문장제 템플릿 (1개)
 */

export const grade4BasicTemplates = [
  {
    id: 'g4-angle-sum-puzzle',
    grade: 4,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['angle', 'triangle'],
    skill: '삼각형의 각의 합',
    generate: ({ rand }) => {
      const a1 = rand.int(30, 59);
      const a2 = rand.int(60, 89);
      const sum = a1 + a2;
      return {
        q: `삼각형의 두 각이 각각 ${a1}도, ${a2}도일 때, 나머지 한 각은 몇 도인가요?`,
        ans: String(180 - sum),
        hint: '삼각형의 세 각의 합은 180도입니다.',
        exp: `[풀이 과정]\n1. 두 각의 합: ${a1}° + ${a2}° = ${sum}°\n2. 나머지 각: 180° - ${sum}° = ${180 - sum}°\n따라서 나머지 각은 ${180 - sum}도입니다.`,
        equation: `180-${sum}`,
        answerType: 'number'
      };
    }
  }
];

export default grade4BasicTemplates;
