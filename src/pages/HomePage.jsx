import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import { getStorageData } from '../utils/storage/storageManager';
import BadgeInventory from '../components/common/BadgeInventory';
import RankingBoard from '../components/common/RankingBoard';
import { JsonLd } from '../components/seo/JsonLd';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [data, setData] = useState(getStorageData());

    useEffect(() => {
        const handleUpdate = () => setData(getStorageData());
        window.addEventListener('storage-update', handleUpdate);
        return () => window.removeEventListener('storage-update', handleUpdate);
    }, []);

    const globalSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "매쓰 펫토리",
            "url": "https://math.lego-sia.com",
            "logo": "https://math.lego-sia.com/favicon.png",
            "description": "초등학교 전학년 수학을 원리로 배우는 혁신적인 학습 플랫폼"
        }
    ];

    return (
        <div className={styles.container}>
            <JsonLd data={globalSchema} />
            
            <header className={styles.hero}>
                <h1 className={styles.title}>오늘도 수학 여행 떠나볼까? 🎒</h1>
                <p className={styles.subtitle}>
                    {data.userName}님, 내 학년을 선택하고 수학을 시작해요!
                </p>
                <div className={styles.ctaArea}>
                    <a href="/grade-selection" className={styles.ctaButton}>
                        내 학년 선택하기
                    </a>
                </div>
            </header>

            <div className={styles.gridSection}>
                <section className={styles.mainCol}>
                    <div className={styles.levelCard}>
                        <span className={styles.levelLabel}>나의 학습 레벨</span>
                        <h2 className={styles.levelValue}>Lv. {data.level || 1}</h2>
                        <div className={styles.xpBar}>
                            <div className={styles.xpProgress} style={{ width: `${(data.xp % 1000) / 10}%` }}></div>
                        </div>
                        <span className={styles.xpText}>{(data.xp || 0) % 1000} / 1000 XP</span>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <BadgeInventory ownedBadges={data.badges || []} />
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <RankingBoard myData={data} />
                    </div>
                </section>
                
                <section className={styles.sideCol}>
                    <div className={styles.quickMenu}>
                        <h4>빠른 메뉴</h4>
                        <a href="/myroom" className={styles.quickLink}>내 펫방 🏠</a>
                        <a href="/shop" className={styles.quickLink}>상점 �</a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
