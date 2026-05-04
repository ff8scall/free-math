/**
 * 5학년 심화 문장제 템플릿 (3개)
 */

export const grade5AdvancedTemplates = [
  {
    id: 'g5-advanced-lcm-gcd',
    grade: 5,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['lcm', 'gcd', 'time'],
    skill: '최소공배수와 최대공약수',
    generate: ({ rand }) => {
      const n1 = rand.pick([6, 8, 12, 15]);
      const n2 = rand.pick([10, 20]);
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const lcm = (n1 * n2) / gcd(n1, n2);
      const hours = 8 + Math.floor(lcm / 60);
      const mins = lcm % 60;
      return {
        q: `어떤 버스 정류장에서 1번 버스는 ${n1}분마다, 2번 버스는 ${n2}분마다 출발합니다. 두 버스가 오전 8시에 동시에 출발했다면, 다음번에 두 버스가 다시 동시에 출발하는 시각은 몇 시 몇 분인가요?`,
        ans: `${hours}시 ${mins}분`,
        hint: '${n1}과 ${n2}의 최소공배수를 구해보세요.',
        exp: `[풀이 과정]\n1. ${n1}과 ${n2}의 최소공배수: ${lcm}분\n2. 8시 + ${lcm}분 = ${hours}시 ${mins}분\n따라서 ${hours}시 ${mins}분입니다.`,
        equation: `${lcm}`,
        answerType: 'text'
      };
    }
  },
  {
    id: 'g5-advanced-fraction-add-sub-diff',
    grade: 5,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['fraction', 'addition', 'subtraction'],
    skill: '분수 덧셈 뺄셈',
    generate: () => {
      return {
        q: `어떤 수에서 1/2을 뺐더니 1/3이 되었습니다. 어떤 수에서 1/4을 더하면 얼마인가요?(분수로 답하세요)`,
        ans: `13/12`,
        hint: '먼저 어떤 수를 구한 다음 1/4을 더해보세요.',
        exp: `[풀이 과정]\n1. 어떤 수 구하기: 1/3 + 1/2 = 2/6 + 3/6 = 5/6\n2. 1/4 더하기: 5/6 + 1/4 = 10/12 + 3/12 = 13/12\n따라서 13/12입니다.`,
        equation: `13/12`,
        answerType: 'text'
      };
    }
  },
  {
    id: 'g5-advanced-average-inference',
    grade: 5,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['average', 'inference'],
    skill: '평균 역계산',
    generate: ({ rand }) => {
      const s1 = rand.int(75, 85);
      const s2 = rand.int(85, 95);
      const s3 = rand.int(80, 90);
      const target = rand.int(85, 95);
      return {
        q: `국어 ${s1}점, 수학 ${s2}점, 영어 ${s3}점을 받았습니다. 네 과목의 평균 점수가 ${target}점이 되려면 사회 점수를 몇 점 받아야 하나요?`,
        ans: String(target * 4 - (s1 + s2 + s3)),
        hint: '네 과목의 총점에서 현재 세 과목의 총점을 빼보세요.',
        exp: `[풀이 과정]\n1. 네 과목 총점: ${target} × 4 = ${target * 4}점\n2. 세 과목 총점: ${s1} + ${s2} + ${s3} = ${s1 + s2 + s3}점\n3. 식: ${target * 4} - ${s1 + s2 + s3} = ${target * 4 - (s1 + s2 + s3)}\n따라서 ${target * 4 - (s1 + s2 + s3)}점입니다.`,
        equation: `${target*4}-(${s1+s2+s3})`,
        answerType: 'number'
      };
    }
  }
];

export default grade5AdvancedTemplates;
