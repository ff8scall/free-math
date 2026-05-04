import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './GradeSelection.module.css';

const GradeSelection = () => {
    const navigate = useNavigate();
    const grades = [1, 2, 3, 4, 5, 6];

    const gradeDescriptions = {
        1: '수와 덧셈 시작!',
        2: '세 자리 수와 구구단',
        3: '분수와 나눗셈',
        4: '큰 수와 각도',
        5: '약수와 분수',
        6: '비와 비율'
    };

    const handleGradeClick = (grade) => {
        navigate(`/grade/${grade}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>몇 학년 수학을 공부할까요? 🎒</h1>
            <p className={styles.subtitle}>자신의 학년을 선택하고 수학 여행을 떠나요!</p>

            <div className={styles.grid}>
                {grades.map((grade) => (
                    <button
                        key={grade}
                        className={`${styles.card} ${styles.active}`}
                        onClick={() => handleGradeClick(grade)}
                    >
                        <span className={styles.gradeNumber}>{grade}</span>
                        <span className={styles.gradeText}>학년</span>
                        <span className={styles.gradeDesc}>{gradeDescriptions[grade]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GradeSelection;
