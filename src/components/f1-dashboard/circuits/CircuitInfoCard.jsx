import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import styles from './TrackVisualization.module.css';

export default function CircuitInfoCard({ circuit, config, stats, topSupervisor }) {
  return (
    <Card className={styles.infoCard}>
      <CardHeader>
        <CardTitle>Circuit Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.infoList} data-testid="circuit-info">
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Circuit Length:</span>
            <span className={styles.infoValue}>{config.length}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>
              {circuit === 'kyalami' ? 'Altitude:' : 'Total Laps:'}
            </span>
            <span className={styles.infoValue}>
              {circuit === 'kyalami' ? config.altitude : config.laps}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Active Drivers:</span>
            <span className={styles.infoValue} data-testid={`${circuit}-drivers`}>
              {stats?.teamCount || 0} supervisors
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Pit Crew:</span>
            <span className={styles.infoValue} data-testid={`${circuit}-consultants`}>
              {stats?.consultantCount || 0} consultants
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Record Pace:</span>
            <span className={styles.infoValue} data-testid={`${circuit}-record`}>
              {topSupervisor?.supervisorName || 'N/A'} - {(topSupervisor?.salesAchievement || 0).toFixed(0)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}