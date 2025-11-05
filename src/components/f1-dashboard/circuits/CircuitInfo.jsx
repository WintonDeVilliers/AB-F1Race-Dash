import styles from './CircuitInfo.module.css';

export default function CircuitInfo({ circuit, teams, consultants }) {
  const circuitStats = {
    Monaco: {
      country: "Monaco",
      firstGP: "1929",
      corners: "19",
      drs: "1 Zone",
      recordLap: "1:12.909"
    },
    Kyalami: {
      country: "South Africa", 
      firstGP: "1967",
      corners: "16",
      drs: "2 Zones",
      recordLap: "1:16.451"
    }
  };

  const stats = circuitStats[circuit] || circuitStats['Monaco'];
  const topTeams = (teams || []).slice(0, 5); // Show top 5 teams

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Circuit Information</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Country</span>
            <span className={styles.statValue}>{stats.country}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>First GP</span>
            <span className={styles.statValue}>{stats.firstGP}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Corners</span>
            <span className={styles.statValue}>{stats.corners}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>DRS Zones</span>
            <span className={styles.statValue}>{stats.drs}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Lap Record</span>
            <span className={styles.statValue}>{stats.recordLap}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{circuit} Teams</h3>
        <div className={styles.teamsList}>
          {topTeams.map((team, index) => {
            const consultants = team.consultants || [];
            const avgPerformance = consultants.length > 0 
              ? consultants.reduce((sum, c) => sum + (c.achievementRate || 0), 0) / consultants.length 
              : 0;
            
            return (
              <div key={team.name || index} className={styles.teamItem}>
                <div className={styles.teamHeader}>
                  <span className={styles.teamPosition}>#{index + 1}</span>
                  <span className={styles.teamName}>{team.name || team.supervisorName || 'Unknown Team'}</span>
                </div>
                <div className={styles.teamStats}>
                  <span className={styles.teamMembers}>
                    {consultants.length} members
                  </span>
                  <span 
                    className={styles.teamPerformance}
                    style={{
                      color: avgPerformance >= 100 ? '#22c55e' :
                             avgPerformance >= 80 ? '#f59e0b' : '#ef4444'
                    }}
                  >
                    {avgPerformance.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Track Conditions</h3>
        <div className={styles.conditions}>
          <div className={styles.conditionItem}>
            <span className={styles.conditionIcon}>🌤️</span>
            <div className={styles.conditionInfo}>
              <span className={styles.conditionLabel}>Weather</span>
              <span className={styles.conditionValue}>Partly Cloudy</span>
            </div>
          </div>
          <div className={styles.conditionItem}>
            <span className={styles.conditionIcon}>🌡️</span>
            <div className={styles.conditionInfo}>
              <span className={styles.conditionLabel}>Air Temp</span>
              <span className={styles.conditionValue}>24°C</span>
            </div>
          </div>
          <div className={styles.conditionItem}>
            <span className={styles.conditionIcon}>🛣️</span>
            <div className={styles.conditionInfo}>
              <span className={styles.conditionLabel}>Track Temp</span>
              <span className={styles.conditionValue}>42°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}