import styles from './SupervisorCard.module.css';

export default function SupervisorCard({ supervisor }) {
  if (!supervisor) return null;

  const getPerformanceColor = (level) => {
    switch(level) {
      case 'Superstar': return '#4CAF50';
      case 'Target Achieved': return '#8BC34A';
      case 'On Track': return '#FFC107';
      case 'Needs Boost': return '#FF9800';
      case 'Recovery Mode': return '#F44336';
      default: return '#757575';
    }
  };

  const getRacePosition = (position) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `#${position}`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.position}>
          {getRacePosition(supervisor.position)}
        </div>
        <div className={styles.circuit}>
          {supervisor.circuit === 'Monaco' ? '🇲🇨' : '🇿🇦'} {supervisor.circuit}
        </div>
      </div>

      <div className={styles.driver}>
        <h3 className={styles.driverName}>{supervisor.supervisorName}</h3>
        <div className={styles.driverRole}>DRIVER</div>
        <div 
          className={styles.performanceLevel}
          style={{ color: getPerformanceColor(supervisor.performanceLevel) }}
        >
          {supervisor.performanceLevel}
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {supervisor.salesAchievement.toFixed(1)}%
          </div>
          <div className={styles.metricLabel}>Sales Achievement</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {supervisor.appsAchievement.toFixed(1)}%
          </div>
          <div className={styles.metricLabel}>Apps Achievement</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricValue}>
            {supervisor.teamSize}
          </div>
          <div className={styles.metricLabel}>Pit Crew Size</div>
        </div>
      </div>

      <div className={styles.pitCrew}>
        <div className={styles.pitCrewHeader}>
          <span className={styles.pitCrewIcon}>👥</span>
          <span className={styles.pitCrewTitle}>Pit Crew</span>
        </div>
        <div className={styles.pitCrewList}>
          {supervisor.teamMembers.map((consultant, index) => (
            <div key={consultant.id} className={styles.crewMember}>
              <div className={styles.crewName}>
                {consultant.consultantName}
              </div>
              <div className={styles.crewPerformance}>
                {consultant.salesAchievement.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}