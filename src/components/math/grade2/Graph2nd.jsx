import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, BarChart3, HelpCircle, CheckCircle, Trophy, RefreshCw } from 'lucide-react';
import { updateCoins } from '../../../utils/storage/storageManager';
import styles from './Graph2nd.module.css';

const SNACKS = [
  { id: 'cookie', name: '쿠키', emoji: '🍪', color: '#ff7675' },
  { id: 'candy', name: '사탕', emoji: '🍬', color: '#fdcb6e' },
  { id: 'icecream', name: '아이스크림', emoji: '🍦', color: '#74b9ff' },
  { id: 'fruit', name: '과일', emoji: '🍎', color: '#55efc4' }
];

const Graph2nd = () => {
  const [data, setData] = useState([]);
  const [userBars, setUserBars] = useState({ cookie: 0, candy: 0, icecream: 0, fruit: 0 });
  const [currentStep, setCurrentStep] = useState(1); // 1: Draw Graph, 2: Interpret
  const [interpretQuiz, setInterpretQuiz] = useState({ question: '', options: [], answer: null });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const initGame = () => {
    const newData = SNACKS.map(snack => ({
      ...snack,
      count: Math.floor(Math.random() * 8) + 2 // 2 to 9
    }));
    setData(newData);
    setUserBars({ cookie: 0, candy: 0, icecream: 0, fruit: 0 });
    setCurrentStep(1);
    setSelectedOption(null);
    setIsFinished(false);
    setScore(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleBarClick = (id) => {
    if (currentStep !== 1) return;
    setUserBars(prev => ({
      ...prev,
      [id]: (prev[id] + 1) % 11 // Max 10
    }));
  };

  const checkGraph = () => {
    const isCorrect = data.every(snack => userBars[snack.id] === snack.count);
    if (isCorrect) {
      setScore(s => s + 50);
      updateCoins(20);
      generateInterpretQuiz();
      setCurrentStep(2);
    } else {
      alert('막대그래프의 높이가 표와 달라요. 다시 확인해보세요!');
    }
  };

  const generateInterpretQuiz = () => {
    const questions = [
      {
        question: '가장 많은 학생들이 좋아하는 간식은 무엇일까요?',
        answer: [...data].sort((a, b) => b.count - a.count)[0].name
      },
      {
        question: '가장 적은 학생들이 좋아하는 간식은 무엇일까요?',
        answer: [...data].sort((a, b) => a.count - b.count)[0].name
      }
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];
    setInterpretQuiz({
      question: q.question,
      options: SNACKS.map(s => s.name),
      answer: q.answer
    });
  };

  const checkInterpret = () => {
    if (selectedOption === interpretQuiz.answer) {
      setScore(s => s + 50);
      updateCoins(30);
      setIsFinished(true);
    } else {
      alert('정답이 아니에요. 그래프를 다시 천천히 살펴보세요.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>우리 반 <span>간식 조사</span></h1>

      {!isFinished ? (
        <div className={styles.mainGrid}>
          <section className={styles.dataCard}>
            <h2 className={styles.sectionTitle}><ClipboardList color="#6c5ce7" /> 1. 조사 결과 (표)</h2>
            <table className={styles.snackTable}>
              <thead>
                <tr>
                  <th>간식</th>
                  <th>좋아하는 학생 수</th>
                </tr>
              </thead>
              <tbody>
                {data.map(snack => (
                  <tr key={snack.id} className={styles.tableRow}>
                    <td>{snack.emoji} {snack.name}</td>
                    <td>{snack.count}명</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className={styles.graphArea}>
            <h2 className={styles.sectionTitle}><BarChart3 color="#6c5ce7" /> 2. 막대그래프 그리기</h2>
            <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '1rem' }}>막대를 클릭해서 높이를 맞춰보세요!</p>
            
            <div className={styles.chartContainer}>
              <div className={styles.yAxisLabel}>
                <span>10</span>
                <span>5</span>
                <span>0</span>
              </div>
              {SNACKS.map(snack => (
                <div key={snack.id} className={styles.barWrapper} onClick={() => handleBarClick(snack.id)} style={{ cursor: currentStep === 1 ? 'pointer' : 'default', position: 'relative' }}>
                  <motion.div 
                    className={styles.interactiveBar}
                    style={{ backgroundColor: snack.color }}
                    animate={{ height: `${userBars[snack.id] * 25}px` }}
                  >
                    <span className={styles.barValue}>{userBars[snack.id]}</span>
                  </motion.div>
                  <span className={styles.barLabel}>{snack.emoji}</span>
                </div>
              ))}
            </div>

            {currentStep === 1 && (
              <button className={styles.submitBtn} onClick={checkGraph}>그래프 완성!</button>
            )}
          </section>

          {currentStep === 2 && (
            <motion.section 
              className={styles.quizSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ gridColumn: '1 / span 2' }}
            >
              <h2 className={styles.sectionTitle}><HelpCircle color="#6c5ce7" /> 3. 그래프 해석하기</h2>
              <div className={styles.questionItem}>
                <p className={styles.questionText}>{interpretQuiz.question}</p>
                <div className={styles.optionsGrid}>
                  {interpretQuiz.options.map(option => (
                    <button 
                      key={option}
                      className={`${styles.optionBtn} ${selectedOption === option ? styles.selected : ''}`}
                      onClick={() => setSelectedOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <button className={styles.submitBtn} onClick={checkInterpret} disabled={!selectedOption}>정답 확인</button>
            </motion.section>
          )}
        </div>
      ) : (
        <motion.div 
          className={styles.container} 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: 'center', boxShadow: 'none' }}
        >
          <Trophy size={100} color="#f1c40f" style={{ margin: '0 auto 2rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>최고예요! 그래프 박사님!</h2>
          <p style={{ fontSize: '1.2rem', color: '#718096' }}>표를 보고 그래프를 완벽하게 해석했어요.</p>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: '#6c5ce7', margin: '2rem 0' }}>{score}점</div>
          <button className={styles.submitBtn} style={{ maxWidth: '300px', margin: '0 auto' }} onClick={initGame}>
            <RefreshCw size={20} style={{ marginRight: '8px' }} /> 다시 하기
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Graph2nd;
