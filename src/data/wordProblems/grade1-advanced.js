/**
 * 1학년 심화 문장제 템플릿 (5개)
 */

export const grade1AdvancedTemplates = [
  {
    id: 'g1-advanced-number-condition',
    grade: 1,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['condition', 'number', 'even-odd'],
    skill: '조건을 만족하는 수 찾기',
    generate: ({ rand }) => {
      const base = rand.int(2, 5);
      const limit = base + rand.int(3, 5); // 최소 3 차이를 두어 항상 답이 나오도록
      const isEven = rand.bool();
      let possible = [];
      for (let i = base + 1; i < limit; i++) {
        if (isEven && i % 2 === 0) possible.push(i);
        if (!isEven && i % 2 !== 0) possible.push(i);
      }
      // 답이 없으면 기본값 제공
      if (possible.length === 0) {
        possible = [isEven ? base + 2 : base + 1];
      }
      return {
        q: `1부터 9까지의 수 중에서 ${base}보다 크고 ${limit}보다 작은 ${isEven ? '짝수' : '홀수'}는 무엇인가요?`,
        ans: possible.join(', '),
        hint: `${base}보다 크고 ${limit}보다 작은 수를 먼저 나열해보세요.`,
        exp: `[풀이 과정]\n1. ${base}보다 크고 ${limit}보다 작은 수: (${Array.from({ length: limit - base - 1 }, (_, i) => base + 1 + i).join(', ')})\n2. 이 중 ${isEven ? '짝수' : '홀수'}: ${possible.join(', ')}\n따라서 정답은 ${possible.join(', ')}입니다.`,
        equation: possible.join(','),
        answerType: 'multi'
      };
    }
  },
  {
    id: 'g1-advanced-order-logic',
    grade: 1,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['logic', 'order', 'comparison'],
    skill: '순서 논리로 문제 풀기',
    generate: ({ rand, NAMES }) => {
      const pos1 = rand.int(2, 4);
      const pos2 = rand.int(pos1 + 1, pos1 + 3);
      const name1 = rand.pick(NAMES);
      const name2 = rand.pick(NAMES.filter(n => n !== name1));
      return {
        q: `${name1}는 줄에서 앞에서 ${pos1}번째, ${name2}는 ${pos2}번째에 서 있습니다. ${name2}는 ${name1}보다 몇 명 뒤에 있나요?`,
        ans: String(pos2 - pos1),
        hint: '뒤에 있는 번째에서 앞에 있는 번째를 빼보세요.',
        exp: `[풀이 과정]\n1. ${name1}: ${pos1}번째\n2. ${name2}: ${pos2}번째\n3. 식: ${pos2} - ${pos1} = ${pos2 - pos1}\n따라서 ${pos2 - pos1}명 뒤에 있습니다.`,
        equation: `${pos2}-${pos1}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g1-advanced-reverse-calc',
    grade: 1,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['reverse', 'calculation'],
    skill: '거꾸로 계산하기',
    generate: ({ rand, NAMES, ITEMS }) => {
      const name = rand.pick(NAMES);
      const item = rand.pick(ITEMS);
      const result = rand.int(5, 15);
      const added = rand.int(2, 5);
      const original = result - added;
      return {
        q: `${name}가 ${item}를 몇 개 가지고 있었는데, ${added}개를 더 받았더니 ${result}개가 되었습니다. 처음에는 ${item}를 몇 개 가지고 있었나요?`,
        ans: String(original),
        hint: '결과에서 더받은 것을 빼보세요.',
        exp: `[풀이 과정]\n1. 결과: ${result}개\n2. 더받은 것: ${added}개\n3. 식: ${result} - ${added} = ${original}\n따라서 처음에는 ${original}개 가지고 있었습니다.`,
        equation: `${result}-${added}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g1-advanced-comparison-logic',
    grade: 1,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['comparison', 'logic', 'transitive'],
    skill: '비교 논리 (A>B, B>C → A가 가장 큼)',
    generate: ({ rand, NAMES, ITEMS }) => {
      const name1 = rand.pick(NAMES);
      const name2 = rand.pick(NAMES.filter(n => n !== name1));
      const name3 = rand.pick(NAMES.filter(n => n !== name1 && n !== name2));
      const item = rand.pick(ITEMS);
      const n3 = rand.int(5, 8);
      const diff1 = rand.int(2, 4);
      const diff2 = rand.int(2, 4);
      const n2 = n3 + diff1;
      const n1 = n2 + diff2;
      return {
        q: `${name1}는 ${name2}보다 ${item}를 ${diff2}개 더 많이 가지고 있고, ${name2}는 ${name3}보다 ${item}를 ${diff1}개 더 많이 가지고 있습니다. 누가 ${item}를 가장 많이 가지고 있나요?`,
        ans: name1,
        hint: 'A가 B보다 많고, B가 C보다 많으면 누가 제일 많을까요?',
        exp: `[풀이 과정]\n1. ${name2} > ${name3} (${diff1}개 더 많음)\n2. ${name1} > ${name2} (${diff2}개 더 많음)\n3. 따라서 ${name1} > ${name2} > ${name3}\n정답은 ${name1}입니다.`,
        equation: name1,
        answerType: 'text'
      };
    }
  },
  {
    id: 'g1-advanced-shape-logic',
    grade: 1,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['shape', 'logic', 'pattern'],
    skill: '도형 논리',
    generate: ({ rand }) => {
      const shapes = ['△', '○', '□', '☆'];
      const patternLength = rand.int(3, 4);
      const pattern = [];
      for (let i = 0; i < patternLength; i++) {
        pattern.push(rand.pick(shapes));
      }
      const nextIndex = rand.int(0, patternLength - 1);
      return {
        q: `도형들이 규칙적으로 반복됩니다: ${pattern.join(' ')}. 이 규칙에 따라 다음에 올 도형은 무엇인가요?`,
        ans: pattern[nextIndex],
        hint: '도형이 어떤 순서로 반복되는지 찾아보세요.',
        exp: `[풀이 과정]\n1. 규칙: ${pattern.join(' ')} 반복\n2. 다음 순서: ${pattern[nextIndex]}\n따라서 정답은 ${pattern[nextIndex]}입니다.`,
        equation: pattern[nextIndex],
        answerType: 'text'
      };
    }
  }
];

export default grade1AdvancedTemplates;
