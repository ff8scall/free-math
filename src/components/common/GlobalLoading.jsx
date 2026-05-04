import React from 'react';
import styles from './GlobalLoading.module.css';

const GlobalLoading = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner}></div>
            <p className={styles.text}>열심히 불러오는 중이에요... 🏃‍♂️💨</p>
        </div>
    );
};

export default GlobalLoading;
