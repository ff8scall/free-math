/**
 * 2학년 심화 문장제 템플릿 (4개)
 */

export const grade2AdvancedTemplates = [
  {
    id: 'g2-advanced-card-max-min',
    grade: 2,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['card', 'max-min', 'three-digit'],
    skill: '카드로 최대/최소 수 만들기',
    generate: ({ rand }) => {
      let digits = [];
      while (digits.length < 3) {
        let d = rand.int(1, 9);
        if (!digits.includes(d)) digits.push(d);
      }
      const sortedDesc = [...digits].sort((a, b) => b - a);
      const maxNum = sortedDesc[0] * 100 + sortedDesc[1] * 10 + sortedDesc[2];
      const sortedAsc = [...digits].sort((a, b) => a - b);
      const minNum = sortedAsc[0] * 100 + sortedAsc[1] * 10 + sortedAsc[2];
      return {
        q: `숫자 카드 ${digits.join(', ')}를 한 번씩만 사용하여 만들 수 있는 세 자리 수 중 가장 큰 수와 가장 작은 수의 차는 얼마인가요?`,
        ans: String(maxNum - minNum),
        hint: '가장 큰 수는 큰 순서로, 가장 작은 수는 작은 순서로 배열해보세요.',
        exp: `[풀이 과정]\n1. 카드: ${digits.join(', ')}\n2. 가장 큰 수: ${sortedDesc.join('')} = ${maxNum}\n3. 가장 작은 수: ${sortedAsc.join('')} = ${minNum}\n4. 식: ${maxNum} - ${minNum} = ${maxNum - minNum}\n따라서 차이는 ${maxNum - minNum}입니다.`,
        equation: `${maxNum}-${minNum}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g2-advanced-time-duration',
    grade: 2,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['time', 'duration'],
    skill: '시간 경과 계산',
    generate: ({ rand }) => {
      const h1 = rand.int(2, 4);
      const m1 = rand.int(10, 40);
      const durationMin = rand.int(45, 80);
      const totalMin = h1 * 60 + m1 + durationMin;
      const endH = Math.floor(totalMin / 60);
      const endM = totalMin % 60;
      return {
        q: `${h1}시 ${m1}분에 시작한 영화가 ${durationMin}분 동안 상영되었습니다. 영화가 끝난 시각은 몇 시 몇 분인가요?`,
        ans: `${endH}시 ${endM}분`,
        hint: '시작 시각을 분으로 환산하여 계산해보세요.',
        exp: `[풀이 과정]\n1. 시작 시각: ${h1}시 ${m1}분 = ${h1 * 60 + m1}분\n2. 상영 시간: ${durationMin}분\n3. 종료 시각: ${h1 * 60 + m1} + ${durationMin} = ${totalMin}분\n4. 시간 환산: ${endH}시 ${endM}분\n따라서 ${endH}시 ${endM}분에 끝납니다.`,
        equation: `${endH}:${endM}`,
        answerType: 'text'
      };
    }
  },
  {
    id: 'g2-advanced-reverse-multiply',
    grade: 2,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['reverse', 'multiplication'],
    skill: '거꾸로 곱셈 계산',
    generate: ({ rand, ITEMS }) => {
      const item = rand.pick(ITEMS);
      const perBag = rand.int(2, 5);
      const total = perBag * rand.int(3, 6);
      const bags = total / perBag;
      return {
        q: `${item}가 ${total}개 있습니다. 이것을 한 봉지에 ${perBag}개씩 담으면 봉지가 몇 개 필요한가요?`,
        ans: String(bags),
        hint: '전체 개수를 한 봉지에 들어가는 개수로 나누어보세요.',
        exp: `[풀이 과정]\n1. 전체 개수: ${total}개\n2. 한 봉지: ${perBag}개\n3. 식: ${total} ÷ ${perBag} = ${bags}\n따라서 봉지 ${bags}개가 필요합니다.`,
        equation: `${total}÷${perBag}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g2-advanced-length-overlap',
    grade: 2,
    unit: 'advanced',
    difficulty: 'advanced',
    tags: ['length', 'overlap'],
    skill: '겹치는 부분 고려한 길이 계산',
    generate: ({ rand }) => {
      const len = rand.int(10, 14);
      const overlap = rand.int(2, 3);
      return {
        q: `길이가 ${len}cm인 종이 띠 2장을 ${overlap}cm가 겹치게 이어 붙였습니다. 이어 붙인 종이 띠 전체의 길이는 몇 cm인가요?`,
        ans: String(len * 2 - overlap),
        hint: '두 장의 길이를 더한 뒤 겹친 부분만큼 빼보세요.',
        exp: `[풀이 과정]\n1. 한 장 길이: ${len}cm\n2. 두 장 길이: ${len} × 2 = ${len * 2}cm\n3. 겹친 부분: ${overlap}cm\n4. 식: ${len * 2} - ${overlap} = ${len * 2 - overlap}\n따라서 전체 길이는 ${len * 2 - overlap}cm입니다.`,
        equation: `${len*2}-${overlap}`,
        answerType: 'number'
      };
    }
  }
];

export default grade2AdvancedTemplates;
