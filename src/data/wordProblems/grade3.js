/**
 * 3학년 문장제 문제 템플릿 메인 파일
 * 
 * 총 60개 템플릿:
 * - 덧셈/뺄셈: 18개
 * - 곱셈/나눗셈: 14개
 * - 시간/길이/무게: 12개
 * - 분수/도형: 8개
 * - 사고력/규칙/카드: 8개
 */

import { grade3AdditionSubtractionTemplates } from './grade3-addition-subtraction.js';
import { grade3MultiplicationDivisionTemplates } from './grade3-multiplication-division.js';
import { grade3TimeLengthWeightTemplates } from './grade3-time-length-weight.js';
import { grade3FractionShapeTemplates } from './grade3-fraction-shape.js';
import { grade3LogicCardTemplates } from './grade3-logic-card.js';

// 모든 3학년 템플릿 통합
export const grade3Templates = [
  ...grade3AdditionSubtractionTemplates,
  ...grade3MultiplicationDivisionTemplates,
  ...grade3TimeLengthWeightTemplates,
  ...grade3FractionShapeTemplates,
  ...grade3LogicCardTemplates
];

// 학년별 템플릿 맵 (확장성을 위해)
export const templatesByGrade = {
  3: grade3Templates
};

export default grade3Templates;
