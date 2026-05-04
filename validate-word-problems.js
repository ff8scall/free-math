/**
 * 문장제 템플릿 자동 검증 스크립트
 * 
 * 사용법:
 * node validate-word-problems.js
 * 
 * 검증 항목:
 * - 템플릿 구조 유효성
 * - generate 함수 실행 가능성
 * - 생성된 문제의 필수 필드 존재 여부
 * - 정답과 식의 일치 여부
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 유틸리티 함수들 (problemUtils.js에서 가져옴)
const rand = {
  int: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  float: (min, max, decimals = 2) => Number((Math.random() * (max - min) + min).toFixed(decimals)),
  pick: (arr) => arr[Math.floor(Math.random() * arr.length)],
  pickN: (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, Math.min(n, arr.length)),
  shuffle: (arr) => [...arr].sort(() => Math.random() - 0.5),
  uniqueInts: (min, max, count) => {
    const available = [];
    for (let i = min; i <= max; i++) available.push(i);
    const result = [];
    for (let i = 0; i < count && available.length > 0; i++) {
      const idx = Math.floor(Math.random() * available.length);
      result.push(available.splice(idx, 1)[0]);
    }
    return result;
  },
  bool: () => Math.random() > 0.5
};

const NAMES = ['철수', '영희', '민수', '지수', '수지', '민아', '도겸', '호시', '민호', '유진', '서준', '하은', '도윤', '채원', '사쿠라', '카즈하', '지아', '우진', '소윤', '준우', '예은', '하니', '민지', '혜인'];
const ITEMS = ['사과', '포도', '구슬', '장난감', '딱지', '사탕', '연필', '지우개', '스티커', '초콜릿', '쿠키'];

// 컨텍스트 데이터
const context = {
  rand,
  NAMES,
  ITEMS,
  ADDITION_CONTEXTS: ['박물관 방문객', '도서관 이용자', '공원 놀이터 아이들', '수영장 이용객', '영화관 관객', '버스 승객', '기차 승객', '비행기 승객', '학교 학생', '학급 학생', '동아리 회원', '반 친구'],
  SUBTRACTION_CONTEXTS: ['책 쪽수', '스티커', '연필', '지우개', '공책', '캔디', '과자', '젤리', '쿠키', '초콜릿', '장난감', '구슬', '딱지', '카드'],
  MULTIPLICATION_CONTEXTS: [
    { item: '연필', container: '타', unit: '자루' },
    { item: '사탕', container: '봉지', unit: '개' },
    { item: '과자', container: '상자', unit: '봉지' },
    { item: '젤리', container: '봉지', unit: '개' },
    { item: '장난감', container: '상자', unit: '개' },
    { item: '스티커', container: '시트', unit: '장' },
    { item: '공책', container: '묶음', unit: '권' },
    { item: '연필심', container: '상자', unit: '개' }
  ],
  DIVISION_CONTEXTS: [
    { item: '사탕', people: '친구' },
    { item: '과자', people: '동생들' },
    { item: '젤리', people: '학급 친구' },
    { item: '캔디', people: '아이들' },
    { item: '장난감', people: '동네 친구' },
    { item: '스티커', people: '반 친구' },
    { item: '연필', people: '학생들' },
    { item: '공책', people: '학생들' }
  ],
  TIME_CONTEXTS: [
    { event: '만화 영화', start: '오전 9시 30분', duration: 60 },
    { event: '공부', start: '오전 8시', duration: 45 },
    { event: '운동', start: '오후 3시', duration: 30 },
    { event: '독서', start: '오후 2시', duration: 50 },
    { event: '피아노 연습', start: '오전 10시', duration: 40 }
  ],
  LENGTH_CONTEXTS: [
    { item: '연필', unit: 'cm' },
    { item: '자', unit: 'cm' },
    { item: '줄', unit: 'cm' },
    { item: '리본', unit: 'cm' },
    { item: '끈', unit: 'cm' },
    { item: '밧줄', unit: 'cm' },
    { item: '종이 띠', unit: 'cm' }
  ],
  WEIGHT_CONTEXTS: [
    { item: '사과', unit: 'g' },
    { item: '감자', unit: 'g' },
    { item: '당근', unit: 'g' },
    { item: '오렌지', unit: 'g' },
    { item: '포도', unit: 'g' },
    { item: '상자', unit: 'g' },
    { item: '가방', unit: 'g' }
  ],
  FRACTION_CONTEXTS: [
    { item: '빵', total: 12 },
    { item: '피자', total: 8 },
    { item: '케이크', total: 16 },
    { item: '초콜릿', total: 20 },
    { item: '스티커', total: 15 }
  ],
  SHAPE_CONTEXTS: [
    { shape: '정삼각형', sides: 3 },
    { shape: '정사각형', sides: 4 },
    { shape: '정오각형', sides: 5 },
    { shape: '정육각형', sides: 6 }
  ],
  LOGIC_CONTEXTS: [
    { type: '순서', description: '줄 서기' },
    { type: '비교', description: '크기 비교' },
    { type: '거꾸로 계산', description: '역연산' },
    { type: '규칙', description: '패턴 찾기' },
    { type: '조건', description: '조건 만족' }
  ],
  PLACES: ['박물관', '도서관', '공원', '수영장', '영화관', '학교', '학급', '동아리실', '체육관', '음악실']
};

// 검증 함수
function validateTemplate(template) {
  const errors = [];
  const warnings = [];

  // 필수 필드 확인
  if (!template.id) errors.push('Missing id');
  if (!template.grade) errors.push('Missing grade');
  if (!template.unit) errors.push('Missing unit');
  if (!template.difficulty) errors.push('Missing difficulty');
  if (!template.tags || !Array.isArray(template.tags)) errors.push('Missing or invalid tags');
  if (!template.skill) warnings.push('Missing skill description');
  if (!template.generate || typeof template.generate !== 'function') errors.push('Missing or invalid generate function');

  // generate 함수 테스트
  if (template.generate && typeof template.generate === 'function') {
    try {
      const problem = template.generate(context);
      
      // 생성된 문제 필드 확인
      if (!problem.q) errors.push('Generated problem missing question (q)');
      if (!problem.ans) errors.push('Generated problem missing answer (ans)');
      if (!problem.exp) errors.push('Generated problem missing explanation (exp)');
      if (!problem.hint) warnings.push('Generated problem missing hint');
      if (!problem.equation) warnings.push('Generated problem missing equation');
      if (!problem.answerType) warnings.push('Generated problem missing answerType');

      // 식과 정답의 일치 여부 검증 (간단한 수식만)
      if (problem.equation && problem.ans) {
        try {
          const eqResult = eval(problem.equation.replace(/[^0-9+\-*/().,]/g, ''));
          if (problem.answerType === 'number' && String(eqResult) !== problem.ans) {
            warnings.push(`Equation result (${eqResult}) doesn't match answer (${problem.ans})`);
          }
        } catch (e) {
          warnings.push('Could not validate equation');
        }
      }
    } catch (e) {
      errors.push(`Generate function failed: ${e.message}`);
    }
  }

  return { errors, warnings };
}

// 메인 검증 함수
async function validateAll() {
  console.log('=== 문장제 템플릿 자동 검증 시작 ===\n');

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    templates: []
  };

  // grade1-basic.js
  try {
    const basicModule = await import('./src/data/wordProblems/grade1-basic.js');
    const templates = basicModule.grade1BasicTemplates || [];
    
    console.log(`검증: grade1-basic.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade1-basic.js 로드 실패: ${e.message}`);
  }

  // grade1-advanced.js
  try {
    const advancedModule = await import('./src/data/wordProblems/grade1-advanced.js');
    const templates = advancedModule.grade1AdvancedTemplates || [];
    
    console.log(`검증: grade1-advanced.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade1-advanced.js 로드 실패: ${e.message}`);
  }

  // grade2-basic.js
  try {
    const basicModule = await import('./src/data/wordProblems/grade2-basic.js');
    const templates = basicModule.grade2BasicTemplates || [];
    
    console.log(`검증: grade2-basic.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade2-basic.js 로드 실패: ${e.message}`);
  }

  // grade2-advanced.js
  try {
    const advancedModule = await import('./src/data/wordProblems/grade2-advanced.js');
    const templates = advancedModule.grade2AdvancedTemplates || [];
    
    console.log(`검증: grade2-advanced.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade2-advanced.js 로드 실패: ${e.message}`);
  }

  // grade4-basic.js
  try {
    const basicModule = await import('./src/data/wordProblems/grade4-basic.js');
    const templates = basicModule.grade4BasicTemplates || [];
    
    console.log(`검증: grade4-basic.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade4-basic.js 로드 실패: ${e.message}`);
  }

  // grade4-advanced.js
  try {
    const advancedModule = await import('./src/data/wordProblems/grade4-advanced.js');
    const templates = advancedModule.grade4AdvancedTemplates || [];
    
    console.log(`검증: grade4-advanced.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade4-advanced.js 로드 실패: ${e.message}`);
  }

  // grade5-basic.js
  try {
    const basicModule = await import('./src/data/wordProblems/grade5-basic.js');
    const templates = basicModule.grade5BasicTemplates || [];
    
    console.log(`검증: grade5-basic.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade5-basic.js 로드 실패: ${e.message}`);
  }

  // grade5-advanced.js
  try {
    const advancedModule = await import('./src/data/wordProblems/grade5-advanced.js');
    const templates = advancedModule.grade5AdvancedTemplates || [];
    
    console.log(`검증: grade5-advanced.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade5-advanced.js 로드 실패: ${e.message}`);
  }

  // grade6-basic.js
  try {
    const basicModule = await import('./src/data/wordProblems/grade6-basic.js');
    const templates = basicModule.grade6BasicTemplates || [];
    
    console.log(`검증: grade6-basic.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade6-basic.js 로드 실패: ${e.message}`);
  }

  // grade6-advanced.js
  try {
    const advancedModule = await import('./src/data/wordProblems/grade6-advanced.js');
    const templates = advancedModule.grade6AdvancedTemplates || [];
    
    console.log(`검증: grade6-advanced.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade6-advanced.js 로드 실패: ${e.message}`);
  }

  // grade3-addition-subtraction.js
  try {
    const addSubModule = await import('./src/data/wordProblems/grade3-addition-subtraction.js');
    const templates = addSubModule.grade3AdditionSubtractionTemplates || [];
    
    console.log(`검증: grade3-addition-subtraction.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade3-addition-subtraction.js 로드 실패: ${e.message}`);
  }

  // grade3-multiplication-division.js
  try {
    const mulDivModule = await import('./src/data/wordProblems/grade3-multiplication-division.js');
    const templates = mulDivModule.grade3MultiplicationDivisionTemplates || [];
    
    console.log(`검증: grade3-multiplication-division.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade3-multiplication-division.js 로드 실패: ${e.message}`);
  }

  // grade3-time-length-weight.js
  try {
    const timeWeightModule = await import('./src/data/wordProblems/grade3-time-length-weight.js');
    const templates = timeWeightModule.grade3TimeLengthWeightTemplates || [];
    
    console.log(`검증: grade3-time-length-weight.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade3-time-length-weight.js 로드 실패: ${e.message}`);
  }

  // grade3-fraction-shape.js
  try {
    const fracShapeModule = await import('./src/data/wordProblems/grade3-fraction-shape.js');
    const templates = fracShapeModule.grade3FractionShapeTemplates || [];
    
    console.log(`검증: grade3-fraction-shape.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade3-fraction-shape.js 로드 실패: ${e.message}`);
  }

  // grade3-logic-card.js
  try {
    const logicCardModule = await import('./src/data/wordProblems/grade3-logic-card.js');
    const templates = logicCardModule.grade3LogicCardTemplates || [];
    
    console.log(`검증: grade3-logic-card.js (${templates.length}개 템플릿)`);
    
    templates.forEach(template => {
      results.total++;
      const { errors, warnings } = validateTemplate(template);
      
      if (errors.length === 0) {
        results.passed++;
      } else {
        results.failed++;
      }
      
      results.templates.push({
        id: template.id,
        errors,
        warnings,
        status: errors.length === 0 ? 'PASS' : 'FAIL'
      });
    });
  } catch (e) {
    console.error(`grade3-logic-card.js 로드 실패: ${e.message}`);
  }

  // 결과 출력
  console.log('\n=== 검증 결과 ===');
  console.log(`전체: ${results.total}`);
  console.log(`통과: ${results.passed}`);
  console.log(`실패: ${results.failed}`);
  console.log(`성공률: ${((results.passed / results.total) * 100).toFixed(1)}%`);

  // 실패 및 경고 상세 출력
  const failedTemplates = results.templates.filter(t => t.status === 'FAIL');
  if (failedTemplates.length > 0) {
    console.log('\n=== 실패한 템플릿 ===');
    failedTemplates.forEach(t => {
      console.log(`\n${t.id}:`);
      t.errors.forEach(e => console.log(`  ERROR: ${e}`));
      t.warnings.forEach(w => console.log(`  WARNING: ${w}`));
    });
  }

  const warningTemplates = results.templates.filter(t => t.warnings.length > 0 && t.status === 'PASS');
  if (warningTemplates.length > 0) {
    console.log('\n=== 경고가 있는 템플릿 (통과) ===');
    warningTemplates.forEach(t => {
      console.log(`\n${t.id}:`);
      t.warnings.forEach(w => console.log(`  WARNING: ${w}`));
    });
  }

  // 결과 파일 저장
  const reportPath = './validation-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n상세 보고서가 ${reportPath}에 저장되었습니다.`);

  // 종료 코드
  process.exit(results.failed > 0 ? 1 : 0);
}

validateAll();
