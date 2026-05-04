/**
 * 4학년 문장제 문제 템플릿 메인 파일
 * 
 * 총 6개 템플릿:
 * - 기본: 1개
 * - 심화: 5개
 */

import { grade4BasicTemplates } from './grade4-basic.js';
import { grade4AdvancedTemplates } from './grade4-advanced.js';

// 모든 4학년 템플릿 통합
export const grade4Templates = [
  ...grade4BasicTemplates,
  ...grade4AdvancedTemplates
];

export default grade4Templates;
