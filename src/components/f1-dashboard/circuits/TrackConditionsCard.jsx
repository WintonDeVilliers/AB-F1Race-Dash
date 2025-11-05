import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import styles from './TrackVisualization.module.css';

export default function TrackConditionsCard({ circuit }) {
  const conditions = {
    monaco: [
      { label: 'Market Temp:', value: 'Premium 🏆' },
      { label: 'Track Grip:', value: 'Excellent 🏁' },
      { label: 'Visibility:', value: 'Perfect ✨' },
      { label: 'Competition:', value: 'Elite 🔥' }
    ],
    kyalami: [
      { label: 'Market Temp:', value: 'Hot 🌡️' },
      { label: 'Track Grip:', value: 'Challenging 🏁' },
      { label: 'Visibility:', value: 'Clear ☀️' },
      { label: 'Competition:', value: 'Intense 🔥' }
    ]
  };

  const currentConditions = conditions[circuit] || conditions.monaco;

  return (
    <Card className={styles.conditionsCard}>
      <CardHeader>
        <CardTitle>Track Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.conditionsList} data-testid="track-conditions">
          {currentConditions.map((condition, index) => (
            <div key={index} className={styles.conditionItem}>
              <span className={styles.conditionLabel}>{condition.label}</span>
              <span className={styles.conditionValue}>{condition.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}