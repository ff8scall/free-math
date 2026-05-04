/**
 * 5학년 문장제 문제 템플릿 메인 파일
 * 
 * 총 5개 템플릿:
 * - 기본: 2개
 * - 심화: 3개
 */

import { grade5BasicTemplates } from './grade5-basic.js';
import { grade5AdvancedTemplates } from './grade5-advanced.js';

// 모든 5학년 템플릿 통합
export const grade5Templates = [
  ...grade5BasicTemplates,
  ...grade5AdvancedTemplates
];

export default grade5Templates;
