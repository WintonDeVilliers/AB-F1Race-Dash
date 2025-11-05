import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import styles from './TrackVisualization.module.css';

export default function CircuitStatsCard({ circuit, stats }) {
  return (
    <Card className={styles.statsCard}>
      <CardHeader>
        <CardTitle>{circuit === 'monaco' ? 'Monaco' : 'Kyalami'} Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.statsList} data-testid={`${circuit}-stats`}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Team Target:</span>
            <span className={styles.statValue}>
              R{((stats?.totalTarget || 0) / 1000000).toFixed(0)}M
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Current Sales:</span>
            <span className={styles.statValue} data-testid={`${circuit}-current-sales`}>
              R{((stats?.totalSales || 0) / 1000000).toFixed(1)}M
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Achievement:</span>
            <span className={styles.statValue} data-testid={`${circuit}-achievement`}>
              {(stats?.achievement || 0).toFixed(1)}%
            </span>
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${Math.min(stats?.achievement || 0, 100)}%` }}
            ></div>
          </div>
          
          <div className={styles.progressLabels}>
            <span>0%</span>
            <span className={styles.currentProgress}>
              {(stats?.achievement || 0).toFixed(0)}%
            </span>
            <span>120%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}