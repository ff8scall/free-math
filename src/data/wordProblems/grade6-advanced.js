/**
 * 6학년 심화 문장제 템플릿 (3개)
 */

export const grade6AdvancedTemplates = [
  {
    id: 'g6-advanced-ratio-percent',
    grade: 6,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['ratio', 'percent'],
    skill: '비율과 퍼센트',
    generate: ({ rand }) => {
      const price = rand.pick([20000, 25000, 30000, 35000]);
      const rate = rand.pick([10, 15, 20, 25]);
      return {
        q: `정가가 ${price}원인 옷을 ${rate}% 할인하여 팔고 있습니다. 이 옷의 할인된 가격은 얼마인가요?`,
        ans: String(price * (100 - rate) / 100),
        hint: '할인된 가격은 정가에서 할인액을 뺀 가격입니다.',
        exp: `[풀이 과정]\n1. 정가: ${price}원\n2. 할인율: ${rate}%\n3. 할인액: ${price} × ${rate}/100 = ${price * rate / 100}원\n4. 할인된 가격: ${price} - ${price * rate / 100} = ${price * (100 - rate) / 100}원\n따라서 ${price * (100 - rate) / 100}원입니다.`,
        equation: `${price}-${price*rate/100}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g6-ratio-distribution-logic',
    grade: 6,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['ratio', 'distribution'],
    skill: '비율 분배',
    generate: ({ rand }) => {
      const total = rand.pick([1000, 1200, 1500]);
      const r1 = rand.pick([2, 3, 4]);
      const r2 = rand.pick([1, 2, 3]);
      return {
        q: `사탕 ${total}개를 형과 동생이 ${r1}:${r2}의 비율로 나누어 가졌습니다. 형이 가진 사탕은 몇 개인가요?`,
        ans: String(total * r1 / (r1 + r2)),
        hint: '전체를 비율의 합으로 나눈 뒤, 형의 비율을 곱하세요.',
        exp: `[풀이 과정]\n1. 전체: ${total}개\n2. 비율: ${r1}:${r2}\n3. 비율의 합: ${r1} + ${r2} = ${r1 + r2}\n4. 형의 몫: ${total} × ${r1}/${r1 + r2} = ${total * r1 / (r1 + r2)}개\n따라서 ${total * r1 / (r1 + r2)}개입니다.`,
        equation: `${total}×${r1}/${r1+r2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g6-surface-area-logic',
    grade: 6,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['surface-area', 'rectangular-prism'],
    skill: '직육면체 겉넓이',
    generate: ({ rand }) => {
      const a = rand.int(3, 7);
      const b = rand.int(3, 6);
      const c = rand.int(2, 5);
      return {
        q: `가로 ${a}cm, 세로 ${b}cm, 높이 ${c}cm인 직육면체의 겉넓이는 몇 cm²인가요?`,
        ans: String(2 * (a * b + b * c + c * a)),
        hint: '겉넓이 = 2 × (가로×세로 + 세로×높이 + 높이×가로) 공식을 사용하세요.',
        exp: `[풀이 과정]\n1. 가로: ${a}cm, 세로: ${b}cm, 높이: ${c}cm\n2. 식: 2 × (${a}×${b} + ${b}×${c} + ${c}×${a})\n3. = 2 × (${a * b} + ${b * c} + ${c * a})\n4. = ${2 * (a * b + b * c + c * a)}cm²\n따라서 ${2 * (a * b + b * c + c * a)}cm²입니다.`,
        equation: `2×(${a*b}+${b*c}+${c*a})`,
        answerType: 'number'
      };
    }
  }
];

export default grade6AdvancedTemplates;
