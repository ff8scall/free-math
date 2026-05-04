/**
 * 6학년 문장제 문제 템플릿 메인 파일
 * 
 * 총 5개 템플릿:
 * - 기본: 2개
 * - 심화: 3개
 */

import { grade6BasicTemplates } from './grade6-basic.js';
import { grade6AdvancedTemplates } from './grade6-advanced.js';

// 모든 6학년 템플릿 통합
export const grade6Templates = [
  ...grade6BasicTemplates,
  ...grade6AdvancedTemplates
];

export default grade6Templates;
