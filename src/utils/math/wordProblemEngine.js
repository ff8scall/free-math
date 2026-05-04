/**
 * 문장형 문제 생성 엔진 (Template-based)
 * 
 * 템플릿 데이터를 받아 실제 문제를 생성합니다.
 * 기존 wordProblemGenerator.js의 API 호환성을 유지하면서,
 * 데이터 분리와 확장성을 제공합니다.
 */

import { rand, format, math, answer, text, validate } from './problemUtils';
import { NAMES, ITEMS, ADDITION_CONTEXTS, SUBTRACTION_CONTEXTS, MULTIPLICATION_CONTEXTS, DIVISION_CONTEXTS, TIME_CONTEXTS, LENGTH_CONTEXTS, WEIGHT_CONTEXTS, FRACTION_CONTEXTS, SHAPE_CONTEXTS, LOGIC_CONTEXTS, PLACES } from '../../data/wordProblems/commonContexts';

/**
 * 문제 템플릿 구조
 * {
 *   id: string,           // 고유 ID
 *   grade: number,        // 학년 (1-6)
 *   unit: string,         // 단원 (예: 'addition-subtraction')
 *   difficulty: string,   // 'basic' | 'advanced'
 *   tags: string[],       // 태그 (검색/필터용)
 *   skill: string,        // 스킬 설명
 *   generate: function   // 문제 생성 함수
 * }
 */

/**
 * 템플릿 은행에서 문제 생성
 */
export const generateFromTemplate = (template) => {
  const context = {
    rand,
    format,
    math,
    answer,
    text,
    validate,
    NAMES,
    ITEMS,
    ADDITION_CONTEXTS,
    SUBTRACTION_CONTEXTS,
    MULTIPLICATION_CONTEXTS,
    DIVISION_CONTEXTS,
    TIME_CONTEXTS,
    LENGTH_CONTEXTS,
    WEIGHT_CONTEXTS,
    FRACTION_CONTEXTS,
    SHAPE_CONTEXTS,
    LOGIC_CONTEXTS,
    PLACES
  };
  
  return template.generate(context);
};

/**
 * 템플릿 필터링
 */
export const filterTemplates = (templates, { grade, difficulty, unit, tags }) => {
  return templates.filter(t => {
    if (grade !== undefined && t.grade !== grade) return false;
    if (difficulty !== undefined && t.difficulty !== difficulty) return false;
    if (unit !== undefined && t.unit !== unit) return false;
    if (tags && tags.length > 0 && !tags.every(tag => t.tags.includes(tag))) return false;
    return true;
  });
};

/**
 * 필터링된 템플릿에서 랜덤 선택
 */
export const selectRandomTemplate = (templates, filters) => {
  const filtered = filterTemplates(templates, filters);
  if (filtered.length === 0) {
    throw new Error(`No templates found for filters: ${JSON.stringify(filters)}`);
  }
  return rand.pick(filtered);
};

/**
 * 문제 생성 메인 함수
 */
export const generateProblem = (templates, options = {}) => {
  const { grade, difficulty, unit, tags, seed } = options;
  
  // 난이도가 'mixed'이면 basic/advanced 모두 포함
  const effectiveDifficulty = difficulty === 'mixed' ? undefined : difficulty;
  
  const template = selectRandomTemplate(templates, {
    grade,
    difficulty: effectiveDifficulty,
    unit,
    tags
  });
  
  const problem = generateFromTemplate(template);
  
  // 템플릿 메타데이터 추가
  return {
    ...problem,
    _templateId: template.id,
    _grade: template.grade,
    _unit: template.unit,
    _difficulty: template.difficulty,
    _tags: template.tags
  };
};

/**
 * 여러 문제 일괄 생성
 */
export const generateMultipleProblems = (templates, count, options = {}) => {
  const problems = [];
  const usedTemplates = new Set();
  
  for (let i = 0; i < count; i++) {
    let problem;
    let attempts = 0;
    const maxAttempts = 10;
    
    // 같은 템플릿이 연속으로 너무 많이 나오지 않도록 시도
    do {
      problem = generateProblem(templates, options);
      attempts++;
    } while (usedTemplates.has(problem._templateId) && attempts < maxAttempts);
    
    usedTemplates.add(problem._templateId);
    problems.push(problem);
    
    // 사용한 템플릿 목록이 너무 커지면 초기화
    if (usedTemplates.size > Math.max(5, count / 2)) {
      usedTemplates.clear();
    }
  }
  
  return problems;
};

/**
 * 기존 API 호환성을 위한 래퍼
 * wordProblemGenerator.js에서 사용
 */
export const createLegacyGenerator = (templatesByGrade) => {
  return (gradeNum, difficulty = 'mixed') => {
    const templates = templatesByGrade[gradeNum] || [];
    if (templates.length === 0) {
      // 템플릿이 없으면 빈 문제 반환 (기존 동작 유지)
      return { q: `${gradeNum}학년 문장제 문제를 생성 중입니다.`, ans: "0", exp: "점검 중", hint: "" };
    }
    
    const problem = generateProblem(templates, { grade: gradeNum, difficulty });
    
    // 기존 API에 맞게 필드 매핑
    return {
      q: problem.q,
      ans: problem.ans,
      exp: problem.exp,
      hint: problem.hint || "문제를 다시 한번 천천히 읽어보세요."
    };
  };
};

export default {
  generateFromTemplate,
  filterTemplates,
  selectRandomTemplate,
  generateProblem,
  generateMultipleProblems,
  createLegacyGenerator
};
