/**
 * 3학년 분수/도형 문장제 템플릿 (8개)
 */

export const grade3FractionShapeTemplates = [
  {
    id: 'g3-fraction-part',
    grade: 3,
    unit: 'fraction-shape',
    difficulty: 'basic',
    tags: ['fraction', 'part'],
    skill: '전체의 일부 구하기',
    generate: ({ rand, FRACTION_CONTEXTS }) => {
      const ctx = rand.pick(FRACTION_CONTEXTS);
      const denom = rand.pick([2, 3, 4, 6, 8, 12]);
      const count = ctx.total / denom;
      return {
        q: `맛있는 ${ctx.item} ${ctx.total}개가 있습니다.\n그중에서 1/${denom}을 먹었습니다.\n먹은 ${ctx.item}는 몇 개인가요?`,
        ans: String(count),
        hint: '전체 개수를 분모만큼 등분한 것 중 하나를 생각해보세요.',
        exp: `[풀이 과정]\n1. 전체 ${ctx.item}: ${ctx.total}개\n2. 1/${denom}은 전체를 ${denom}으로 나눈 것 중 1만큼\n3. 식: ${ctx.total} ÷ ${denom} = ${count}\n따라서 먹은 ${ctx.item}는 ${count}개입니다.`,
        equation: `${ctx.total}/${denom}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-fraction-compare',
    grade: 3,
    unit: 'fraction-shape',
    difficulty: 'basic',
    tags: ['fraction', 'compare'],
    skill: '같은 분모 분수 비교',
    generate: ({ rand, FRACTION_CONTEXTS }) => {
      const ctx = rand.pick(FRACTION_CONTEXTS);
      const denom = rand.pick([4, 6, 8, 12]);
      const n1 = rand.int(1, Math.floor(denom / 2));
      const n2 = rand.int(n1 + 1, denom - 1);
      return {
        q: `${ctx.item} ${ctx.total}개 중에서 ${n1}/${denom}과 ${n2}/${denom} 중 어느 쪽이 더 많은 개수인가요?`,
        ans: `${n2}/${denom}`,
        hint: '분모가 같으면 분자가 더 큰 쪽이 더 큽니다.',
        exp: `[풀이 과정]\n1. ${n1}/${denom} = ${ctx.total} ÷ ${denom} × ${n1} = ${ctx.total / denom * n1}개\n2. ${n2}/${denom} = ${ctx.total} ÷ ${denom} × ${n2} = ${ctx.total / denom * n2}개\n3. ${ctx.total / denom * n2} > ${ctx.total / denom * n1}이므로 ${n2}/${denom}이 더 많습니다.`,
        equation: `${n2}/${denom}`,
        answerType: 'fraction'
      };
    }
  },
  {
    id: 'g3-fraction-sum-same-denom',
    grade: 3,
    unit: 'fraction-shape',
    difficulty: 'basic',
    tags: ['fraction', 'addition', 'same-denominator'],
    skill: '같은 분모 분수 덧셈',
    generate: ({ rand }) => {
      const denom = rand.pick([4, 5, 6, 7, 8, 9]);
      const n1 = rand.int(1, denom - 2);
      const n2 = rand.int(1, denom - n1 - 1);
      const sum = n1 + n2;
      return {
        q: `전체를 ${denom}으로 똑같이 나눈 것 중 ${n1}만큼과 ${n2}만큼을 더하면 전체의 얼마가 되나요? (분수로 답하세요)`,
        ans: `${sum}/${denom}`,
        hint: '분모는 그대로 두고 분자끼리 더해 보세요.',
        exp: `[풀이 과정]\n1. 식: ${n1}/${denom} + ${n2}/${denom}\n2. 분모는 ${denom}으로 같으므로 분자끼리 더함\n3. 식: (${n1} + ${n2})/${denom} = ${sum}/${denom}\n따라서 정답은 ${sum}/${denom}입니다.`,
        equation: `${n1}/${denom}+${n2}/${denom}`,
        answerType: 'fraction'
      };
    }
  },
  {
    id: 'g3-fraction-sub-same-denom',
    grade: 3,
    unit: 'fraction-shape',
    difficulty: 'basic',
    tags: ['fraction', 'subtraction', 'same-denominator'],
    skill: '같은 분모 분수 뺄셈',
    generate: ({ rand, FRACTION_CONTEXTS }) => {
      const ctx = rand.pick(FRACTION_CONTEXTS);
      const denom = rand.pick([4, 6, 8, 12]);
      const totalPart = rand.int(2, 4);
      const eatenPart = rand.int(1, totalPart - 1);
      const remainPart = totalPart - eatenPart;
      return {
        q: `${ctx.item} ${ctx.total}개의 ${totalPart}/${denom}을 먹었습니다. 남은 것은 전체의 얼마인가요? (분수로 답하세요)`,
        ans: `${remainPart}/${denom}`,
        hint: '분모는 그대로 두고 분자끼리 빼보세요.',
        exp: `[풀이 과정]\n1. 전체: ${denom}/${denom}\n2. 먹은 것: ${eatenPart}/${denom}\n3. 식: ${denom}/${denom} - ${eatenPart}/${denom} = ${remainPart}/${denom}\n따라서 남은 것은 ${remainPart}/${denom}입니다.`,
        equation: `${denom}/${denom}-${eatenPart}/${denom}`,
        answerType: 'fraction'
      };
    }
  },
  {
    id: 'g3-polygon-perimeter',
    grade: 3,
    unit: 'fraction-shape',
    difficulty: 'basic',
    tags: ['polygon', 'perimeter', 'multiplication'],
    skill: '정다각형 둘레 구하기',
    generate: ({ rand, SHAPE_CONTEXTS }) => {
      const ctx = rand.pick(SHAPE_CONTEXTS);
      const sideLen = rand.int(5, 15);
      const perimeter = sideLen * ctx.sides;
      return {
        q: `한 변의 길이가 ${sideLen}cm인 정${ctx.sides}각형의 모든 변의 길이의 합은 몇 cm인가요?`,
        ans: String(perimeter),
        hint: `정${ctx.sides}각형은 변이 ${ctx.sides}개이고 길이는 모두 같아요.`,
        exp: `[풀이 과정]\n1. 한 변의 길이: ${sideLen}cm\n2. 변의 개수: ${ctx.sides}개\n3. 식: ${sideLen} × ${ctx.sides} = ${perimeter}\n따라서 둘레는 ${perimeter}cm입니다.`,
        equation: `${sideLen}*${ctx.sides}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-shape-count-vertices',
    grade: 3,
    unit: 'fraction-shape',
    difficulty: 'basic',
    tags: ['polygon', 'vertices'],
    skill: '도형의 꼭짓점 수 세기',
    generate: ({ rand, SHAPE_CONTEXTS }) => {
      const ctx = rand.pick(SHAPE_CONTEXTS);
      const vertices = ctx.sides;
      return {
        q: `정${ctx.sides}각형의 꼭짓점은 모두 몇 개인가요?`,
        ans: String(vertices),
        hint: '꼭짓점의 개수는 변의 개수와 같습니다.',
        exp: `[풀이 과정]\n정${ctx.sides}각형은 ${ctx.sides}개의 변을 가지므로, 꼭짓점도 ${vertices}개입니다.`,
        equation: `${vertices}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-shape-triangle-angles',
    grade: 3,
    unit: 'fraction-shape',
    difficulty: 'advanced',
    tags: ['triangle', 'angle', 'sum'],
    skill: '삼각형의 세 각의 합 이용',
    generate: ({ rand }) => {
      const angle1 = rand.int(40, 80);
      const angle2 = rand.int(30, 60);
      const angle3 = 180 - angle1 - angle2;
      return {
        q: `삼각형의 두 각이 각각 ${angle1}도, ${angle2}도일 때, 나머지 한 각은 몇 도인가요?`,
        ans: String(angle3),
        hint: '삼각형의 세 각의 합은 180도입니다.',
        exp: `[풀이 과정]\n1. 삼각형의 세 각의 합 = 180도\n2. 식: 180 - (${angle1} + ${angle2})\n3. 계산: 180 - ${angle1 + angle2} = ${angle3}\n따라서 나머지 각은 ${angle3}도입니다.`,
        equation: `180-(${angle1}+${angle2})`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-shape-rectangle-area',
    grade: 3,
    unit: 'fraction-shape',
    difficulty: 'advanced',
    tags: ['rectangle', 'area', 'multiplication'],
    skill: '직사각형 넓이 구하기',
    generate: ({ rand }) => {
      const width = rand.int(5, 12);
      const height = rand.int(3, 10);
      const area = width * height;
      return {
        q: `가로가 ${width}cm, 세로가 ${height}cm인 직사각형의 넓이는 몇 cm²인가요?`,
        ans: String(area),
        hint: '직사각형의 넓이는 가로 × 세로입니다.',
        exp: `[풀이 과정]\n1. 가로: ${width}cm\n2. 세로: ${height}cm\n3. 식: ${width} × ${height} = ${area}\n따라서 넓이는 ${area}cm²입니다.`,
        equation: `${width}*${height}`,
        answerType: 'number'
      };
    }
  }
];

export default grade3FractionShapeTemplates;
