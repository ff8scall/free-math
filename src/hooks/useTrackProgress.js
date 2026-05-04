import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateLastLearned } from '../utils/storage/storageManager';

/**
 * 특정 단원 페이지에 진입했을 때 마지막 학습 위치를 자동으로 저장하는 훅
 * @param {string} title - 단원의 제목 (예: '1학년 규칙 찾기')
 */
export const useTrackProgress = (title) => {
    const location = useLocation();

    useEffect(() => {
        // 실제 학습 도구가 있는 경로에서만 저장 (메인, 선택 페이지 등 제외)
        const path = location.pathname;
        if (path.includes('/grade/') && !path.endsWith('/quiz') && !path.endsWith('/worksheet') && !path.endsWith('/game')) {
            updateLastLearned(path, title);
        }
    }, [location.pathname, title]);
};
