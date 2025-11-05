import styles from './TrackVisualization.module.css';

export default function LiveTimingBoard({ teams = [], circuit = 'monaco' }) {
  const getPerformanceColor = (achievement) => {
    if (achievement >= 100) return '#22c55e';
    if (achievement >= 80) return '#3b82f6'; 
    if (achievement >= 60) return '#f59e0b';
    if (achievement >= 40) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className={styles.timingBoard}>
      <div className={styles.timingHeader}>
        <span className={styles.positionCol}>POS</span>
        <span className={styles.driverCol}>DRIVER</span>
        <span className={styles.teamCol}>TEAM SIZE</span>
        <span className={styles.timeCol}>ACHIEVEMENT</span>
        <span className={styles.gapCol}>SALES</span>
      </div>
      
      <div className={styles.timingBody}>
        {teams.map((supervisor, index) => {
          const supervisorName = supervisor.supervisorName || supervisor.supervisor_name || supervisor.name || 'Unknown';
          const achievement = supervisor.salesAchievement || supervisor.team_achievement_rate || 0;
          const teamSize = supervisor.teamSize || supervisor.team_size || 0;
          const salesActual = supervisor.totalSalesActual || supervisor.totalSalesVal || supervisor.total_sales || 0;
          
          return (
            <div 
              key={supervisor.id || index}
              className={styles.timingRow}
              data-testid={`timing-row-${index}`}
            >
              <span className={styles.positionCol}>
                <span 
                  className={styles.positionNumber}
                  style={{ color: getPerformanceColor(achievement) }}
                >
                  {index + 1}
                </span>
              </span>
              
              <span className={styles.driverCol}>
                <span className={styles.driverName}>{supervisorName}</span>
              </span>
              
              <span className={styles.teamCol}>
                <span className={styles.teamSize}>{teamSize}</span>
              </span>
              
              <span className={styles.timeCol}>
                <span 
                  className={styles.achievement}
                  style={{ color: getPerformanceColor(achievement) }}
                >
                  {achievement.toFixed(1)}%
                </span>
              </span>
              
              <span className={styles.gapCol}>
                <span className={styles.salesValue}>
                  R{(salesActual / 1000000).toFixed(1)}M
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}