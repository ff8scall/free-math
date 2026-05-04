import React from 'react';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Route Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.container}>
                    <h2>앗! 페이지를 불러오는 중에 문제가 발생했어요. 😅</h2>
                    <p>새로고침을 하거나 잠시 후 다시 시도해 주세요.</p>
                    <button onClick={() => window.location.reload()} className={styles.button}>
                        새로고침 하기
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
