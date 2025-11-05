import styles from './LiveTiming.module.css';

export default function LiveTiming({ circuit, consultants }) {
  // Show top 10 performers in timing board format
  const topPerformers = (consultants || []).slice(0, 10);

  const getStatusColor = (achievementRate) => {
    if (achievementRate >= 120) return '#22c55e';
    if (achievementRate >= 100) return '#3b82f6';
    if (achievementRate >= 80) return '#f59e0b';
    if (achievementRate >= 60) return '#f97316';
    return '#ef4444';
  };

  const getStatusText = (achievementRate) => {
    if (achievementRate >= 120) return 'SUPERSTAR';
    if (achievementRate >= 100) return 'TARGET HIT';
    if (achievementRate >= 80) return 'ON TRACK';
    if (achievementRate >= 60) return 'BOOST NEEDED';
    return 'RECOVERY';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          🏁 LIVE TIMING - {circuit.toUpperCase()}
        </h3>
        <div className={styles.subtitle}>
          Championship Standings • Real-time Performance
        </div>
      </div>

      <div className={styles.timingBoard}>
        <div className={styles.headerRow}>
          <div className={styles.headerCell}>POS</div>
          <div className={styles.headerCell}>DRIVER</div>
          <div className={styles.headerCell}>TEAM</div>
          <div className={styles.headerCell}>PERFORMANCE</div>
          <div className={styles.headerCell}>STATUS</div>
          <div className={styles.headerCell}>APPS</div>
        </div>

        {topPerformers.map((consultant, index) => {
          const consultantName = consultant.consultantName || consultant.name || 'Unknown';
          const achievement = consultant.salesAchievement || consultant.achievementRate || 0;
          const totalApps = consultant.totalApps || 0;
          
          return (
            <div 
              key={consultant.id || index} 
              className={styles.timingRow}
              data-testid={`timing-row-${consultant.id || index}`}
            >
              <div className={styles.positionCell}>
                <span 
                  className={styles.positionNumber}
                  style={{ 
                    backgroundColor: index < 3 ? '#ff6b35' : 'rgba(255, 255, 255, 0.1)' 
                  }}
              >
                {index + 1}
              </span>
            </div>
            
            <div className={styles.driverCell}>
              <span className={styles.driverName}>
                {consultantName}
              </span>
            </div>
            
            <div className={styles.teamCell}>
              <span className={styles.teamName}>
                {consultant.supervisorName || consultant.team || 'Unknown'}
              </span>
            </div>
            
            <div className={styles.performanceCell}>
              <span 
                className={styles.performanceValue}
                style={{ color: getStatusColor(achievement) }}
              >
                {achievement.toFixed(1)}%
              </span>
            </div>
            
            <div className={styles.statusCell}>
              <span 
                className={styles.statusBadge}
                style={{ 
                  backgroundColor: getStatusColor(achievement),
                  color: '#ffffff'
                }}
              >
                {getStatusText(achievement)}
              </span>
            </div>
            
            <div className={styles.appsCell}>
              <span className={styles.appsValue}>
                {consultant.totalRealAppsVol || totalApps}
              </span>
            </div>
          </div>
          );
        })}
      </div>

      {(consultants || []).length === 0 && (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🏁</span>
          <p className={styles.emptyText}>No drivers on track</p>
        </div>
      )}
    </div>
  );
}