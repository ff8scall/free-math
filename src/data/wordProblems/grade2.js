/**
 * 2학년 문장제 문제 템플릿 메인 파일
 * 
 * 총 8개 템플릿:
 * - 기본: 4개
 * - 심화: 4개
 */

import { grade2BasicTemplates } from './grade2-basic.js';
import { grade2AdvancedTemplates } from './grade2-advanced.js';

// 모든 2학년 템플릿 통합
export const grade2Templates = [
  ...grade2BasicTemplates,
  ...grade2AdvancedTemplates
];

export default grade2Templates;
