/**
 * 4학년 심화 문장제 템플릿 (5개)
 */

export const grade4AdvancedTemplates = [
  {
    id: 'g4-advanced-large-num-condition',
    grade: 4,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['large-number', 'card'],
    skill: '큰 수 조건 문제',
    generate: ({ rand }) => {
      const count = 5;
      let cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5).slice(0, count);
      cards.sort((a, b) => b - a);
      const maxVal = parseInt(cards.join(''));
      cards.sort((a, b) => a - b);
      if (cards[0] === 0) {
        [cards[0], cards[1]] = [cards[1], cards[0]];
      }
      const minVal = parseInt(cards.join(''));
      return {
        q: `숫자 카드 (${cards.sort().join(', ')})를 한 번씩만 사용하여 만들 수 있는 가장 큰 ${count}자리 수와 가장 작은 ${count}자리 수의 합은 얼마인가요?`,
        ans: String(maxVal + minVal),
        hint: '가장 큰 수는 큰 순서로, 가장 작은 수는 작은 순서로 배열해보세요.',
        exp: `[풀이 과정]\n1. 가장 큰 수: ${maxVal}\n2. 가장 작은 수: ${minVal}\n3. 식: ${maxVal} + ${minVal} = ${maxVal + minVal}\n따라서 합은 ${maxVal + minVal}입니다.`,
        equation: `${maxVal}+${minVal}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g4-advanced-fraction-add-sub-card',
    grade: 4,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['fraction', 'comparison'],
    skill: '분수 비교 문제',
    generate: ({ rand }) => {
      const denom = rand.int(7, 10);
      const n1 = rand.int(1, 3);
      const n2 = rand.int(n1 + 2, denom - 1);
      return {
        q: `분모가 ${denom}인 진분수 중에서 ${n1}/${denom}보다 크고 ${n2}/${denom}보다 작은 분수는 모두 몇 개인가요?`,
        ans: String(n2 - n1 - 1),
        hint: '분모가 같은 분수는 분자가 클수록 큽니다.',
        exp: `[풀이 과정]\n1. ${n1}/${denom}보다 크고 ${n2}/${denom}보다 작은 분수: ${n1 + 1}/${denom}, ..., ${n2 - 1}/${denom}\n2. 개수: ${n2 - 1} - (${n1 + 1}) + 1 = ${n2 - n1 - 1}개\n따라서 ${n2 - n1 - 1}개입니다.`,
        equation: `${n2 - n1 - 1}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g4-advanced-decimal-add-sub-puzzle',
    grade: 4,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['decimal', 'addition'],
    skill: '소수 더하기 문제',
    generate: ({ rand }) => {
      const d1 = parseFloat((Math.random() * 2 + 1).toFixed(2));
      const d2 = parseFloat((Math.random() * 1 + 0.5).toFixed(2));
      const any = d1 + 0.45;
      const result = (any + d1).toFixed(2);
      return {
        q: `어떤 수에 ${d1}을 더했더니 ${d2}가 되어야 하는데 잘못하여 뺐더니 결과가 0.45가 되었습니다. 바르게 계산하면 얼마인가요?`,
        ans: result,
        hint: '먼저 어떤 수를 구한 다음, 다시 더해보세요.',
        exp: `[풀이 과정]\n1. 어떤 수 구하기: 0.45 + ${d1} = ${any}\n2. 바른 계산: ${any} + ${d1} = ${result}\n따라서 ${result}입니다.`,
        equation: `${any}+${d1}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g4-advanced-clock-hand-angle',
    grade: 4,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['clock', 'angle'],
    skill: '시계 각도 계산',
    generate: ({ rand }) => {
      const h = rand.pick([3, 4, 9]);
      return {
        q: `${h}시 정각에 시침과 분침이 이루는 각도 중 작은 쪽은 몇 도인가요?`,
        ans: String(h * 30),
        hint: '시계의 숫자 한 칸(5분)마다 30도입니다.',
        exp: `[풀이 과정]\n1. 시계의 숫자 한 칸 = 30°\n2. ${h}시 = ${h}칸\n3. 식: 30° × ${h} = ${h * 30}°\n따라서 ${h * 30}도입니다.`,
        equation: `30×${h}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g4-advanced-polygon-angle-logic',
    grade: 4,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['polygon', 'angle'],
    skill: '다각형 내각의 합',
    generate: ({ rand }) => {
      const n = rand.pick([4, 5, 6]);
      return {
        q: `삼각형 ${n - 2}개로 나눌 수 있는 다각형의 모든 내각의 합은 몇 도인가요? (이 다각형은 ${n}각형입니다)`,
        ans: String((n - 2) * 180),
        hint: '삼각형 하나의 내각의 합은 180도입니다.',
        exp: `[풀이 과정]\n1. 삼각형 하나의 내각의 합: 180°\n2. 삼각형 개수: ${n - 2}개\n3. 식: 180° × ${n - 2} = ${(n - 2) * 180}°\n따라서 ${(n - 2) * 180}도입니다.`,
        equation: `180×${n-2}`,
        answerType: 'number'
      };
    }
  }
];

export default grade4AdvancedTemplates;
