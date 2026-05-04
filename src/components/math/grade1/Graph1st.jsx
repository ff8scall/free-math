import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, BarChart2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { updateCoins } from '../../../utils/storage/storageManager';
import styles from './Graph1st.module.css';

const FRUITS = [
  { id: 'apple', emoji: '🍎', color: '#ff7675' },
  { id: 'banana', emoji: '🍌', color: '#fdcb6e' },
  { id: 'grape', emoji: '🍇', color: '#a29bfe' },
  { id: 'orange', emoji: '🍊', color: '#fab1a0' }
];

const Graph1st = () => {
  const [basket, setBasket] = useState([]);
  const [counts, setCounts] = useState({ apple: 0, banana: 0, grape: 0, orange: 0 });
  const [userInputs, setUserInputs] = useState({ apple: '', banana: '', grape: '', orange: '' });
  const [validation, setValidation] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const initGame = () => {
    const newBasket = [];
    const newCounts = { apple: 0, banana: 0, grape: 0, orange: 0 };
    
    // Generate 8-12 fruits
    const totalFruits = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < totalFruits; i++) {
      const fruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];
      newBasket.push(fruit);
      newCounts[fruit.id]++;
    }

    setBasket(newBasket);
    setCounts(newCounts);
    setUserInputs({ apple: '', banana: '', grape: '', orange: '' });
    setValidation({});
    setIsSubmitted(false);
    setFeedback(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleInputChange = (id, value) => {
    if (isSubmitted) return;
    setUserInputs(prev => ({ ...prev, [id]: value }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    const newValidation = {};
    
    FRUITS.forEach(fruit => {
      const isCorrect = parseInt(userInputs[fruit.id]) === counts[fruit.id];
      newValidation[fruit.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (correctCount === FRUITS.length) {
      setFeedback({ type: 'success', text: '참 잘했어요! 모든 숫자를 정확하게 찾았네요. (+20코인)' });
      updateCoins(20);
    } else {
      setFeedback({ type: 'error', text: '틀린 부분이 있어요. 과일을 다시 한번 잘 세어볼까요?' });
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1 
          className={styles.title}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          📊 표와 그래프 공부
        </motion.h1>
        <p className={styles.subtitle}>바구니에 담긴 과일을 세어보고 표와 그래프를 완성해봐요!</p>
      </header>

      <div className={styles.contentGrid}>
        <section className={styles.observationArea}>
          <h2 className={styles.sectionTitle}>과일 바구니</h2>
          <div className={styles.fruitBox}>
            {basket.map((fruit, index) => (
              <motion.span
                key={index}
                className={styles.fruitItem}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.05, type: 'spring' }}
              >
                {fruit.emoji}
              </motion.span>
            ))}
          </div>
        </section>

        <section className={styles.workArea}>
          <div className={styles.tableSection}>
            <h2 className={styles.sectionTitle}><Table size={20} /> 1. 표 완성하기</h2>
            <table className={styles.dataTable}>
              <tbody>
                {FRUITS.map(fruit => (
                  <tr key={fruit.id} className={styles.tableRow}>
                    <td>{fruit.emoji}</td>
                    <td>
                      <input
                        type="number"
                        className={`${styles.numberInput} ${
                          isSubmitted ? (validation[fruit.id] ? styles.correct : styles.wrong) : ''
                        }`}
                        value={userInputs[fruit.id]}
                        onChange={(e) => handleInputChange(fruit.id, e.target.value)}
                        placeholder="?"
                        disabled={isSubmitted}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.graphSection}>
            <h2 className={styles.sectionTitle}><BarChart2 size={20} /> 2. 막대그래프 보기</h2>
            <div className={styles.graphContainer}>
              {FRUITS.map(fruit => (
                <div key={fruit.id} className={styles.barWrapper}>
                  <motion.div 
                    className={styles.bar}
                    style={{ backgroundColor: fruit.color }}
                    initial={{ height: 0 }}
                    animate={{ height: isSubmitted ? `${counts[fruit.id] * 20}px` : 0 }}
                  />
                  <span className={styles.barLabel}>{fruit.emoji}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className={styles.controls}>
        {!isSubmitted ? (
          <button 
            className={styles.checkBtn} 
            onClick={checkAnswers}
            disabled={Object.values(userInputs).some(v => v === '')}
          >
            정답 확인하기
          </button>
        ) : (
          <button className={styles.checkBtn} onClick={initGame} style={{ backgroundColor: '#0984e3' }}>
            <RefreshCw size={20} style={{ marginRight: '8px' }} /> 다시 하기
          </button>
        )}

        <AnimatePresence>
          {feedback && (
            <motion.div 
              className={styles.feedback}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                backgroundColor: feedback.type === 'success' ? '#e8fcf6' : '#fff5f5',
                color: feedback.type === 'success' ? '#00b894' : '#ff7675'
              }}
            >
              {feedback.type === 'success' ? <CheckCircle2 style={{ verticalAlign: 'middle', marginRight: '8px' }} /> : <AlertCircle style={{ verticalAlign: 'middle', marginRight: '8px' }} />}
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Graph1st;
