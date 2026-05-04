import React from 'react';
import styles from './ParentAdBanner.module.css';

/**
 * 학부모 대상 광고 배너 (AdSense 등 연동 전 플레이스홀더)
 * 아이들의 학습 화면에는 노출되지 않도록 학부모 라우트에만 삽입합니다.
 */
const ParentAdBanner = () => {
    return (
        <div className={styles.adContainer}>
            <div className={styles.adPlaceholder}>
                <span className={styles.adBadge}>AD</span>
                <p className={styles.adText}>교육 전문 도서 추천! "초등 수학, 어떻게 가르칠까?"</p>
                <button className={styles.adButton}>자세히 보기</button>
            </div>
            {/* 
              실제 구글 애드센스 적용 시 아래 코드 주석 해제 및 적용
              <ins className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="XXXXXXXXXX"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
            */}
        </div>
    );
};

export default ParentAdBanner;
