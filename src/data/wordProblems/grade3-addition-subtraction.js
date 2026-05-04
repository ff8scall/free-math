/**
 * 3학년 덧셈/뺄셈 문장제 템플릿 (18개)
 */

export const grade3AdditionSubtractionTemplates = [
  {
    id: 'g3-addition-total-event-participants',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['addition', 'three-digit', 'total', 'carry'],
    skill: '세 자리 수 덧셈으로 전체 수 구하기',
    generate: ({ rand, NAMES, ADDITION_CONTEXTS }) => {
      const morning = rand.int(120, 489);
      const afternoon = rand.int(130, 499);
      const place = rand.pick(ADDITION_CONTEXTS);
      return {
        q: `오전에 ${place}는 ${morning}명이고, 오후에는 ${afternoon}명이 있었습니다. 하루 동안 ${place}는 모두 몇 명인가요?`,
        ans: String(morning + afternoon),
        hint: '오전과 오후의 수를 더해보세요.',
        exp: `[풀이 과정]\n1. 오전: ${morning}명\n2. 오후: ${afternoon}명\n3. 식: ${morning} + ${afternoon} = ${morning + afternoon}\n따라서 모두 ${morning + afternoon}명입니다.`,
        equation: `${morning}+${afternoon}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-addition-compare-increase',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['addition', 'three-digit', 'increase', 'compare'],
    skill: '어제보다 오늘 증가한 수 구하기',
    generate: ({ rand, NAMES, ITEMS }) => {
      const yesterday = rand.int(250, 599);
      const increase = rand.int(50, 199);
      const today = yesterday + increase;
      const name = rand.pick(NAMES);
      const item = rand.pick(ITEMS);
      return {
        q: `${name}는 어제 ${item}를 ${yesterday}개 가지고 있었습니다. 오늘 ${increase}개를 더 샀습니다. ${name}는 이제 ${item}를 모두 몇 개 가지고 있나요?`,
        ans: String(today),
        hint: '어제의 개수에 오늘 산 개수를 더해보세요.',
        exp: `[풀이 과정]\n1. 어제: ${yesterday}개\n2. 오늘 산 것: ${increase}개\n3. 식: ${yesterday} + ${increase} = ${today}\n따라서 모두 ${today}개입니다.`,
        equation: `${yesterday}+${increase}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-subtraction-remain-pages',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['subtraction', 'three-digit', 'remain'],
    skill: '전체 쪽수에서 읽은 쪽수를 빼어 남은 쪽수 구하기',
    generate: ({ rand }) => {
      const total = rand.int(400, 899);
      const read = rand.int(100, 399);
      const remain = total - read;
      return {
        q: `동화책의 전체 쪽수는 ${total}쪽입니다.\n그중에서 지수가 ${read}쪽을 읽었다면\n아직 읽지 않은 쪽수는 몇 쪽인가요?`,
        ans: String(remain),
        hint: '전체 쪽수에서 읽은 쪽수를 빼보세요.',
        exp: `[풀이 과정]\n1. 전체 쪽수: ${total}쪽\n2. 읽은 쪽수: ${read}쪽\n3. 식: ${total} - ${read} = ${remain}\n따라서 남은 쪽수는 ${remain}쪽입니다.`,
        equation: `${total}-${read}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-subtraction-difference',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['subtraction', 'three-digit', 'difference'],
    skill: '두 수의 차이 구하기',
    generate: ({ rand, NAMES, SUBTRACTION_CONTEXTS }) => {
      const class1 = rand.int(250, 499);
      const class2 = rand.int(150, 399);
      const diff = Math.abs(class1 - class2);
      const item = rand.pick(SUBTRACTION_CONTEXTS);
      return {
        q: `1반 학생들은 ${item}가 ${class1}개 있고, 2반 학생들은 ${item}가 ${class2}개 있습니다. 두 반의 ${item} 개수 차이는 몇 개인가요?`,
        ans: String(diff),
        hint: '큰 수에서 작은 수를 빼보세요.',
        exp: `[풀이 과정]\n1. 1반: ${class1}개\n2. 2반: ${class2}개\n3. 식: ${Math.max(class1, class2)} - ${Math.min(class1, class2)} = ${diff}\n따라서 차이는 ${diff}개입니다.`,
        equation: `${Math.max(class1, class2)}-${Math.min(class1, class2)}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-reverse-add',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['reverse', 'addition', 'three-digit'],
    skill: '거꾸로 계산하여 원래 수 찾기 (덧셈)',
    generate: ({ rand }) => {
      const any = rand.int(200, 499);
      const add = rand.int(50, 199);
      const result = any + add;
      return {
        q: `어떤 수에 ${add}를 더했더니 ${result}가 되었습니다. 어떤 수는 얼마인가요?`,
        ans: String(any),
        hint: '거꾸로 계산해 보세요. 더한 만큼 다시 빼면 원래 수를 알 수 있어요.',
        exp: `[풀이 과정]\n1. 어떤 수(□) + ${add} = ${result}\n2. □ = ${result} - ${add}\n3. 계산: ${result} - ${add} = ${any}\n따라서 어떤 수는 ${any}입니다.`,
        equation: `${result}-${add}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-reverse-sub',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['reverse', 'subtraction', 'three-digit'],
    skill: '거꾸로 계산하여 원래 수 찾기 (뺄셈)',
    generate: ({ rand }) => {
      const any = rand.int(200, 499);
      const sub = rand.int(50, 199);
      const result = any - sub;
      return {
        q: `어떤 수에서 ${sub}를 뺐더니 ${result}이 되었습니다. 어떤 수는 얼마인가요?`,
        ans: String(any),
        hint: '거꾸로 계산해 보세요. 뺀 만큼 다시 더해주면 원래 수를 알 수 있어요.',
        exp: `[풀이 과정]\n1. 어떤 수(□) - ${sub} = ${result}\n2. □ = ${result} + ${sub}\n3. 계산: ${result} + ${sub} = ${any}\n따라서 어떤 수는 ${any}입니다.`,
        equation: `${result}+${sub}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-mistake-add-sub',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'advanced',
    tags: ['mistake', 'reverse', 'three-digit'],
    skill: '잘못 계산한 결과에서 원래 수 찾기',
    generate: ({ rand }) => {
      const any = rand.int(200, 499);
      const subVal = rand.int(50, 199);
      const wrongResult = any + subVal;
      const correctResult = any - subVal;
      return {
        q: `어떤 수에서 ${subVal}를 빼야 할 것을\n잘못하여 더했더니 ${wrongResult}가 되었습니다.\n바르게 계산한 값을 구하세요.`,
        ans: String(correctResult),
        hint: '잘못 계산한 식을 통해 먼저 "어떤 수"를 구해보세요.',
        exp: `[풀이 과정]\n1. 어떤 수(□) + ${subVal} = ${wrongResult}\n2. □ = ${wrongResult} - ${subVal} = ${any}\n3. 바른 계산: ${any} - ${subVal} = ${correctResult}\n따라서 정답은 ${correctResult}입니다.`,
        equation: `${any}-${subVal}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-multi-step-add-sub',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'advanced',
    tags: ['multi-step', 'addition', 'subtraction'],
    skill: '더하고 빼는 2단계 계산',
    generate: ({ rand, ITEMS }) => {
      const perBox = rand.int(5, 12);
      const boxes = rand.int(3, 6);
      const extra = rand.int(5, 19);
      const total = perBox * boxes + extra;
      const item = rand.pick(ITEMS);
      return {
        q: `${item}가 한 타에 ${perBox}자루씩 들어있는\n상자가 ${boxes}개 있고, 낱개로 ${extra}자루가 더 있습니다.\n${item}는 모두 몇 자루인가요?`,
        ans: String(total),
        hint: '상자에 든 것을 먼저 구한 뒤 낱개를 더해보세요.',
        exp: `[풀이 과정]\n1. 상자에 든 것: ${perBox} × ${boxes} = ${perBox * boxes}자루\n2. 낱개: ${extra}자루\n3. 식: ${perBox * boxes} + ${extra} = ${total}\n따라서 총 ${total}자루입니다.`,
        equation: `${perBox}*${boxes}+${extra}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-place-value-add',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'advanced',
    tags: ['place-value', 'addition', 'three-digit'],
    skill: '자릿값 해석 후 덧셈',
    generate: ({ rand }) => {
      const n100 = rand.int(2, 7);
      const n10 = rand.int(1, 8);
      const n1 = rand.int(1, 9);
      const gValue = n100 * 100 + n10 * 10 + n1;
      const baseNum = rand.int(100, 399);
      const diffNum = rand.int(100, 499);
      const nValue = baseNum + diffNum;
      return {
        q: `다음 ㄱ과 ㄴ인 두 수의 합(ㄱ+ㄴ)을 구하세요.\n\nㄱ. 100이 ${n100}개, 10이 ${n10}개, 1이 ${n1}개인 수\nㄴ. ${baseNum}보다 ${diffNum}만큼 더 큰 수`,
        ans: String(gValue + nValue),
        hint: 'ㄱ과 ㄴ의 값을 각각 먼저 구한 뒤 더해보세요.',
        exp: `[풀이 과정]\n1. ㄱ 구하기: (100×${n100}) + (10×${n10}) + ${n1} = ${gValue}\n2. ㄴ 구하기: ${baseNum} + ${diffNum} = ${nValue}\n3. 계산: ${gValue} + ${nValue} = ${gValue + nValue}\n따라서 합은 ${gValue + nValue}입니다.`,
        equation: `${gValue}+${nValue}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-number-card-max-min',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'advanced',
    tags: ['card', 'max-min', 'subtraction'],
    skill: '카드로 만든 가장 큰 수와 가장 작은 수의 차',
    generate: ({ rand }) => {
      let digits = rand.uniqueInts(0, 9, 5);
      digits.sort((a, b) => b - a);
      const maxVal = parseInt(digits.join(''));
      digits.sort((a, b) => a - b);
      if (digits[0] === 0) {
        [digits[0], digits[1]] = [digits[1], digits[0]];
      }
      const minVal = parseInt(digits.join(''));
      return {
        q: `숫자 카드 (${rand.shuffle([...digits]).join(', ')})를 한 번씩만 사용하여 만들 수 있는 가장 큰 수와 가장 작은 수의 차는 얼마인가요?`,
        ans: String(maxVal - minVal),
        hint: '어떤 수들이 만들어지는지 앞자리 숫자부터 차례로 생각해보세요.',
        exp: `[풀이 과정]\n1. 가장 큰 수: ${maxVal}\n2. 가장 작은 수: ${minVal}\n3. 차이: ${maxVal} - ${minVal} = ${maxVal - minVal}`,
        equation: `${maxVal}-${minVal}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-card-digits-diff',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'advanced',
    tags: ['card', 'permutation', 'subtraction'],
    skill: '카드로 만든 세 자리 수 중 가장 큰 수와 두 번째 작은 수의 차',
    generate: ({ rand }) => {
      let ds = rand.uniqueInts(0, 9, 5);
      let res = [];
      for(let i = 0; i < 5; i++) {
        if (ds[i] === 0) continue;
        for(let j = 0; j < 5; j++) {
          if (i === j) continue;
          for(let k = 0; k < 5; k++) {
            if (k === i || k === j) continue;
            res.push(ds[i] * 100 + ds[j] * 10 + ds[k]);
          }
        }
      }
      res.sort((a, b) => a - b);
      const large = res[res.length - 1];
      const small2 = res[1];
      return {
        q: `수 카드(${ds.join(',')}) 중 3장을 뽑아 만든\n세 자리 수 중 가장 큰 수와\n두 번째로 작은 수의 차를 구하세요.`,
        ans: String(large - small2),
        hint: '어떤 수들이 만들어지는지 앞자리 숫자부터 차례로 생각해보세요.',
        exp: `[풀이 과정]\n1. 가장 큰 수: ${large}\n2. 두 번째 작은 수: ${small2}\n3. 차이: ${large} - ${small2} = ${large - small2}`,
        equation: `${large}-${small2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-addition-three-parts',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['addition', 'three-digit', 'multi-part'],
    skill: '세 부분의 합 구하기',
    generate: ({ rand, NAMES }) => {
      const n1 = rand.int(80, 199);
      const n2 = rand.int(70, 189);
      const n3 = rand.int(60, 179);
      const total = n1 + n2 + n3;
      const name = rand.pick(NAMES);
      return {
        q: `${name}는 저금통에서 ${n1}원, ${n2}원, ${n3}원씩 세 번에 걸쳐 냈습니다. ${name}는 모두 얼마를 저금했나요?`,
        ans: String(total),
        hint: '세 금액을 모두 더해보세요.',
        exp: `[풀이 과정]\n1. 첫 번째: ${n1}원\n2. 두 번째: ${n2}원\n3. 세 번째: ${n3}원\n4. 식: ${n1} + ${n2} + ${n3} = ${total}\n따라서 모두 ${total}원입니다.`,
        equation: `${n1}+${n2}+${n3}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-subtraction-compare-more',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['subtraction', 'three-digit', 'compare'],
    skill: '누가 얼마나 더 많은지 구하기',
    generate: ({ rand, NAMES, ITEMS }) => {
      const num1 = rand.int(200, 499);
      const num2 = rand.int(150, 399);
      const diff = Math.abs(num1 - num2);
      const name1 = rand.pick(NAMES);
      const name2 = rand.pick(NAMES.filter(n => n !== name1));
      const item = rand.pick(ITEMS);
      const winner = num1 > num2 ? name1 : name2;
      return {
        q: `${name1}는 ${item}를 ${num1}개 가지고 있고, ${name2}는 ${item}를 ${num2}개 가지고 있습니다. ${winner}는 ${winner === name1 ? name2 : name1}보다 ${item}를 몇 개 더 가지고 있나요?`,
        ans: String(diff),
        hint: '큰 수에서 작은 수를 빼보세요.',
        exp: `[풀이 과정]\n1. ${name1}: ${num1}개\n2. ${name2}: ${num2}개\n3. 식: ${Math.max(num1, num2)} - ${Math.min(num1, num2)} = ${diff}\n따라서 ${winner}가 ${diff}개 더 많습니다.`,
        equation: `${Math.max(num1, num2)}-${Math.min(num1, num2)}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-addition-money',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['addition', 'three-digit', 'money'],
    skill: '돈의 합 구하기',
    generate: ({ rand }) => {
      const won1000 = rand.int(1, 4);
      const won100 = rand.int(1, 9);
      const won10 = rand.int(0, 9);
      const total = won1000 * 1000 + won100 * 100 + won10 * 10;
      return {
        q: `1000원짜리 ${won1000}장, 100원짜리 ${won100}장, 10원짜리 ${won10}장이 있습니다. 모두 합하면 얼마인가요?`,
        ans: String(total),
        hint: '각 지폐/동전의 합계를 구해 더해보세요.',
        exp: `[풀이 과정]\n1. 1000원: ${won1000} × 1000 = ${won1000 * 1000}원\n2. 100원: ${won100} × 100 = ${won100 * 100}원\n3. 10원: ${won10} × 10 = ${won10 * 10}원\n4. 합계: ${total}원`,
        equation: `${won1000 * 1000}+${won100 * 100}+${won10 * 10}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-subtraction-money-change',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['subtraction', 'three-digit', 'money'],
    skill: '거스름돈 구하기',
    generate: ({ rand }) => {
      const price = rand.int(500, 1999);
      const paid = rand.int(price + 100, 3000);
      const change = paid - price;
      return {
        q: `${price}원짜리 물건을 사고 ${paid}원을 냈습니다. 거스름돈은 얼마인가요?`,
        ans: String(change),
        hint: '낸 돈에서 물건 가격을 빼보세요.',
        exp: `[풀이 과정]\n1. 물건 가격: ${price}원\n2. 낸 돈: ${paid}원\n3. 식: ${paid} - ${price} = ${change}\n따라서 거스름돈은 ${change}원입니다.`,
        equation: `${paid}-${price}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-addition-calendar-days',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['addition', 'calendar', 'days'],
    skill: '날짜 계산 (더하기)',
    generate: ({ rand }) => {
      const startDay = rand.int(5, 15);
      const daysAfter = rand.int(7, 21);
      const endDay = startDay + daysAfter;
      return {
        q: `5월 ${startDay}일입니다. ${daysAfter}일 후는 5월 몇 일인가요?`,
        ans: String(endDay),
        hint: '시작일에서 지난 날수를 더해보세요.',
        exp: `[풀이 과정]\n1. 시작일: 5월 ${startDay}일\n2. 지난 날수: ${daysAfter}일\n3. 식: ${startDay} + ${daysAfter} = ${endDay}\n따라서 ${daysAfter}일 후는 5월 ${endDay}일입니다.`,
        equation: `${startDay}+${daysAfter}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-subtraction-calendar-days',
    grade: 3,
    unit: 'addition-subtraction',
    difficulty: 'basic',
    tags: ['subtraction', 'calendar', 'days'],
    skill: '날짜 계산 (빼기)',
    generate: ({ rand }) => {
      const endDay = rand.int(20, 30);
      const daysBefore = rand.int(7, 14);
      const startDay = endDay - daysBefore;
      return {
        q: `5월 ${endDay}일입니다. ${daysBefore}일 전은 5월 몇 일인가요?`,
        ans: String(startDay),
        hint: '현재 날짜에서 지난 날수를 빼보세요.',
        exp: `[풀이 과정]\n1. 현재: 5월 ${endDay}일\n2. 지난 날수: ${daysBefore}일\n3. 식: ${endDay} - ${daysBefore} = ${startDay}\n따라서 ${daysBefore}일 전은 5월 ${startDay}일입니다.`,
        equation: `${endDay}-${daysBefore}`,
        answerType: 'number'
      };
    }
  }
];

export default grade3AdditionSubtractionTemplates;
