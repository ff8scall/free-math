/**
 * 1학년 문장제 문제 템플릿 메인 파일
 * 
 * 총 9개 템플릿:
 * - 기본: 4개
 * - 심화: 5개
 */

import { grade1BasicTemplates } from './grade1-basic.js';
import { grade1AdvancedTemplates } from './grade1-advanced.js';

// 모든 1학년 템플릿 통합
export const grade1Templates = [
  ...grade1BasicTemplates,
  ...grade1AdvancedTemplates
];

export default grade1Templates;
