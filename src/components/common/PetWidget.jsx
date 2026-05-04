import React from 'react';
import { motion } from 'framer-motion';
import styles from './PetWidget.module.css';

const PetWidget = ({ selectedPet, activeBuffs }) => {
    const isHappy = activeBuffs && Object.values(activeBuffs).some(expiry => expiry > Date.now());
    
    // 펫이 없으면 기본 펫(알) 표시
    const petEmoji = selectedPet ? (isHappy ? '😺' : '🐱') : '🥚';
    const petStatus = selectedPet ? (isHappy ? '배불러요! 보너스 XP 활성 중 ✨' : '배고파요... 간식을 주세요! 🦴') : '펫을 입양해 보세요!';

    return (
        <motion.div 
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className={styles.avatarArea}>
                <motion.span 
                    className={styles.emoji}
                    animate={isHappy ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    {petEmoji}
                </motion.span>
                {isHappy && <div className={styles.sparkle}>✨</div>}
            </div>
            <div className={styles.infoArea}>
                <h3 className={styles.name}>{selectedPet || '나의 첫 펫'}</h3>
                <p className={styles.status}>{petStatus}</p>
            </div>
        </motion.div>
    );
};

export default PetWidget;
