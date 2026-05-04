import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import PageHeader from '../common/PageHeader';
import styles from './MathWorksheet.module.css';
import { getStorageData } from '../../utils/storage/storageManager';

const MathWorksheet = () => {
    const { grade } = useParams();
    const [problemCount, setProblemCount] = useState(20); // 기본 20개
    const [problems, setProblems] = useState([]);
    const [date] = useState(new Date().toLocaleDateString('ko-KR'));
    const [userData, setUserData] = useState(getStorageData());

    const generateProblems = (g) => {
        const newProblems = [];
        const gradeNum = parseInt(g);
        for (let i = 1; i <= problemCount; i++) {
            let q, a;

            if (gradeNum === 1) {
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * 9) + 1;
                if (Math.random() > 0.5) {
                    q = `${n1} + ${n2} = (   )`;
                    a = n1 + n2;
                } else {
                    const max = Math.max(n1, n2);
                    const min = Math.min(n1, n2);
                    q = `${max} - ${min} = (   )`;
                    a = max - min;
                }
            } else if (gradeNum === 2) {
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * 9) + 1;
                q = `${n1} × ${n2} = (   )`;
                a = n1 * n2;
            } else if (gradeNum === 3) {
                const n1 = Math.floor(Math.random() * 800) + 100;
                const n2 = Math.floor(Math.random() * 800) + 100;
                if (Math.random() > 0.5) {
                    q = `${n1} + ${n2} = (   )`;
                    a = n1 + n2;
                } else {
                    const bigger = Math.max(n1, n2);
                    const smaller = Math.min(n1, n2);
                    q = `${bigger} - ${smaller} = (   )`;
                    a = bigger - smaller;
                }
            } else if (gradeNum === 4) {
                const n1 = Math.floor(Math.random() * 900) + 100;
                const n2 = Math.floor(Math.random() * 9) + 2;
                q = `${n1} × ${n2} = (   )`;
                a = n1 * n2;
            } else if (gradeNum === 5) {
                const d1 = Math.floor(Math.random() * 5) + 2;
                const n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
                const d2 = Math.floor(Math.random() * 5) + 2;
                const n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
                q = `${n1}/${d1} + ${n2}/${d2} = (   )`;
                a = "계산해보기";
            } else if (gradeNum === 6) {
                const v1 = (Math.floor(Math.random() * 50) + 10) / 10;
                const v2 = (Math.floor(Math.random() * 8) + 2) / 10;
                q = `${v1} ÷ ${v2} = (   )`;
                a = (v1 / v2).toFixed(1);
            } else {
                q = `수학 연습 문제 ${i}`;
                a = "정답";
            }

            newProblems.push({ id: i, q, a });
        }
        setProblems(newProblems);
    };

    useEffect(() => {
        generateProblems(grade);
        setUserData(getStorageData());
    }, [grade, problemCount]);

    const handlePrint = () => {
        window.print();
    };

    // 한 페이지당 문제 개수
const PROBLEMS_PER_PAGE = 10;

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
                <Link to={`/grade/${grade}`} className={styles.back}>← 돌아가기</Link>
                <PageHeader title={`${grade}학년 수학 연산 학습지 🖨️`} />
                
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
                    연산 연습 문제를 종이에 직접 풀며 계산력을 키워보세요. 🐾
                </p>

                <div className={styles.configBox}>
                    <label>문제 개수: </label>
                    <select 
                        value={problemCount} 
                        onChange={(e) => setProblemCount(parseInt(e.target.value))}
                        className={styles.difficultySelect}
                    >
                        <option value="10">10문제 (1페이지)</option>
                        <option value="20">20문제 (2페이지)</option>
                        <option value="30">30문제 (3페이지)</option>
                        <option value="40">40문제 (4페이지)</option>
                    </select>
                </div>

                <div className={styles.actions}>
                    <Button onClick={() => generateProblems(grade)} variant="secondary">문제 새로 만들기 🔄</Button>
                    <Button onClick={handlePrint} variant="primary">출력 / PDF 저장 🖨️</Button>
                </div>
            </div>

            {/* 문제 페이지들 */}
            {paginatedProblems.map((pageProblems, pageIndex) => (
                <div key={`page-${pageIndex}`} className={styles.worksheet}>
                    <div className={styles.wsHeader}>
                        <div className={styles.wsTitle}>{grade}학년 수학 단원평가 ({pageIndex + 1}/{paginatedProblems.length})</div>
                        <div className={styles.wsMeta}>
                            <span>날짜: {date}</span>
                            <span>이름: ______________</span>
                            <span>점수: ______ / 100</span>
                        </div>
                    </div>

                    <div className={styles.problemGrid}>
                        {pageProblems.map((p) => (
                            <div key={p.id} className={styles.pItem}>
                                <span className={styles.pNum}>{p.id}.</span>
                                <span className={styles.pContent}>{p.q}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.wsFooter}>
                        매쓰 펫토리(Math Petory) - 스스로 공부하는 힘!
                    </div>
                </div>
            ))}

            {/* 정답지 */}
            <div className={`${styles.worksheet} ${styles.answerKey}`}>
                <h2 className={styles.wsTitle}>[ 정답지 ]</h2>
                <div className={styles.answerGrid}>
                    {problems.map(p => (
                        <div key={p.id} className={styles.aItem}>
                            {p.id}번: {p.a}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MathWorksheet;
