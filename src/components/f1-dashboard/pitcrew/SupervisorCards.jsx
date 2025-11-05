import SupervisorCard from './SupervisorCard';
import styles from './SupervisorCards.module.css';

export default function SupervisorCards({ supervisors }) {
  if (!supervisors || supervisors.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {supervisors.map((supervisor, index) => (
          <SupervisorCard 
            key={supervisor.supervisorName}
            supervisor={supervisor}
          />
        ))}
      </div>
    </div>
  );
}