/**
 * 1학년 기본 문장제 템플릿 (4개)
 */

export const grade1BasicTemplates = [
  {
    id: 'g1-addition-total',
    grade: 1,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['addition', 'total'],
    skill: '덧셈 총합 구하기',
    generate: ({ rand, NAMES, ITEMS }) => {
      const name1 = rand.pick(NAMES);
      const name2 = rand.pick(NAMES.filter(n => n !== name1));
      const item = rand.pick(ITEMS);
      const n1 = rand.int(1, 9);
      const n2 = rand.int(1, 9);
      return {
        q: `${name1}는 ${item}를 ${n1}개 가지고 있고, ${name2}는 ${item}를 ${n2}개 가지고 있습니다. 두 사람이 가진 ${item}는 모두 몇 개인가요?`,
        ans: String(n1 + n2),
        hint: '두 사람이 가진 것을 모두 더해보세요.',
        exp: `[풀이 과정]\n1. ${name1}: ${n1}개\n2. ${name2}: ${n2}개\n3. 식: ${n1} + ${n2} = ${n1 + n2}\n따라서 모두 ${n1 + n2}개입니다.`,
        equation: `${n1}+${n2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g1-subtraction-remain',
    grade: 1,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['subtraction', 'remain'],
    skill: '뺄셈 잔여 구하기',
    generate: ({ rand, NAMES, ITEMS }) => {
      const name = rand.pick(NAMES);
      const item = rand.pick(ITEMS);
      const n1 = rand.int(10, 17);
      const n2 = rand.int(1, 9);
      return {
        q: `바구니에 ${item}가 ${n1}개 있었습니다. 그중에서 ${name}가 ${n2}개를 먹었습니다. 남은 ${item}는 몇 개인가요?`,
        ans: String(n1 - n2),
        hint: '전체에서 먹은 만큼 빼보세요.',
        exp: `[풀이 과정]\n1. 전체: ${n1}개\n2. 먹은 양: ${n2}개\n3. 식: ${n1} - ${n2} = ${n1 - n2}\n따라서 ${n1 - n2}개 남았습니다.`,
        equation: `${n1}-${n2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g1-comparison',
    grade: 1,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['comparison', 'difference'],
    skill: '비교하여 차이 구하기',
    generate: ({ rand, NAMES, ITEMS }) => {
      const name1 = rand.pick(NAMES);
      const name2 = rand.pick(NAMES.filter(n => n !== name1));
      const item = rand.pick(ITEMS);
      const n1 = rand.int(10, 14);
      const n2 = rand.int(5, 9);
      const diff = Math.abs(n1 - n2);
      const winner = n1 > n2 ? name1 : name2;
      return {
        q: `${name1}는 ${item}를 ${n1}개, ${name2}는 ${item}를 ${n2}개 가지고 있습니다. 누가 몇 개 더 많이 가지고 있나요?`,
        ans: String(diff),
        hint: '큰 수에서 작은 수를 빼보세요.',
        exp: `[풀이 과정]\n1. ${name1}: ${n1}개\n2. ${name2}: ${n2}개\n3. 식: ${Math.max(n1, n2)} - ${Math.min(n1, n2)} = ${diff}\n따라서 ${winner}가 ${diff}개 더 많습니다.`,
        equation: `${Math.max(n1, n2)}-${Math.min(n1, n2)}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g1-sequence',
    grade: 1,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['sequence', 'order'],
    skill: '순서와 앞 사람 수 구하기',
    generate: ({ rand, NAMES }) => {
      const name = rand.pick(NAMES);
      const pos = rand.int(2, 6);
      return {
        q: `줄을 서 있는 사람들 중에서 ${name}는 앞에서 ${pos}번째에 서 있습니다. ${name}의 앞에 서 있는 사람은 몇 명인가요?`,
        ans: String(pos - 1),
        hint: '번째 수에서 1을 빼보세요.',
        exp: `[풀이 과정]\n1. ${name}는 ${pos}번째\n2. 앞에 있는 사람 = 번째 - 1\n3. 식: ${pos} - 1 = ${pos - 1}\n따라서 ${pos - 1}명입니다.`,
        equation: `${pos}-1`,
        answerType: 'number'
      };
    }
  }
];

export default grade1BasicTemplates;
