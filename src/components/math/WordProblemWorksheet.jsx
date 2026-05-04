import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import PageHeader from '../common/PageHeader';
import ParentAdBanner from '../common/ParentAdBanner';
import styles from './WordProblemWorksheet.module.css';
import { generateProblemData } from '../../utils/math/wordProblemGenerator';
import { getStorageData } from '../../utils/storage/storageManager';

const WordProblemWorksheet = () => {
    const { gradeId } = useParams();
    const [difficulty, setDifficulty] = useState('advanced');
    const [problemCount, setProblemCount] = useState(10); // 기본 10개
    const [problems, setProblems] = useState([]);
    const [date] = useState(new Date().toLocaleDateString('ko-KR'));
    const [userData, setUserData] = useState(getStorageData());

    const generateOneProblem = (grade, diff) => {
        const gradeNum = parseInt(grade) || 1;
        return generateProblemData(gradeNum, diff);
    };

    const generateWorksheet = () => {
        const newProblems = [];
        const currentGrade = gradeId || "1";
        for (let i = 0; i < problemCount; i++) {
            newProblems.push({ id: i + 1, ...generateOneProblem(currentGrade, difficulty) });
        }
        setProblems(newProblems);
    };

    useEffect(() => {
        generateWorksheet();
        setUserData(getStorageData());
    }, [gradeId, difficulty, problemCount]);

    const handlePrint = () => {
        window.print();
    };

    // 한 페이지당 문제 개수
const PROBLEMS_PER_PAGE = 5;

// 문제를 페이지별로 분리
const getPaginatedProblems = () => {
    const pages = [];
    for (let i = 0; i < problems.length; i += PROBLEMS_PER_PAGE) {
        pages.push(problems.slice(i, i + PROBLEMS_PER_PAGE));
    }
    return pages;
};

const paginatedProblems = getPaginatedProblems();

return (
        <div className={styles.container}>
            <div className={styles.noPrint}>
                <PageHeader title={`${gradeId || '1'}학년 ${difficulty === 'advanced' ? '심화 ' : (difficulty === 'basic' ? '기본 ' : '')}문장제 학습지 🖨️`} />
                
                {/* 레벨/XP 카드 */}
                <motion.div 
                    className={styles.levelCard}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className={styles.levelLabel}>🎯 나의 학습 레벨</span>
                    <h2 className={styles.levelValue}>Lv. {userData.level || 1}</h2>
                    <div className={styles.xpBar}>
                        <div className={styles.xpProgress} style={{ width: `${(userData.xp % 1000) / 10}%` }}></div>
                    </div>
                    <span className={styles.xpText}>{(userData.xp || 0) % 1000} / 1000 XP</span>
                </motion.div>

                <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
                    문장형 문제를 종이에 직접 풀며 사고력을 키워보세요. 🐾
                </p>
                
                <div className={styles.configBox}>
                    <label>난이도 선택: </label>
                    <select 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)}
                        className={styles.difficultySelect}
                    >
                        <option value="basic">기본 (원리 이해)</option>
                        <option value="advanced">심화 (사고력 도전)</option>
                        <option value="mixed">무작위 섞기</option>
                    </select>
                    <label style={{ marginLeft: '20px' }}>문제 개수: </label>
                    <select 
                        value={problemCount} 
                        onChange={(e) => setProblemCount(parseInt(e.target.value))}
                        className={styles.difficultySelect}
                    >
                        <option value="5">5문제 (1페이지)</option>
                        <option value="10">10문제 (2페이지)</option>
                        <option value="15">15문제 (3페이지)</option>
                        <option value="20">20문제 (4페이지)</option>
                    </select>
                </div>

                <div className={styles.actions}>
                    <Button onClick={generateWorksheet} variant="secondary">문제 새로 만들기 🔄</Button>
                    <Button onClick={handlePrint} variant="primary">출력 / PDF 저장 🖨️</Button>
                </div>
                
                {/* 광고 배너 (학부모 타겟, 프린트 시 제외됨) */}
                <ParentAdBanner />
            </div>

            {/* 문제 페이지들 */}
            {paginatedProblems.map((pageProblems, pageIndex) => (
                <div key={`page-${pageIndex}`} className={styles.worksheet}>
                    <div className={styles.wsHeader}>
                        <div className={styles.wsTitle}>{gradeId || '1'}학년 수학 심화 문장제 ({pageIndex + 1}/{paginatedProblems.length})</div>
                        <div className={styles.wsMeta}>
                            <span>날짜: {date}</span>
                            <span>이름: ______________</span>
                        </div>
                    </div>

                    <div className={styles.problemList}>
                        {pageProblems.map((p) => (
                            <div key={p.id} className={styles.problemItem}>
                                <div className={styles.problemTop}>
                                    <span className={styles.pNum}>{p.id}.</span>
                                    <div className={styles.pContent}>{p.q}</div>
                                </div>
                                <div className={styles.answerSpace}>
                                    <div className={styles.solutionLine}>식: __________________________________________________</div>
                                    <div className={styles.answerLine}>답: _______________________</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.wsFooter}>
                        매쓰 펫토리(Math Petory) - 문장을 읽고 이해하는 힘!
                    </div>
                </div>
            ))}

            {/* 정답지 */}
            <div className={`${styles.worksheet} ${styles.answerKey}`}>
                <h2 className={styles.wsTitle}>[ 정답지 ]</h2>
                <div className={styles.answerGrid}>
                    {problems.map(p => (
                        <div key={p.id} className={styles.aItem}>
                            <strong>{p.id}번:</strong> {p.ans} ({p.exp})
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WordProblemWorksheet;
