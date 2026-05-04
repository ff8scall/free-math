/**
 * 6학년 기본 문장제 템플릿 (2개)
 */

export const grade6BasicTemplates = [
  {
    id: 'g6-circle-area-combined',
    grade: 6,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['circle', 'area'],
    skill: '원의 넓이 구하기',
    generate: ({ rand }) => {
      const r = rand.int(5, 15);
      const pi = 3.14;
      return {
        q: `반지름이 ${r}cm인 원의 넓이는 몇 cm²인가요? (원주율: ${pi})`,
        ans: String(r * r * pi),
        hint: '반지름 × 반지름 × 원주율 공식을 사용하세요.',
        exp: `[풀이 과정]\n1. 반지름: ${r}cm\n2. 원주율: ${pi}\n3. 식: ${r} × ${r} × ${pi} = ${r * r * pi}\n따라서 ${r * r * pi}cm²입니다.`,
        equation: `${r}×${r}×${pi}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g6-ratio-word-problem',
    grade: 6,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['ratio'],
    skill: '비 구하기',
    generate: ({ rand }) => {
      const total = rand.int(25, 35);
      const girls = rand.int(10, 18);
      const boys = total - girls;
      return {
        q: `우리 반 학생 ${total}명 중 여학생이 ${girls}명입니다. 우리 반 남학생 수에 대한 여학생 수의 비를 구하세요. (정답 예 : 12:18)`,
        ans: `${girls}:${boys}`,
        hint: '남학생 수를 먼저 구한 다음 비를 나타내보세요.',
        exp: `[풀이 과정]\n1. 전체: ${total}명\n2. 여학생: ${girls}명\n3. 남학생: ${total} - ${girls} = ${boys}명\n4. 비: ${girls}:${boys}\n따라서 ${girls}:${boys}입니다.`,
        equation: `${girls}:${boys}`,
        answerType: 'text'
      };
    }
  }
];

export default grade6BasicTemplates;
