import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import styles from './TrackVisualization.module.css';

export default function TopPerformersCard({ teams = [], title, isKyalami = false }) {
  const getPerformanceColor = (achievement) => {
    if (achievement >= 100) return '#22c55e';
    if (achievement >= 80) return '#3b82f6'; 
    if (achievement >= 60) return '#f59e0b';
    if (achievement >= 40) return '#f97316';
    return '#ef4444';
  };

  return (
    <Card className={styles.sectorsCard}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.sectorsList} data-testid={isKyalami ? "fastest-sectors" : "top-performers"}>
          {teams.map((item, index) => {
            // Handle both supervisor objects and sector objects for Kyalami
            const supervisor = item.leader || item;
            const supervisorName = supervisor.supervisorName || supervisor.name || 'Unknown';
            const achievement = supervisor.salesAchievement || 0;
            const displayText = isKyalami ? item.sector : `#${index + 1} Position`;
            
            return (
              <div key={supervisor.id || index} className={styles.sectorItem}>
                <div className={styles.sectorInfo}>
                  <span className={styles.sectorVehicle}>🏎️</span>
                  <span className={styles.sectorName}>{displayText}</span>
                </div>
                <span 
                  className={styles.sectorLeader}
                  style={{ color: getPerformanceColor(achievement) }}
                  data-testid={`${isKyalami ? 'sector-leader' : 'top-performer'}-${index}`}
                >
                  {supervisorName}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}