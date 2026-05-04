/**
 * 3학년 사고력/규칙/카드 문장제 템플릿 (8개)
 */

export const grade3LogicCardTemplates = [
  {
    id: 'g3-custom-op',
    grade: 3,
    unit: 'logic-card',
    difficulty: 'advanced',
    tags: ['custom-operation', 'logic'],
    skill: '새로운 기호 규칙 이해하기',
    generate: ({ rand }) => {
      const sym = rand.pick(['☆', '☁', '☘', '☼', '☽']);
      const sub = rand.int(100, 199);
      const n1 = rand.int(200, 399);
      const n2 = rand.int(200, 399);
      return {
        q: `어떤 기호 ${sym}에 대하여\nㄱ${sym}ㄴ = ㄱ + ㄴ - ${sub}\n라고 할 때, ${n1}${sym}${n2}의 값을 구하세요.`,
        ans: String(n1 + n2 - sub),
        hint: '제시된 규칙에 따라 숫자들을 대입해 보세요.',
        exp: `[풀이 과정]\n1. 규칙: 첫 번째 수와 두 번째 수를 더한 뒤 ${sub}를 뺌\n2. 식: ${n1} + ${n2} - ${sub}\n3. 계산: ${n1 + n2} - ${sub} = ${n1 + n2 - sub}\n따라서 정답은 ${n1 + n2 - sub}입니다.`,
        equation: `${n1}+${n2}-${sub}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-symbol-sum',
    grade: 3,
    unit: 'logic-card',
    difficulty: 'advanced',
    tags: ['symbol', 'system'],
    skill: '기호의 합과 차로 값 찾기',
    generate: ({ rand }) => {
      const s1 = rand.pick(['★', '♥', '●']);
      const s2 = rand.pick(['◆', '▲', '♣']);
      const v1 = rand.int(300, 499);
      const add1 = rand.int(200, 299);
      const sum1 = v1 + add1;
      const v2 = rand.int(50, 199);
      const diff = v1 - v2;
      return {
        q: `${s1} + ${add1} = ${sum1},\n${s1} - ${s2} = ${diff}\n일 때, ${s1}과 ${s2}의 합을 구하세요.`,
        ans: String(v1 + v2),
        hint: '첫 번째 식에서 먼저 기호 하나의 값을 구해보세요.',
        exp: `[풀이 과정]\n1. ${s1} 구하기: ${sum1} - ${add1} = ${v1}\n2. ${s2} 구하기: ${v1} - ${s2} = ${diff} → ${s2} = ${v1} - ${diff} = ${v2}\n3. 식: ${v1} + ${v2} = ${v1 + v2}\n따라서 정답은 ${v1 + v2}입니다.`,
        equation: `${v1}+${v2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-torn-paper',
    grade: 3,
    unit: 'logic-card',
    difficulty: 'advanced',
    tags: ['logic', 'digit'],
    skill: '찢어진 종이의 숫자 찾기',
    generate: ({ rand }) => {
      const num1 = rand.int(500, 799);
      const diff = rand.int(150, 299);
      const num2 = num1 - diff;
      return {
        q: `세 자리 수가 적힌 종이 2장 중 한 장이\n찢어져서 일의 자리 숫자만 보입니다.\n두 수의 차가 ${diff}일 때,\n찢어진 종이에 적힌 세 자리 수를 구하세요.\n(보이는 종이: ${num1}, 찢어진 종이의 끝자리: ${num2 % 10})`,
        ans: String(num2),
        hint: '두 수의 차를 이용하여 "큰 수 - 차" 또는 "작은 수 + 차"를 생각해보세요.',
        exp: `[풀이 과정]\n1. 보이는 수: ${num1}\n2. 차이: ${diff}\n3. 찢어진 수는 ${num1} - ${diff} = ${num2} (또는 ${num1} + ${diff})\n4. 끝자리가 ${num2 % 10}인 것은 ${num2}\n따라서 찢어진 종이의 수는 ${num2}입니다.`,
        equation: `${num1}-${diff}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-max-expr',
    grade: 3,
    unit: 'logic-card',
    difficulty: 'advanced',
    tags: ['logic', 'max', 'expression'],
    skill: '주어진 수로 최대 식 만들기',
    generate: ({ rand }) => {
      const ns = rand.uniqueInts(100, 799, 3);
      ns.sort((a, b) => b - a);
      return {
        q: `주어진 수(${ns.join(', ')})를 모두 사용하여\n□ + □ - □\n의 결과가 가장 크게 될 때의 값을 구하세요.`,
        ans: String(ns[0] + ns[1] - ns[2]),
        hint: '가장 큰 수 두 개를 더하고, 가장 작은 수를 빼보세요.',
        exp: `[풀이 과정]\n1. 결과가 가장 크려면 큰 수들끼리 더해야 함\n2. 식: ${ns[0]} + ${ns[1]} - ${ns[2]}\n3. 계산: ${ns[0] + ns[1]} - ${ns[2]} = ${ns[0] + ns[1] - ns[2]}\n따라서 정답은 ${ns[0] + ns[1] - ns[2]}입니다.`,
        equation: `${ns[0]}+${ns[1]}-${ns[2]}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-inequality-max',
    grade: 3,
    unit: 'logic-card',
    difficulty: 'advanced',
    tags: ['inequality', 'max'],
    skill: '부등식을 만족하는 최대 자연수',
    generate: ({ rand }) => {
      const n1 = rand.int(500, 699);
      const n2 = rand.int(100, 199);
      const n3 = rand.int(100, 199);
      const limit = n1 - (n2 + n3);
      const maxVal = limit - 1;
      return {
        q: `${n1} - □ > ${n2} + ${n3}\n을 만족하는 가장 큰 자연수 □를 구하세요.`,
        ans: String(maxVal),
        hint: '오른쪽 식의 합을 먼저 구한 뒤, □가 얼마보다 작아야 하는지 생각해보세요.',
        exp: `[풀이 과정]\n1. 우변 계산: ${n2} + ${n3} = ${n2 + n3}\n2. 식 정리: ${n1} - □ > ${n2 + n3}\n3. □ < ${n1} - ${n2 + n3} = ${limit}\n4. □는 ${limit}보다 작아야 하므로 최댓값은 ${maxVal}입니다.`,
        equation: `${maxVal}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-system-sub-add',
    grade: 3,
    unit: 'logic-card',
    difficulty: 'advanced',
    tags: ['system', 'sum-diff'],
    skill: '합과 차로 두 수 찾기',
    generate: ({ rand }) => {
      const v2 = rand.int(150, 249);
      const diff = rand.int(100, 199);
      const v1 = v2 + diff;
      const sum = v1 + v2;
      const useNames = rand.bool();
      if (useNames) {
        const item1 = rand.pick(['야구공', '축구공', '농구공']);
        const item2 = '탁구공';
        return {
          q: `${item1}은 ${item2}보다 ${diff}개 더 많고\n합계는 ${sum}개입니다.\n각각 몇 개씩인가요? (정답 예: 400, 264)`,
          ans: `${v1},${v2}`,
          hint: '합계에서 차이를 빼면 똑같은 것 두 묶음이 된다고 생각해보세요.',
          exp: `[풀이 과정]\n1. 차이 제거: ${sum} - ${diff} = ${sum - diff}\n2. 나누기: ${sum - diff} ÷ 2 = ${v2} (작은 쪽인 ${item2})\n3. 큰 쪽 구하기: ${v2} + ${diff} = ${v1} (큰 쪽인 ${item1})\n따라서 ${v1}, ${v2}입니다.`,
          equation: `${v1},${v2}`,
          answerType: 'multi'
        };
      } else {
        return {
          q: `나 = 가 - ${diff},\n가 + 나 = ${sum}\n일 때 가와 나의 값을 구하세요. (정답 예: 400, 257)`,
          ans: `${v1},${v2}`,
          hint: '나를 (가 - ${diff})로 생각해서 합계 식에 넣어보세요.',
          exp: `[풀이 과정]\n1. 대입식: 가 + (가 - ${diff}) = ${sum}\n2. 정리: 2 × 가 = ${sum} + ${diff} = ${sum + diff}\n3. 계산: 가 = ${v1}, 나 = ${v1} - ${diff} = ${v2}\n따라서 가=${v1}, 나=${v2}입니다.`,
          equation: `${v1},${v2}`,
          answerType: 'multi'
        };
      }
    }
  },
  {
    id: 'g3-number-condition',
    grade: 3,
    unit: 'logic-card',
    difficulty: 'advanced',
    tags: ['condition', 'number'],
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
    id: 'g3-approx-target-sum',
    grade: 3,
    unit: 'logic-card',
    difficulty: 'advanced',
    tags: ['approximation', 'target'],
    skill: '목표에 가장 가까운 수 찾기',
    generate: ({ rand }) => {
      const base = rand.int(100, 399);
      const target = base > 500 ? 1000 : 800;
      const diff = target - base;
      let bestVal = -1, minGap = 9999;
      for (let h = 1; h <= 9; h++) {
        for (let du = 0; du <= 9; du++) {
          const v = h * 100 + du * 11;
          const gap = Math.abs(diff - v);
          if (gap < minGap) {
            minGap = gap;
            bestVal = v;
          }
        }
      }
      return {
        q: `□는 십의 자리와 일의 자리가 같은 세 자리 수입니다.\n${base} + □ 가 ${target}에\n가장 가깝게 될 때 □를 구하세요.`,
        ans: String(bestVal),
        hint: '먼저 target에서 base를 뺀 값을 구하고, 그 값에 가장 가까운 "XXY" 형태의 수를 찾아보세요.',
        exp: `[풀이 과정]\n1. 목표 차이: ${target} - ${base} = ${diff}\n2. 조건: 십의 자리와 일의 자리가 같은 세 자리 수 중 ${diff}에 가장 가까운 수\n3. 결과: ${bestVal}입니다.`,
        equation: `${bestVal}`,
        answerType: 'number'
      };
    }
  }
];

export default grade3LogicCardTemplates;
