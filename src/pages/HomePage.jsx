import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStorageData, checkDailyReset } from '../utils/storage/storageManager';
import BadgeInventory from '../components/common/BadgeInventory';
import RankingBoard from '../components/common/RankingBoard';
import PetWidget from '../components/common/PetWidget';
import DailyQuestWidget from '../components/common/DailyQuestWidget';
import { JsonLd } from '../components/seo/JsonLd';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [data, setData] = useState(getStorageData());

    useEffect(() => {
        // 앱 진입 시(홈페이지 마운트 시) 일일 초기화 로직 체크
        const resetOccurred = checkDailyReset();
        if (resetOccurred) {
            setData(getStorageData());
        }

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
            
            {/* 상단 히어로 섹션: 개인화 대시보드 */}
            <header className={styles.hero}>
                <div className={styles.heroContent}>
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={styles.welcomeText}
                    >
                        <h1 className={styles.title}>오늘도 수학 여행 떠나볼까? 🎒</h1>
                        <p className={styles.subtitle}>
                            {data.userName}님, 반갑습니다! 수학 실력을 키우고 펫과 성장해 보세요.
                        </p>
                    </motion.div>

                    <div className={styles.heroWidgets}>
                        <PetWidget selectedPet={data.selectedPet} activeBuffs={data.activeBuffs} />
                        
                        {/* 학습 이어하기 버튼 (동적 노출) */}
                        {data.lastLearned && (
                            <motion.a 
                                href={data.lastLearned.path}
                                className={styles.continueButton}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className={styles.continueLabel}>지난 학습 이어하기 ➔</span>
                                <span className={styles.continueTitle}>{data.lastLearned.title}</span>
                            </motion.a>
                        )}
                    </div>
                </div>

                <div className={styles.ctaArea}>
                    <a href="/grade-selection" className={styles.primaryCta}>
                        수학 탐험 시작하기 🚀
                    </a>
                </div>
            </header>

            <div className={styles.dashboardGrid}>
                {/* 메인 컬럼: 학생 성장 데이터 */}
                <section className={styles.mainSection}>
                    <div className={styles.cardGroup}>
                        <div className={styles.statsCard}>
                            <div className={styles.levelBadge}>Lv. {data.level || 1}</div>
                            <div className={styles.xpInfo}>
                                <div className={styles.xpBar}>
                                    <motion.div 
                                        className={styles.xpProgress} 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(data.xp % 1000) / 10}%` }}
                                        transition={{ duration: 1 }}
                                    ></motion.div>
                                </div>
                                <span className={styles.xpLabel}>{(data.xp || 0) % 1000} / 1000 XP (다음 레벨까지)</span>
                            </div>
                        </div>

                        <div className={styles.badgeSection}>
                            <BadgeInventory ownedBadges={data.badges || []} />
                        </div>
                    </div>

                    <div className={styles.rankingSection}>
                        <RankingBoard myData={data} />
                    </div>
                </section>
                
                {/* 사이드 컬럼: 일일 퀘스트, 빠른 메뉴 및 학부모 도구 */}
                <aside className={styles.sideSection}>
                    <DailyQuestWidget />
                    
                    <div className={styles.menuCard}>
                        <h4>나의 공간 🏠</h4>
                        <div className={styles.linkList}>
                            <a href="/myroom" className={styles.menuLink}>내 펫방 꾸미기</a>
                            <a href="/shop" className={styles.menuLink}>아이템 상점</a>
                        </div>
                    </div>

                    <div className={`${styles.menuCard} ${styles.parentCard}`}>
                        <h4>학부모님 전용 도구 📋</h4>
                        <p className={styles.cardDesc}>아이와 함께하는 수학 시간</p>
                        <div className={styles.linkList}>
                            <a href="/grade/3/worksheet" className={styles.parentLink}>연산 학습지 출력하기</a>
                            <a href="/grade/3/word-problem-worksheet" className={styles.parentLink}>문장제 문제지 생성</a>
                            <a href="/parent" className={styles.parentLink}>학습 리포트 보기</a>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default HomePage;
