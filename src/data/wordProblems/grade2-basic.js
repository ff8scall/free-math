/**
 * 2학년 기본 문장제 템플릿 (4개)
 */

export const grade2BasicTemplates = [
  {
    id: 'g2-three-digit-sum',
    grade: 2,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['addition', 'three-digit'],
    skill: '세 자리 수 덧셈',
    generate: ({ rand }) => {
      const n1 = rand.int(100, 299);
      const n2 = rand.int(100, 299);
      return {
        q: `어제 박물관에 방문한 사람은 ${n1}명이고, 오늘은 ${n2}명이 방문했습니다. 어제와 오늘 방문한 사람은 모두 몇 명인가요?`,
        ans: String(n1 + n2),
        hint: '어제와 오늘 방문한 사람 수를 더해보세요.',
        exp: `[풀이 과정]\n1. 어제: ${n1}명\n2. 오늘: ${n2}명\n3. 식: ${n1} + ${n2} = ${n1 + n2}\n따라서 모두 ${n1 + n2}명입니다.`,
        equation: `${n1}+${n2}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g2-length-add',
    grade: 2,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['length', 'addition'],
    skill: '길이 더하기',
    generate: ({ rand }) => {
      const cm = rand.int(10, 59);
      const addCm = rand.int(20, 59);
      return {
        q: `연필 한 자루의 길이는 ${cm}cm이고, 다른 연필의 길이는 ${addCm}cm입니다. 두 연필을 일자로 이어 붙이면 전체 길이는 몇 cm가 될까요?`,
        ans: String(cm + addCm),
        hint: '두 연필의 길이를 더해보세요.',
        exp: `[풀이 과정]\n1. 첫 번째 연필: ${cm}cm\n2. 두 번째 연필: ${addCm}cm\n3. 식: ${cm} + ${addCm} = ${cm + addCm}\n따라서 전체 길이는 ${cm + addCm}cm입니다.`,
        equation: `${cm}+${addCm}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g2-multiplication-basic',
    grade: 2,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['multiplication', 'basic'],
    skill: '기본 곱셈',
    generate: ({ rand, ITEMS }) => {
      const item = rand.pick(ITEMS);
      const perBag = rand.int(2, 5);
      const bags = rand.int(3, 7);
      return {
        q: `한 봉지에 ${item}가 ${perBag}개씩 들어 있습니다. 이런 봉지가 ${bags}봉지 있다면 ${item}는 모두 몇 개인가요?`,
        ans: String(perBag * bags),
        hint: '봉지 수 × 한 봉지에 들어있는 개수를 계산해보세요.',
        exp: `[풀이 과정]\n1. 한 봉지: ${perBag}개\n2. 봉지 수: ${bags}봉지\n3. 식: ${perBag} × ${bags} = ${perBag * bags}\n따라서 모두 ${perBag * bags}개입니다.`,
        equation: `${perBag}×${bags}`,
        answerType: 'number'
      };
    }
  },
  {
    id: 'g2-time-after',
    grade: 2,
    unit: 'basic',
    difficulty: 'basic',
    tags: ['time', 'addition'],
    skill: '시간 더하기',
    generate: ({ rand }) => {
      const startH = rand.int(1, 3);
      const duration = rand.int(20, 49);
      return {
        q: `${startH}시에 시작한 만화 영화가 ${duration}분 동안 방영되었습니다. 영화가 끝난 시각은 몇 시 몇 분인가요?`,
        ans: `${startH}시 ${duration}분`,
        hint: '시작 시각에서 경과한 시간을 더해보세요.',
        exp: `[풀이 과정]\n1. 시작 시각: ${startH}시\n2. 경과 시간: ${duration}분\n3. 식: ${startH}시 + ${duration}분 = ${startH}시 ${duration}분\n따라서 ${startH}시 ${duration}분에 끝납니다.`,
        equation: `${startH}:${duration}`,
        answerType: 'text'
      };
    }
  }
];

export default grade2BasicTemplates;
