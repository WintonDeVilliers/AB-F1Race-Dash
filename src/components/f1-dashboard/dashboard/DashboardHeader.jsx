import { useState, useEffect } from 'react';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader({ activeTab = 'total', setActiveTab = () => {} }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'total', label: 'Championship Progress', icon: '🏆' },
    { id: 'team', label: 'Team Racing', icon: '🏎️' }
    // { id: 'monaco', label: 'Circuit de Monaco', icon: '🏁' },
    // { id: 'kyalami', label: 'Kyalami Grand Prix', icon: '🏁' }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.f1Logo}>F1</div>
          <div className={styles.title}>Sales Racing Dashboard</div>
        </div>
        
        <nav className={styles.nav}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.navButton} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`nav-${tab.id}`}
            >
              <span className={styles.navIcon}>{tab.icon}</span>
              <span className={styles.navLabel}>{tab.label}</span>
            </button>
          ))}
        </nav>


      </div>
    </header>
  );
}