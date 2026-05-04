import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Circle, Square, Triangle, Heart, Smile, ArrowRight, RefreshCw, Trophy } from 'lucide-react';
import { updateCoins } from '../../../utils/storage/storageManager';
import styles from './Patterns1st.module.css';

const SHAPES = [
  { id: 'star', icon: <Star fill="#fdcb6e" color="#f1c40f" size={40} />, label: '별' },
  { id: 'circle', icon: <Circle fill="#74b9ff" color="#0984e3" size={40} />, label: '동그라미' },
  { id: 'square', icon: <Square fill="#55efc4" color="#00b894" size={40} />, label: '네모' },
  { id: 'triangle', icon: <Triangle fill="#ff7675" color="#d63031" size={40} />, label: '세모' },
  { id: 'heart', icon: <Heart fill="#fd79a8" color="#e84393" size={40} />, label: '하트' },
  { id: 'smile', icon: <Smile fill="#ffeaa7" color="#fdcb6e" size={40} />, label: '웃음' },
];

const Patterns1st = () => {
  const [pattern, setPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);

  const generatePattern = () => {
    // 1학년 수준: A-B-A-B 또는 A-A-B-A-A-B 또는 A-B-C-A-B-C
    const patternTypes = ['ABAB', 'AAB', 'ABC'];
    const type = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    
    const selectedShapes = [...SHAPES].sort(() => 0.5 - Math.random());
    const A = selectedShapes[0];
    const B = selectedShapes[1];
    const C = selectedShapes[2];

    let fullPattern = [];
    let nextItem = null;

    if (type === 'ABAB') {
      fullPattern = [A, B, A, B];
      nextItem = A;
    } else if (type === 'AAB') {
      fullPattern = [A, A, B, A, A];
      nextItem = B;
    } else if (type === 'ABC') {
      fullPattern = [A, B, C, A, B];
      nextItem = C;
    }

    setPattern(fullPattern);
    setCorrectAnswer(nextItem);
    
    // Generate options including the correct one
    const otherOptions = SHAPES.filter(s => s.id !== nextItem.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    
    setOptions([...otherOptions, nextItem].sort(() => 0.5 - Math.random()));
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generatePattern();
  }, []);

  const handleOptionClick = (option) => {
    if (selectedAnswer) return; // Prevent multiple clicks

    setSelectedAnswer(option.id);
    if (option.id === correctAnswer.id) {
      setIsCorrect(true);
      setScore(s => s + 1);
      updateCoins(10); // Reward for correct answer
    } else {
      setIsCorrect(false);
    }
  };

  const nextRound = () => {
    if (round < 5) {
      setRound(r => r + 1);
      generatePattern();
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setRound(1);
    setScore(0);
    setGameFinished(false);
    generatePattern();
  };

  return (
    <div className={styles.container}>
      <motion.h1 
        className={styles.title}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        🎨 규칙 찾기 놀이
      </motion.h1>
      <p className={styles.description}>다음에 올 모양은 무엇일까요? 규칙을 찾아보세요!</p>

      {!gameFinished ? (
        <div className={styles.gameArea}>
          <div className={styles.patternRow}>
            {pattern.map((item, index) => (
              <motion.div 
                key={index}
                className={styles.item}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.icon}
              </motion.div>
            ))}
            <motion.div 
              className={`${styles.item} ${styles.questionMark}`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ?
            </motion.div>
          </div>

          <div className={styles.options}>
            {options.map((option) => (
              <button
                key={option.id}
                className={`${styles.optionBtn} ${
                  selectedAnswer === option.id 
                    ? (option.id === correctAnswer.id ? styles.correct : styles.wrong) 
                    : ''
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={!!selectedAnswer}
              >
                {option.icon}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.successMessage}
                style={{ background: isCorrect ? '#e8fcf6' : '#fff5f5', color: isCorrect ? '#00b894' : '#ff7675' }}
              >
                {isCorrect ? (
                  <>🎉 정답이에요! 참 잘했어요. (+10코인)</>
                ) : (
                  <>아쉬워요! 다시 한번 생각해보세요. 정답은 '{correctAnswer.label}'였어요.</>
                )}
                <br />
                <button className={styles.nextBtn} onClick={nextRound}>
                  {round < 5 ? '다음 문제' : '결과 보기'} <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.scoreBoard}>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>진행도</span>
              <span className={styles.scoreValue}>{round} / 5</span>
            </div>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>맞힌 개수</span>
              <span className={styles.scoreValue}>{score}</span>
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          className={styles.gameArea}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Trophy size={80} color="#f1c40f" style={{ marginBottom: '1rem' }} />
          <h2>참 잘했어요!</h2>
          <p>5문제 중 {score}문제를 맞혔어요!</p>
          <div className={styles.scoreValue} style={{ fontSize: '3rem', margin: '1rem 0' }}>
            {Math.round((score / 5) * 100)}점
          </div>
          <button className={styles.nextBtn} onClick={restartGame}>
            <RefreshCw size={20} style={{ marginRight: '8px' }} /> 다시 하기
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Patterns1st;
