/**
 * 3학년 시간/길이/무게 문장제 템플릿 (12개)
 */

export const grade3TimeLengthWeightTemplates = [
  {
    id: 'g3-time-after',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['time', 'addition'],
    skill: '시작 시각 + 걸린 시간 = 끝난 시각',
    generate: ({ rand, TIME_CONTEXTS }) => {
      const ctx = rand.pick(TIME_CONTEXTS);
      const startHour = rand.int(1, 4);
      const startMin = rand.pick([0, 15, 30, 45]);
      const duration = rand.int(20, 55);
      const totalMin = startHour * 60 + startMin + duration;
      const endHour = Math.floor(totalMin / 60);
      const endMin = totalMin % 60;
      return {
        q: `${ctx.event}가 ${startHour}시 ${startMin}분에 시작되어 ${duration}분 동안 진행되었습니다. ${ctx.event}는 몇 시 몇 분에 끝났나요?`,
        ans: `${endHour}시 ${endMin}분`,
        hint: '시작 시각에서 걸린 시간을 더해보세요.',
        exp: `[풀이 과정]\n1. 시작: ${startHour}시 ${startMin}분\n2. 걸린 시간: ${duration}분\n3. 식: ${startHour}시 ${startMin}분 + ${duration}분 = ${endHour}시 ${endMin}분\n따라서 ${endHour}시 ${endMin}분에 끝났습니다.`,
        equation: `${startHour}:${startMin}+${duration}`,
        answerType: 'time'
      };
    }
  },
  {
    id: 'g3-time-before',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['time', 'subtraction'],
    skill: '끝난 시각 - 걸린 시간 = 시작 시각',
    generate: ({ rand, TIME_CONTEXTS }) => {
      const ctx = rand.pick(TIME_CONTEXTS);
      const endHour = rand.int(2, 5);
      const endMin = rand.pick([15, 30, 45]);
      const duration = rand.int(25, 50);
      const totalMin = endHour * 60 + endMin - duration;
      const startHour = Math.floor(totalMin / 60);
      const startMin = totalMin % 60;
      return {
        q: `${ctx.event}가 ${endHour}시 ${endMin}분에 끝났습니다. ${ctx.event}는 ${duration}분 동안 진행되었습니다. ${ctx.event}는 몇 시 몇 분에 시작했나요?`,
        ans: `${startHour}시 ${startMin}분`,
        hint: '끝난 시각에서 걸린 시간을 빼보세요.',
        exp: `[풀이 과정]\n1. 끝난 시각: ${endHour}시 ${endMin}분\n2. 걸린 시간: ${duration}분\n3. 식: ${endHour}시 ${endMin}분 - ${duration}분 = ${startHour}시 ${startMin}분\n따라서 ${startHour}시 ${startMin}분에 시작했습니다.`,
        equation: `${endHour}:${endMin}-${duration}`,
        answerType: 'time'
      };
    }
  },
  {
    id: 'g3-time-duration',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['time', 'subtraction'],
    skill: '끝난 시각 - 시작 시각 = 걸린 시간',
    generate: ({ rand, TIME_CONTEXTS }) => {
      const ctx = rand.pick(TIME_CONTEXTS);
      const startHour = rand.int(1, 3);
      const startMin = rand.pick([0, 15, 30]);
      const duration = rand.int(30, 90);
      const totalMin = startHour * 60 + startMin + duration;
      const endHour = Math.floor(totalMin / 60);
      const endMin = totalMin % 60;
      return {
        q: `${ctx.event}가 ${startHour}시 ${startMin}분에 시작해서 ${endHour}시 ${endMin}분에 끝났습니다. ${ctx.event}는 몇 분 동안 진행되었나요?`,
        ans: String(duration),
        hint: '끝난 시각에서 시작 시각을 빼보세요.',
        exp: `[풀이 과정]\n1. 시작: ${startHour}시 ${startMin}분 (${startHour * 60 + startMin}분)\n2. 끝난: ${endHour}시 ${endMin}분 (${totalMin}분)\n3. 식: ${totalMin} - ${startHour * 60 + startMin} = ${duration}\n따라서 ${duration}분 동안 진행되었습니다.`,
        equation: `${endHour}:${endMin}-${startHour}:${startMin}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-time-am-pm',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'advanced',
    tags: ['time', 'am-pm', 'subtraction'],
    skill: '오전~오후 시간 계산',
    generate: ({ rand }) => {
      const startH = 9;
      const startM = rand.pick([0, 15, 30]);
      const endH = rand.int(1, 3);
      const endM = rand.int(10, 50);
      const totalMin = (endH + 12) * 60 + endM - (startH * 60 + startM);
      const resH = Math.floor(totalMin / 60);
      const resM = totalMin % 60;
      return {
        q: `오전 ${startH}시 ${startM}분에 시작한 공부가\n오후 ${endH}시 ${endM}분에 끝났습니다.\n공부를 한 시간은 몇 시간 몇 분인가요? (정답 예: 3, 45)`,
        ans: `${resH},${resM}`,
        hint: '오후 1시는 13시로 생각해서 빼면 계산이 쉬워요.',
        exp: `[풀이 과정]\n1. 오후 ${endH}시 ${endM}분은 13시 ${endM}분 = ${(endH + 12) * 60 + endM}분\n2. 오전 ${startH}시 ${startM}분 = ${startH * 60 + startM}분\n3. 식: ${(endH + 12) * 60 + endM} - ${startH * 60 + startM} = ${totalMin}분\n4. ${totalMin}분 = ${resH}시간 ${resM}분`,
        equation: `${resH},${resM}`,
        answerType: 'multi'
      };
    }
  },
  {
    id: 'g3-length-add',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['length', 'addition', 'cm'],
    skill: '길이 더하기',
    generate: ({ rand, LENGTH_CONTEXTS }) => {
      const ctx = rand.pick(LENGTH_CONTEXTS);
      const len1 = rand.int(10, 49);
      const len2 = rand.int(10, 49);
      const total = len1 + len2;
      return {
        q: `${ctx.item} 한 개의 길이는 ${len1}${ctx.unit}이고, 다른 ${ctx.item}의 길이는 ${len2}${ctx.unit}입니다. 두 ${ctx.item}를 이어 붙이면 전체 길이는 몇 ${ctx.unit}인가요?`,
        ans: String(total),
        hint: '두 길이를 더해보세요.',
        exp: `[풀이 과정]\n1. 첫 번째: ${len1}${ctx.unit}\n2. 두 번째: ${len2}${ctx.unit}\n3. 식: ${len1} + ${len2} = ${total}\n따라서 전체 길이는 ${total}${ctx.unit}입니다.`,
        equation: `${len1}+${len2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-length-subtract',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['length', 'subtraction', 'cm'],
    skill: '길이 빼기',
    generate: ({ rand, LENGTH_CONTEXTS }) => {
      const ctx = rand.pick(LENGTH_CONTEXTS);
      const total = rand.int(30, 89);
      const used = rand.int(10, total - 10);
      const remain = total - used;
      return {
        q: `${ctx.item}의 전체 길이는 ${total}${ctx.unit}입니다. 그중 ${used}${ctx.unit}를 사용했습니다. 남은 길이는 몇 ${ctx.unit}인가요?`,
        ans: String(remain),
        hint: '전체 길이에서 사용한 길이를 빼보세요.',
        exp: `[풀이 과정]\n1. 전체: ${total}${ctx.unit}\n2. 사용: ${used}${ctx.unit}\n3. 식: ${total} - ${used} = ${remain}\n따라서 남은 길이는 ${remain}${ctx.unit}입니다.`,
        equation: `${total}-${used}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-length-unit-convert',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['length', 'unit-convert', 'm-cm'],
    skill: 'm와 cm 변환 후 계산',
    generate: ({ rand, LENGTH_CONTEXTS }) => {
      const ctx = rand.pick(LENGTH_CONTEXTS);
      const m = rand.int(1, 3);
      const cm = rand.int(10, 99);
      const addCm = rand.int(10, 99);
      const totalCm = m * 100 + cm + addCm;
      return {
        q: `${ctx.item}의 길이가 ${m}m ${cm}cm입니다. 여기에 ${addCm}cm를 더하면 전체 길이는 몇 cm인가요?`,
        ans: String(totalCm),
        hint: 'm을 cm로 바꾸어 단위를 통일한 뒤 더해보세요.',
        exp: `[풀이 과정]\n1. ${m}m ${cm}cm = ${m * 100 + cm}cm\n2. 식: ${m * 100 + cm} + ${addCm} = ${totalCm}\n따라서 전체 길이는 ${totalCm}cm입니다.`,
        equation: `${m * 100 + cm}+${addCm}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-length-overlap',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'advanced',
    tags: ['length', 'overlap', 'logic'],
    skill: '겹친 부분 고려한 길이 계산',
    generate: ({ rand, LENGTH_CONTEXTS }) => {
      const ctx = rand.pick(LENGTH_CONTEXTS);
      const stripLen = rand.int(15, 30);
      const overlap = rand.int(3, 8);
      const count = rand.pick([2, 3]);
      const total = stripLen * count - overlap * (count - 1);
      return {
        q: `길이가 ${stripLen}${ctx.unit}인 ${ctx.item} ${count}장을\n${overlap}${ctx.unit}씩 겹쳐서 길게 이어 붙였습니다.\n이어 붙인 ${ctx.item} 전체의 길이는 몇 ${ctx.unit}인가요?`,
        ans: String(total),
        hint: '겹친 부분이 몇 군데인지 생각해보세요.',
        exp: `[풀이 과정]\n1. ${ctx.item} ${count}장을 이으면 겹치는 부분은 ${count - 1}군데\n2. 식: (${stripLen} × ${count}) - (${overlap} × ${count - 1})\n3. 계산: ${stripLen * count} - ${overlap * (count - 1)} = ${total}\n따라서 전체 길이는 ${total}${ctx.unit}입니다.`,
        equation: `${stripLen}*${count}-${overlap}*${count - 1}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-weight-add',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['weight', 'addition', 'g'],
    skill: '무게 더하기',
    generate: ({ rand, WEIGHT_CONTEXTS }) => {
      const ctx = rand.pick(WEIGHT_CONTEXTS);
      const w1 = rand.int(100, 499);
      const w2 = rand.int(100, 499);
      const total = w1 + w2;
      return {
        q: `${ctx.item} 한 개는 ${w1}${ctx.unit}이고, 다른 ${ctx.item} 한 개는 ${w2}${ctx.unit}입니다. 두 ${ctx.item}의 전체 무게는 몇 ${ctx.unit}인가요?`,
        ans: String(total),
        hint: '두 무게를 더해보세요.',
        exp: `[풀이 과정]\n1. 첫 번째: ${w1}${ctx.unit}\n2. 두 번째: ${w2}${ctx.unit}\n3. 식: ${w1} + ${w2} = ${total}\n따라서 전체 무게는 ${total}${ctx.unit}입니다.`,
        equation: `${w1}+${w2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-weight-unit-convert',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['weight', 'unit-convert', 'kg-g'],
    skill: 'kg와 g 변환 후 계산',
    generate: ({ rand, WEIGHT_CONTEXTS }) => {
      const ctx = rand.pick(WEIGHT_CONTEXTS);
      const kg = rand.int(1, 3);
      const g = rand.int(100, 899);
      const addG = rand.int(100, 899);
      const totalG = kg * 1000 + g + addG;
      return {
        q: `${ctx.item}의 무게가 ${kg}kg ${g}g입니다. 여기에 ${addG}g인 물건을 더하면 전체 무게는 몇 g인가요?`,
        ans: String(totalG),
        hint: 'kg을 g으로 바꾸어 단위를 통일한 뒤 더해보세요.',
        exp: `[풀이 과정]\n1. ${kg}kg ${g}g = ${kg * 1000 + g}g\n2. 식: ${kg * 1000 + g} + ${addG} = ${totalG}\n따라서 전체 무게는 ${totalG}g입니다.`,
        equation: `${kg * 1000 + g}+${addG}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-weight-box',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'advanced',
    tags: ['weight', 'unit-convert', 'box'],
    skill: '빈 상자와 물건 무게 합계',
    generate: ({ rand, WEIGHT_CONTEXTS }) => {
      const ctx = rand.pick(WEIGHT_CONTEXTS);
      const boxKg = rand.int(1, 2);
      const item1 = rand.int(200, 499);
      const item2 = rand.int(200, 499);
      const totalG = boxKg * 1000 + item1 + item2;
      return {
        q: `무게가 ${boxKg}kg인 빈 상자에 ${item1}g짜리 ${ctx.item}와 ${item2}g짜리 ${ctx.item}를 넣었습니다. 상자 전체의 무게는 몇 g인가요?`,
        ans: String(totalG),
        hint: 'kg을 g으로 바꾸어 계산해 보세요.',
        exp: `[풀이 과정]\n1. 빈 상자: ${boxKg}kg = ${boxKg * 1000}g\n2. 물건들: ${item1}g + ${item2}g = ${item1 + item2}g\n3. 식: ${boxKg * 1000} + ${item1 + item2} = ${totalG}\n따라서 전체 무게는 ${totalG}g입니다.`,
        equation: `${boxKg * 1000}+${item1}+${item2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g3-capacity-add',
    grade: 3,
    unit: 'time-length-weight',
    difficulty: 'basic',
    tags: ['capacity', 'addition', 'ml'],
    skill: '용량 더하기',
    generate: ({ rand }) => {
      const item = rand.pick(['우유', '주스', '물']);
      const cap1 = rand.int(200, 499);
      const cap2 = rand.int(200, 499);
      const total = cap1 + cap2;
      return {
        q: `${item} 한 컵은 ${cap1}ml이고, 다른 컵은 ${cap2}ml입니다. 두 컵의 ${item}를 모두 합치면 몇 ml인가요?`,
        ans: String(total),
        hint: '두 용량을 더해보세요.',
        exp: `[풀이 과정]\n1. 첫 번째: ${cap1}ml\n2. 두 번째: ${cap2}ml\n3. 식: ${cap1} + ${cap2} = ${total}\n따라서 모두 ${total}ml입니다.`,
        equation: `${cap1}+${cap2}`,
        answerType: 'number'
      };
    }
  }
];

export default grade3TimeLengthWeightTemplates;
