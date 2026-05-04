/**
 * 3학년 곱셈/나눗셈 문장제 템플릿 (14개)
 */

export const grade3MultiplicationDivisionTemplates = [
  {
    id: 'g3-multiply-equal-groups',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['multiplication', 'equal-groups'],
    skill: '똑같은 묶음의 개수 구하기',
    generate: ({ rand, MULTIPLICATION_CONTEXTS }) => {
      const ctx = rand.pick(MULTIPLICATION_CONTEXTS);
      const perContainer = rand.int(3, 9);
      const containers = rand.int(3, 8);
      const total = perContainer * containers;
      return {
        q: `한 ${ctx.container}에 ${ctx.item}가 ${perContainer}${ctx.unit}씩 들어 있습니다. 이런 ${ctx.container}가 ${containers}${ctx.container} 있다면 ${ctx.item}는 모두 몇 ${ctx.unit}인가요?`,
        ans: String(total),
        hint: '한 ${ctx.container}에 든 개수와 ${ctx.container} 수를 곱해보세요.',
        exp: `[풀이 과정]\n1. 한 ${ctx.container}: ${perContainer}${ctx.unit}\n2. ${ctx.container} 수: ${containers}${ctx.container}\n3. 식: ${perContainer} × ${containers} = ${total}\n따라서 모두 ${total}${ctx.unit}입니다.`,
        equation: `${perContainer}*${containers}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-multiply-array',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['multiplication', 'array'],
    skill: '가로×세로 배열의 총개수 구하기',
    generate: ({ rand }) => {
      const rows = rand.int(4, 9);
      const cols = rand.int(3, 7);
      const total = rows * cols;
      return {
        q: `의자를 가로 ${rows}줄, 세로 ${cols}줄로 배치했습니다. 의자는 모두 몇 개인가요?`,
        ans: String(total),
        hint: '가로 줄 수와 세로 줄 수를 곱해보세요.',
        exp: `[풀이 과정]\n1. 가로: ${rows}줄\n2. 세로: ${cols}줄\n3. 식: ${rows} × ${cols} = ${total}\n따라서 의자는 모두 ${total}개입니다.`,
        equation: `${rows}*${cols}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-division-share',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['division', 'share'],
    skill: '똑같이 나누어 갖기',
    generate: ({ rand, DIVISION_CONTEXTS }) => {
      const ctx = rand.pick(DIVISION_CONTEXTS);
      const perPerson = rand.int(3, 9);
      const people = rand.int(2, 7);
      const total = perPerson * people;
      return {
        q: `${ctx.item} ${total}${ctx.unit}를 ${people}${ctx.people}에게\n똑같이 나누어 주려고 합니다.\n한 ${ctx.people}에게 몇 ${ctx.unit}씩 줄 수 있을까요?`,
        ans: String(perPerson),
        hint: '전체 개수를 사람 수로 나누어 보세요.',
        exp: `[풀이 과정]\n1. 전체: ${total}${ctx.unit}\n2. ${ctx.people} 수: ${people}${ctx.people}\n3. 식: ${total} ÷ ${people} = ${perPerson}\n따라서 한 ${ctx.people}당 ${perPerson}${ctx.unit}씩입니다.`,
        equation: `${total}/${people}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-division-measure',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['division', 'measure'],
    skill: '몇 묶음인지 구하기',
    generate: ({ rand, MULTIPLICATION_CONTEXTS }) => {
      const ctx = rand.pick(MULTIPLICATION_CONTEXTS);
      const perContainer = rand.int(4, 9);
      const containers = rand.int(3, 7);
      const total = perContainer * containers;
      return {
        q: `${ctx.item}가 ${total}${ctx.unit} 있습니다. 한 ${ctx.container}에 ${perContainer}${ctx.unit}씩 담는다면, 모두 몇 ${ctx.container}가 필요한가요?`,
        ans: String(containers),
        hint: '전체 개수를 한 ${ctx.container}에 담는 개수로 나누어 보세요.',
        exp: `[풀이 과정]\n1. 전체: ${total}${ctx.unit}\n2. 한 ${ctx.container}: ${perContainer}${ctx.unit}\n3. 식: ${total} ÷ ${perContainer} = ${containers}\n따라서 ${containers}${ctx.container}가 필요합니다.`,
        equation: `${total}/${perContainer}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-division-remainder',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'advanced',
    tags: ['division', 'remainder'],
    skill: '나눗셈의 몫과 나머지 구하기',
    generate: ({ rand, DIVISION_CONTEXTS }) => {
      const divisor = rand.int(3, 7);
      const quotient = rand.int(5, 12);
      const remainder = rand.int(1, divisor - 1);
      const dividend = divisor * quotient + remainder;
      const ctx = rand.pick(DIVISION_CONTEXTS);
      return {
        q: `${ctx.item} ${dividend}${ctx.unit}를 ${divisor}${ctx.people}에게 똑같이 나누어 주려고 합니다. 한 ${ctx.people}는 몇 ${ctx.unit}씩 가지고, 몇 ${ctx.unit}가 남나요? (정답 예: 5, 2)`,
        ans: `${quotient},${remainder}`,
        hint: '나눗셈을 해서 몫과 나머지를 구해보세요.',
        exp: `[풀이 과정]\n1. 식: ${dividend} ÷ ${divisor} = ${quotient} ... ${remainder}\n2. 몫: ${quotient}${ctx.unit}\n3. 나머지: ${remainder}${ctx.unit}\n따라서 한 ${ctx.people}당 ${quotient}${ctx.unit}씩, ${remainder}${ctx.unit}가 남습니다.`,
        equation: `${dividend}/${divisor}`,
        answerType: 'multi'
      };
    }
  },
  {
    id: 'g3-division-check',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'advanced',
    tags: ['division', 'reverse', 'check'],
    skill: '검산식으로 어떤 수 찾기',
    generate: ({ rand }) => {
      const divisor = rand.int(4, 8);
      const quotient = rand.int(5, 15);
      const remainder = rand.int(1, divisor - 1);
      const dividend = divisor * quotient + remainder;
      return {
        q: `어떤 수를 ${divisor}로 나누었더니 몫이 ${quotient}이고 나머지가 ${remainder}였습니다. 어떤 수는 얼마인가요?`,
        ans: String(dividend),
        hint: '검산식(나누는 수×몫+나머지)을 이용해 보세요.',
        exp: `[풀이 과정]\n1. 식: ${divisor} × ${quotient} + ${remainder}\n2. 계산: ${divisor * quotient} + ${remainder} = ${dividend}\n따라서 어떤 수는 ${dividend}입니다.`,
        equation: `${divisor}*${quotient}+${remainder}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-cut-rope',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'advanced',
    tags: ['division', 'cut', 'logic'],
    skill: '자른 횟수와 도막 수의 관계',
    generate: ({ rand }) => {
      const cuts = rand.int(3, 6);
      const perPiece = rand.int(10, 25);
      const totalLen = cuts * perPiece + perPiece;
      return {
        q: `길이가 ${totalLen}cm인 긴 밧줄을 똑같은 길이로\n${cuts}번 잘랐습니다. 잘린 밧줄 한 도막의 길이는\n몇 cm가 될까요?`,
        ans: String(perPiece),
        hint: '밧줄을 자르면 생기는 도막의 수는 자른 횟수보다 1 많아요.',
        exp: `[풀이 과정]\n1. 자른 횟수: ${cuts}번\n2. 생기는 도막: ${cuts + 1}개\n3. 식: ${totalLen} ÷ ${cuts + 1} = ${perPiece}\n따라서 한 도막의 길이는 ${perPiece}cm입니다.`,
        equation: `${totalLen}/${cuts + 1}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-reverse-multiply',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'advanced',
    tags: ['reverse', 'multiplication'],
    skill: '거꾸로 계산하여 원래 수 찾기 (곱셈)',
    generate: ({ rand }) => {
      const any = rand.int(5, 12);
      const multiplier = rand.int(3, 9);
      const result = any * multiplier;
      const newMultiplier = rand.int(4, 8);
      const newResult = any * newMultiplier;
      return {
        q: `어떤 수에 ${multiplier}을 곱했더니 ${result}이 되었습니다. 이 어떤 수에 ${newMultiplier}를 곱하면 얼마인가요?`,
        ans: String(newResult),
        hint: '어떤 수를 먼저 구한 뒤 새로운 수를 곱해보세요.',
        exp: `[풀이 과정]\n1. 어떤 수: ${result} ÷ ${multiplier} = ${any}\n2. 새로운 계산: ${any} × ${newMultiplier} = ${newResult}\n따라서 정답은 ${newResult}입니다.`,
        equation: `${any}*${newMultiplier}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-multiplication-puzzle',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'advanced',
    tags: ['multiplication', 'puzzle', 'digit'],
    skill: '빈칸에 들어갈 숫자 찾기',
    generate: ({ rand }) => {
      const digit = rand.int(2, 8);
      const multiplier = rand.pick([3, 4, 6, 7, 8, 9]);
      const result = (digit * 10 + 6) * multiplier;
      return {
        q: `□ 6 × ${multiplier} = ${result}\n일 때, □ 안에 들어갈 숫자를 구하세요.`,
        ans: String(digit),
        hint: '결과값(${result})을 ${multiplier}로 나누어 보거나 수의 범위를 생각해보세요.',
        exp: `[풀이 과정]\n1. □6 = ${result} ÷ ${multiplier} = ${digit * 10 + 6}\n2. □자리에 있는 숫자는 ${digit}입니다.`,
        equation: `(${digit}6)*${multiplier}=${result}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-division-container-needed',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['division', 'container'],
    skill: '필요한 용기 수 구하기',
    generate: ({ rand, MULTIPLICATION_CONTEXTS }) => {
      const ctx = rand.pick(MULTIPLICATION_CONTEXTS);
      const perContainer = rand.int(5, 9);
      const containers = rand.int(4, 8);
      const total = perContainer * containers;
      return {
        q: `${ctx.item}가 ${total}${ctx.unit} 있습니다. 한 ${ctx.container}에 ${perContainer}${ctx.unit}씩 담으려면 몇 ${ctx.container}가 필요한가요?`,
        ans: String(containers),
        hint: '전체 개수를 한 ${ctx.container}에 담는 개수로 나누어 보세요.',
        exp: `[풀이 과정]\n1. 전체: ${total}${ctx.unit}\n2. 한 ${ctx.container}: ${perContainer}${ctx.unit}\n3. 식: ${total} ÷ ${perContainer} = ${containers}\n따라서 ${containers}${ctx.container}가 필요합니다.`,
        equation: `${total}/${perContainer}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-multiply-by-10-100',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['multiplication', 'place-value'],
    skill: '10이나 100을 곱하기',
    generate: ({ rand }) => {
      const base = rand.int(3, 15);
      const multiplier = rand.pick([10, 100]);
      const result = base * multiplier;
      return {
        q: `${base}에 ${multiplier}을 곱하면 얼마인가요?`,
        ans: String(result),
        hint: '10을 곱하면 0 하나를, 100을 곱하면 0 두 개를 붙이면 됩니다.',
        exp: `[풀이 과정]\n식: ${base} × ${multiplier} = ${result}\n따라서 정답은 ${result}입니다.`,
        equation: `${base}*${multiplier}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-division-by-10-100',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['division', 'place-value'],
    skill: '10이나 100으로 나누기',
    generate: ({ rand }) => {
      const multiplier = rand.pick([10, 100]);
      const result = rand.int(3, 25);
      const base = result * multiplier;
      return {
        q: `${base}을 ${multiplier}으로 나누면 얼마인가요?`,
        ans: String(result),
        hint: '10으로 나누면 0 하나를, 100으로 나누면 0 두 개를 지우면 됩니다.',
        exp: `[풀이 과정]\n식: ${base} ÷ ${multiplier} = ${result}\n따라서 정답은 ${result}입니다.`,
        equation: `${base}/${multiplier}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-multiplication-word-problem',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['multiplication', 'word'],
    skill: '일상 상황 곱셈 문제',
    generate: ({ rand, NAMES, ITEMS }) => {
      const daily = rand.int(3, 8);
      const days = rand.int(5, 10);
      const total = daily * days;
      const name = rand.pick(NAMES);
      const item = rand.pick(ITEMS);
      return {
        q: `${name}는 매일 ${item}를 ${daily}개씩 먹습니다. ${days}일 동안 ${name}는 ${item}를 모두 몇 개 먹나요?`,
        ans: String(total),
        hint: '하루에 먹는 개수와 날짜 수를 곱해보세요.',
        exp: `[풀이 과정]\n1. 하루: ${daily}개\n2. 날짜: ${days}일\n3. 식: ${daily} × ${days} = ${total}\n따라서 모두 ${total}개입니다.`,
        equation: `${daily}*${days}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-division-word-problem',
    grade: 3,
    unit: 'multiplication-division',
    difficulty: 'basic',
    tags: ['division', 'word'],
    skill: '일상 상황 나눗셈 문제',
    generate: ({ rand, NAMES, DIVISION_CONTEXTS }) => {
      const ctx = rand.pick(DIVISION_CONTEXTS);
      const perPerson = rand.int(4, 9);
      const people = rand.int(3, 7);
      const total = perPerson * people;
      const name = rand.pick(NAMES);
      return {
        q: `${name}는 ${ctx.item} ${total}${ctx.unit}를 가지고 있습니다. ${name}가 이를 ${people}${ctx.people}에게 똑같이 나누어 주면 한 ${ctx.people}는 몇 ${ctx.unit}씩 받나요?`,
        ans: String(perPerson),
        hint: '전체 개수를 사람 수로 나누어 보세요.',
        exp: `[풀이 과정]\n1. 전체: ${total}${ctx.unit}\n2. ${ctx.people} 수: ${people}${ctx.people}\n3. 식: ${total} ÷ ${people} = ${perPerson}\n따라서 한 ${ctx.people}당 ${perPerson}${ctx.unit}입니다.`,
        equation: `${total}/${people}`,
        answerType: 'number'
      };
    }
  }
];

export default grade3MultiplicationDivisionTemplates;
