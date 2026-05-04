import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Shapes, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { updateCoins } from '../../../utils/storage/storageManager';
import styles from './Patterns2nd.module.css';

const Patterns2nd = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentPattern, setCurrentPattern] = useState([]);
  const [answer, setAnswer] = useState('');
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [mode, setMode] = useState('number'); // 'number' or 'shape'
  const [gameFinished, setGameFinished] = useState(false);

  const generatePattern = () => {
    const isNumberMode = Math.random() > 0.5;
    setMode(isNumberMode ? 'number' : 'shape');

    if (isNumberMode) {
      // 2학년 수준: +2, +5, +10, -2 등 일정한 차이
      const start = Math.floor(Math.random() * 20) + 1;
      const step = [2, 3, 5, 10][Math.floor(Math.random() * 4)];
      const isPlus = Math.random() > 0.3 || start < 10;
      
      const pattern = [];
      for (let i = 0; i < 4; i++) {
        pattern.push(isPlus ? start + step * i : start - step * i);
      }
      setCurrentPattern(pattern);
      setAnswer(isPlus ? start + step * 4 : start - step * 4);
    } else {
      // 도형 패턴: 회전 (90도씩)
      const shapes = ['▲', '▶', '▼', '◀'];
      const startIndex = Math.floor(Math.random() * 4);
      const pattern = [];
      for (let i = 0; i < 4; i++) {
        pattern.push(shapes[(startIndex + i) % 4]);
      }
      setCurrentPattern(pattern);
      setAnswer(shapes[(startIndex + 4) % 4]);
    }

    setUserInput('');
    setFeedback(null);
  };

  useEffect(() => {
    generatePattern();
  }, []);

  const handleCheck = () => {
    const isCorrect = userInput.toString() === answer.toString();
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({ type: 'success', text: '정답입니다! 규칙을 잘 찾았어요. (+15코인)' });
      updateCoins(15);
    } else {
      setFeedback({ type: 'error', text: `아쉬워요. 정답은 ${answer}였어요.` });
    }
  };

  const handleNext = () => {
    if (level < 5) {
      setLevel(l => l + 1);
      generatePattern();
    } else {
      setGameFinished(true);
    }
  };

  const restart = () => {
    setLevel(1);
    setScore(0);
    setGameFinished(false);
    generatePattern();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔍 똑똑한 규칙 찾기</h1>
      <p className={styles.description}>숫자와 모양 속에 숨겨진 규칙을 찾아 빈칸을 채워보세요!</p>

      {!gameFinished ? (
        <div className={styles.gameCard}>
          <div className={styles.modeBadge}>
            {mode === 'number' ? <><Hash size={16} /> 숫자 규칙</> : <><Shapes size={16} /> 모양 규칙</>}
          </div>

          <div className={styles.displayArea}>
            {currentPattern.map((item, idx) => (
              <motion.div 
                key={idx}
                className={mode === 'number' ? styles.numberItem : styles.shapeItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
            <motion.div 
              className={`${mode === 'number' ? styles.numberItem : styles.shapeItem} styles.emptySlot`}
              animate={{ borderColor: ['#dfe6e9', '#e17055', '#dfe6e9'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ borderStyle: 'dashed', color: '#e17055' }}
            >
              ?
            </motion.div>
          </div>

          <div className={styles.inputSection}>
            <input 
              type="text"
              className={styles.inputField}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="정답"
              disabled={!!feedback}
              onKeyPress={(e) => e.key === 'Enter' && !feedback && handleCheck()}
            />
            {!feedback ? (
              <button 
                className={styles.checkBtn}
                onClick={handleCheck}
                disabled={!userInput}
              >
                확인
              </button>
            ) : (
              <button 
                className={styles.checkBtn}
                onClick={handleNext}
                style={{ backgroundColor: '#0984e3' }}
              >
                {level < 5 ? '다음 문제' : '결과 보기'} <ArrowRight size={18} />
              </button>
            )}
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div 
                className={styles.feedbackArea}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  backgroundColor: feedback.type === 'success' ? '#e8fcf6' : '#fff5f5',
                  color: feedback.type === 'success' ? '#00b894' : '#ff7675'
                }}
              >
                {feedback.type === 'success' ? <CheckCircle2 size={24} inline /> : <XCircle size={24} inline />}
                <span style={{ marginLeft: '10px' }}>{feedback.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>레벨</span>
              <span className={styles.statValue}>{level} / 5</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>맞힌 점수</span>
              <span className={styles.statValue}>{score * 20}점</span>
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          className={styles.gameCard}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <Trophy size={100} color="#f1c40f" style={{ margin: '0 auto 1.5rem' }} />
          <h2>대단해요! 규칙 마스터!</h2>
          <p>모든 문제를 완료했습니다.</p>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: '#e17055', margin: '1.5rem 0' }}>
            {score * 20}점
          </div>
          <button className={styles.checkBtn} onClick={restart}>
            <RefreshCw size={20} /> 다시 도전하기
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Patterns2nd;
