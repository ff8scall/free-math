import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStorageData, completeDailyQuest } from '../../utils/storage/storageManager';
import styles from './DailyQuestWidget.module.css';
import confetti from 'canvas-confetti';

const quests = [
    { id: 'attendance', label: '오늘도 출석했어요! 🎒', reward: 10 },
    { id: 'study', label: '수학 탐험 1회 완수 🚀', reward: 20 },
    { id: 'feedPet', label: '펫에게 맛있는 간식 주기 🦴', reward: 15 }
];

const DailyQuestWidget = () => {
    const [data, setData] = useState(getStorageData());
    const [justCompleted, setJustCompleted] = useState(null);

    useEffect(() => {
        const handleUpdate = () => setData(getStorageData());
        window.addEventListener('storage-update', handleUpdate);
        return () => window.removeEventListener('storage-update', handleUpdate);
    }, []);

    const handleClaim = (questId) => {
        if (data.dailyQuests && data.dailyQuests[questId]) return;

        // 특별히 '출석' 퀘스트는 이 화면에서 버튼을 누르면 달성되도록 처리
        if (questId === 'attendance') {
            const success = completeDailyQuest(questId);
            if (success) {
                setJustCompleted(questId);
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
                setTimeout(() => setJustCompleted(null), 2000);
            }
        }
    };

    const dailyQuests = data.dailyQuests || { attendance: false, study: false, feedPet: false };
    const streak = data.streak || 1;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4 className={styles.title}>오늘의 퀘스트 📜</h4>
                <div className={styles.streakBadge}>🔥 {streak}일째 연속 출석!</div>
            </div>
            
            <ul className={styles.questList}>
                {quests.map(q => {
                    const isDone = dailyQuests[q.id];
                    const canClaim = q.id === 'attendance' && !isDone;
                    
                    return (
                        <motion.li 
                            key={q.id} 
                            className={`${styles.questItem} ${isDone ? styles.done : ''}`}
                            animate={justCompleted === q.id ? { scale: [1, 1.05, 1], backgroundColor: '#eebefa' } : {}}
                        >
                            <div className={styles.questInfo}>
                                <span className={styles.icon}>{isDone ? '✅' : '⏳'}</span>
                                <span className={styles.label}>{q.label}</span>
                            </div>
                            
                            {canClaim ? (
                                <button className={styles.claimButton} onClick={() => handleClaim(q.id)}>
                                    받기
                                </button>
                            ) : (
                                <div className={styles.rewardBox}>
                                    <span className={styles.rewardText}>+{q.reward}</span>
                                    <span className={styles.coinIcon}>💰</span>
                                </div>
                            )}
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DailyQuestWidget;
