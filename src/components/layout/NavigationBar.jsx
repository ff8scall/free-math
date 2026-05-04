import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, ShoppingBag } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
    const location = useLocation();
    const { userData } = useUser();

    const navItems = [
        { path: '/', label: '홈', icon: <Home size={24} /> },
        { path: '/grade-selection', label: '학년', icon: <Trophy size={24} /> },
        { path: '/myroom', label: '내 방', icon: <ShoppingBag size={24} /> },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">매쓰 펫토리</Link>
            </div>
            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <li key={item.path} className={location.pathname === item.path ? styles.active : ''}>
                        <Link to={item.path}>
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationBar;
